// ██████╗ █████╗ ██████╗ ███████╗██╗  ██╗
// ██╔════╝██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
// ██║     ███████║██║  ██║█████╗   ╚███╔╝ 
// ██║     ██╔══██║██║  ██║██╔══╝   ██╔██╗ 
// ╚██████╗██║  ██║██████╔╝███████╗██╔╝ ██╗
// ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
// API Client for handling all backend requests

import { getAuthToken } from '../auth/authUtils';
import type { ApiResponse } from '@/types';

// Configure base API URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.edudroid.com';

// Request options type
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

/**
 * Main API client function for making requests to the backend
 * Handles authentication, error handling, and response parsing
 */
export async function apiClient<T>(
  endpoint: string, 
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    body,
    headers = {},
    requiresAuth = true,
  } = options;

  // Prepare headers
  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Add auth token if required
  if (requiresAuth) {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        error: 'Authentication required',
      };
    }
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  // Prepare request options
  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    credentials: 'include', // Include cookies for cross-origin requests
  };

  // Add body for non-GET requests
  if (method !== 'GET' && body) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    // Add cache control for production
    if (process.env.NODE_ENV === 'production') {
      requestOptions.cache = 'default';
    }

    // Make the request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
    
    // Handle rate limiting
    if (response.status === 429) {
      return {
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
      };
    }

    // Parse response
    const data = await response.json();
    
    // Handle API errors
    if (!response.ok) {
      console.error(`API Error (${response.status}):`, data);
      return {
        success: false,
        error: data.message || `Error ${response.status}: ${response.statusText}`,
      };
    }

    // Return successful response
    return {
      success: true,
      data: data.data || data,
      pagination: data.pagination,
    };
  } catch (error) {
    // Handle network errors
    console.error('API Request Failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Convenience methods for different HTTP verbs
 */
export const api = {
  get: <T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) => 
    apiClient<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T>(endpoint: string, body: any, options?: Omit<RequestOptions, 'method'>) => 
    apiClient<T>(endpoint, { ...options, method: 'POST', body }),
    
  put: <T>(endpoint: string, body: any, options?: Omit<RequestOptions, 'method'>) => 
    apiClient<T>(endpoint, { ...options, method: 'PUT', body }),
    
  patch: <T>(endpoint: string, body: any, options?: Omit<RequestOptions, 'method'>) => 
    apiClient<T>(endpoint, { ...options, method: 'PATCH', body }),
    
  delete: <T>(endpoint: string, options?: Omit<RequestOptions, 'method'>) => 
    apiClient<T>(endpoint, { ...options, method: 'DELETE' }),
};
