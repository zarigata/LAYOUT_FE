// ██████╗ █████╗ ██████╗ ███████╗██╗  ██╗
// ██╔════╝██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
// ██║     ███████║██║  ██║█████╗   ╚███╔╝ 
// ██║     ██╔══██║██║  ██║██╔══╝   ██╔██╗ 
// ╚██████╗██║  ██║██████╔╝███████╗██╔╝ ██╗
// ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
// Authentication Provider for managing auth state

"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../api/apiClient';
import { 
  setAuthTokens, 
  clearAuthData, 
  isAuthenticated, 
  getUserRole,
  refreshAuthToken
} from './authUtils';
import type { User, UserRole } from '@/types';

// Auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      
      if (isAuthenticated()) {
        try {
          // Fetch current user data
          const response = await api.get<User>('/users/me');
          
          if (response.success && response.data) {
            setUser(response.data);
          } else {
            // If API call fails, try to refresh token
            const refreshed = await refreshAuthToken();
            
            if (refreshed) {
              // Try again after refresh
              const retryResponse = await api.get<User>('/users/me');
              
              if (retryResponse.success && retryResponse.data) {
                setUser(retryResponse.data);
              } else {
                handleAuthError();
              }
            } else {
              handleAuthError();
            }
          }
        } catch (err) {
          handleAuthError();
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
    
    // Set up token refresh interval
    const refreshInterval = setInterval(() => {
      if (isAuthenticated()) {
        refreshAuthToken();
      }
    }, 15 * 60 * 1000); // Refresh every 15 minutes
    
    return () => clearInterval(refreshInterval);
  }, []);
  
  // Handle authentication errors
  const handleAuthError = () => {
    clearAuthData();
    setUser(null);
    setError('Authentication failed. Please log in again.');
  };
  
  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post<{accessToken: string, refreshToken: string, user: User}>(
        '/auth/login',
        { email, password },
        { requiresAuth: false }
      );
      
      if (response.success && response.data) {
        setAuthTokens(response.data.accessToken, response.data.refreshToken);
        setUser(response.data.user);
        setLoading(false);
        return true;
      } else {
        setError(response.error || 'Login failed. Please check your credentials.');
        setLoading(false);
        return false;
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      setLoading(false);
      return false;
    }
  };
  
  // Logout function
  const logout = () => {
    clearAuthData();
    setUser(null);
    router.push('/');
  };
  
  // Register function
  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post<{accessToken: string, refreshToken: string, user: User}>(
        '/auth/register',
        { ...userData, password },
        { requiresAuth: false }
      );
      
      if (response.success && response.data) {
        setAuthTokens(response.data.accessToken, response.data.refreshToken);
        setUser(response.data.user);
        setLoading(false);
        return true;
      } else {
        setError(response.error || 'Registration failed. Please try again.');
        setLoading(false);
        return false;
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
      setLoading(false);
      return false;
    }
  };
  
  // Update user function
  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const response = await api.put<User>(`/users/${user.id}`, userData);
      
      if (response.success && response.data) {
        setUser(response.data);
        return true;
      }
      
      return false;
    } catch (err) {
      setError('Failed to update user profile.');
      return false;
    }
  };
  
  // Context value
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    userRole: user?.role || null,
    login,
    logout,
    register,
    updateUser,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
