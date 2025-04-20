// ██████╗ █████╗ ██████╗ ███████╗██╗  ██╗
// ██╔════╝██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
// ██║     ███████║██║  ██║█████╗   ╚███╔╝ 
// ██║     ██╔══██║██║  ██║██╔══╝   ██╔██╗ 
// ╚██████╗██║  ██║██████╔╝███████╗██╔╝ ██╗
// ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
// Logging utilities for tracking user actions and system events

import { getCurrentUserId, getUserRole } from '../auth/authUtils';
import type { UserRole } from '@/types';

// Log levels
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  CRITICAL = 'critical',
}

// Log categories
export enum LogCategory {
  AUTH = 'authentication',
  USER = 'user_activity',
  SYSTEM = 'system',
  PERFORMANCE = 'performance',
  SECURITY = 'security',
  AI = 'ai_interaction',
}

// Log entry interface
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  userId?: string;
  userRole?: UserRole;
  data?: any;
  source?: string;
  sessionId?: string;
}

// Generate a unique session ID for the current browser session
const SESSION_ID = typeof window !== 'undefined' 
  ? localStorage.getItem('edudroid_session_id') || `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  : undefined;

// Store session ID in localStorage
if (typeof window !== 'undefined' && !localStorage.getItem('edudroid_session_id')) {
  localStorage.setItem('edudroid_session_id', SESSION_ID!);
}

/**
 * Create a log entry with all necessary metadata
 */
function createLogEntry(
  level: LogLevel,
  category: LogCategory,
  message: string,
  data?: any
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    category,
    message,
    userId: getCurrentUserId() || undefined,
    userRole: getUserRole() || undefined,
    data,
    source: typeof window !== 'undefined' ? window.location.pathname : 'server',
    sessionId: SESSION_ID,
  };
}

/**
 * Send log entry to backend logging service
 */
async function sendLogToServer(entry: LogEntry): Promise<void> {
  // Only send logs to server in production
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  try {
    await fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
  } catch (error) {
    // Silently fail if logging endpoint is unavailable
    console.error('Failed to send log to server:', error);
  }
}

/**
 * Log a debug message (development only)
 */
export function logDebug(category: LogCategory, message: string, data?: any): void {
  // Only log debug messages in development
  if (process.env.NODE_ENV !== 'production') {
    const entry = createLogEntry(LogLevel.DEBUG, category, message, data);
    console.debug(`[${entry.category}] ${entry.message}`, data || '');
  }
}

/**
 * Log an info message
 */
export function logInfo(category: LogCategory, message: string, data?: any): void {
  const entry = createLogEntry(LogLevel.INFO, category, message, data);
  
  // Log to console in development
  if (process.env.NODE_ENV !== 'production') {
    console.info(`[${entry.category}] ${entry.message}`, data || '');
  }
  
  // Send to server
  sendLogToServer(entry);
}

/**
 * Log a warning message
 */
export function logWarning(category: LogCategory, message: string, data?: any): void {
  const entry = createLogEntry(LogLevel.WARN, category, message, data);
  
  // Log to console in development
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[${entry.category}] ${entry.message}`, data || '');
  }
  
  // Send to server
  sendLogToServer(entry);
}

/**
 * Log an error message
 */
export function logError(category: LogCategory, message: string, error?: any): void {
  const entry = createLogEntry(LogLevel.ERROR, category, message, {
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : error,
  });
  
  // Always log errors to console
  console.error(`[${entry.category}] ${entry.message}`, error || '');
  
  // Send to server
  sendLogToServer(entry);
}

/**
 * Log a critical error (highest priority)
 */
export function logCritical(category: LogCategory, message: string, error?: any): void {
  const entry = createLogEntry(LogLevel.CRITICAL, category, message, {
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : error,
  });
  
  // Always log critical errors to console
  console.error(`[CRITICAL][${entry.category}] ${entry.message}`, error || '');
  
  // Send to server with high priority
  sendLogToServer({
    ...entry,
    data: {
      ...entry.data,
      highPriority: true,
    },
  });
}

/**
 * Log user authentication events
 */
export function logAuth(action: string, success: boolean, userId?: string, error?: any): void {
  logInfo(
    LogCategory.AUTH,
    `Authentication ${action} ${success ? 'succeeded' : 'failed'}${userId ? ` for user ${userId}` : ''}`,
    { success, userId, error }
  );
}

/**
 * Log user actions
 */
export function logUserAction(action: string, details?: any): void {
  logInfo(LogCategory.USER, action, details);
}

/**
 * Log AI interactions
 */
export function logAIInteraction(interaction: string, details?: any): void {
  logInfo(LogCategory.AI, interaction, details);
}

/**
 * Log security events
 */
export function logSecurity(event: string, details?: any): void {
  logWarning(LogCategory.SECURITY, event, details);
}

/**
 * Log performance metrics
 */
export function logPerformance(metric: string, value: number, details?: any): void {
  logInfo(
    LogCategory.PERFORMANCE,
    `Performance metric: ${metric} = ${value}`,
    { metric, value, ...details }
  );
}
