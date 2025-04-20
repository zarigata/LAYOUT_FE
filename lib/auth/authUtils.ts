// ██████╗ █████╗ ██████╗ ███████╗██╗  ██╗
// ██╔════╝██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
// ██║     ███████║██║  ██║█████╗   ╚███╔╝ 
// ██║     ██╔══██║██║  ██║██╔══╝   ██╔██╗ 
// ╚██████╗██║  ██║██████╔╝███████╗██╔╝ ██╗
// ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
// Authentication utilities for secure access

import { jwtDecode } from 'jwt-decode';
import type { User, UserRole } from '@/types';
import { api } from '../api/apiClient';

// Token storage keys
const AUTH_TOKEN_KEY = 'edudroid_auth_token';
const REFRESH_TOKEN_KEY = 'edudroid_refresh_token';
const USER_DATA_KEY = 'edudroid_user_data';

// Token interfaces
interface DecodedToken {
  sub: string; // user ID
  role: UserRole;
  exp: number; // expiration timestamp
  iat: number; // issued at timestamp
}

/**
 * Store authentication tokens securely
 */
export function setAuthTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  
  // Store tokens in localStorage (in production, consider using HttpOnly cookies)
  localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  
  // Decode and store user data
  try {
    const decoded = jwtDecode<DecodedToken>(accessToken);
    const userData = {
      id: decoded.sub,
      role: decoded.role,
      exp: decoded.exp,
    };
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Failed to decode token:', error);
  }
}

/**
 * Get the current authentication token
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Get the refresh token
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Clear all authentication data on logout
 */
export function clearAuthData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
}

/**
 * Check if the current user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = getAuthToken();
  if (!token) return false;
  
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    
    // Check if token is expired
    if (decoded.exp < currentTime) {
      // Token expired, try to refresh
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
}

/**
 * Get the current user's role
 */
export function getUserRole(): UserRole | null {
  if (typeof window === 'undefined') return null;
  
  const userData = localStorage.getItem(USER_DATA_KEY);
  if (!userData) return null;
  
  try {
    const parsed = JSON.parse(userData);
    return parsed.role;
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
}

/**
 * Check if the current user has a specific role
 */
export function hasRole(role: UserRole | UserRole[]): boolean {
  const userRole = getUserRole();
  if (!userRole) return false;
  
  if (Array.isArray(role)) {
    return role.includes(userRole);
  }
  
  return userRole === role;
}

/**
 * Refresh the authentication token
 */
export async function refreshAuthToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;
  
  try {
    const response = await api.post<{accessToken: string, refreshToken: string}>(
      '/auth/refresh',
      { refreshToken },
      { requiresAuth: false }
    );
    
    if (response.success && response.data) {
      setAuthTokens(response.data.accessToken, response.data.refreshToken);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    clearAuthData();
    return false;
  }
}

/**
 * Get the current user's ID
 */
export function getCurrentUserId(): string | null {
  if (typeof window === 'undefined') return null;
  
  const userData = localStorage.getItem(USER_DATA_KEY);
  if (!userData) return null;
  
  try {
    const parsed = JSON.parse(userData);
    return parsed.id;
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
}
