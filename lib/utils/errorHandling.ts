// ██████╗ █████╗ ██████╗ ███████╗██╗  ██╗
// ██╔════╝██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
// ██║     ███████║██║  ██║█████╗   ╚███╔╝ 
// ██║     ██╔══██║██║  ██║██╔══╝   ██╔██╗ 
// ╚██████╗██║  ██║██████╔╝███████╗██╔╝ ██╗
// ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
// Error handling and logging utilities

// Error types for consistent error handling
export enum ErrorType {
  NETWORK = 'NETWORK_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR',
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  SERVER = 'SERVER_ERROR',
  NOT_FOUND = 'NOT_FOUND_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR',
}

// Error interface
export interface AppError {
  type: ErrorType;
  message: string;
  code?: number;
  details?: any;
}

// Create standardized error object
export function createError(
  type: ErrorType, 
  message: string, 
  code?: number, 
  details?: any
): AppError {
  return {
    type,
    message,
    code,
    details,
  };
}

// Map HTTP status codes to error types
export function mapHttpStatusToErrorType(status: number): ErrorType {
  switch (status) {
    case 400:
      return ErrorType.VALIDATION;
    case 401:
      return ErrorType.AUTHENTICATION;
    case 403:
      return ErrorType.AUTHORIZATION;
    case 404:
      return ErrorType.NOT_FOUND;
    case 500:
    case 502:
    case 503:
    case 504:
      return ErrorType.SERVER;
    default:
      return ErrorType.UNKNOWN;
  }
}

// Parse API error response
export function parseApiError(error: any): AppError {
  // Network error
  if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
    return createError(
      ErrorType.NETWORK,
      'Network error. Please check your internet connection.',
    );
  }
  
  // API error with status code
  if (error.status) {
    const errorType = mapHttpStatusToErrorType(error.status);
    return createError(
      errorType,
      error.message || getDefaultErrorMessage(errorType),
      error.status,
      error.data
    );
  }
  
  // Unknown error
  return createError(
    ErrorType.UNKNOWN,
    error.message || 'An unknown error occurred.',
  );
}

// Get user-friendly error message based on error type
export function getDefaultErrorMessage(type: ErrorType): string {
  switch (type) {
    case ErrorType.NETWORK:
      return 'Network error. Please check your internet connection and try again.';
    case ErrorType.AUTHENTICATION:
      return 'Authentication error. Please log in again.';
    case ErrorType.AUTHORIZATION:
      return 'You do not have permission to perform this action.';
    case ErrorType.VALIDATION:
      return 'Invalid data. Please check your inputs and try again.';
    case ErrorType.SERVER:
      return 'Server error. Please try again later.';
    case ErrorType.NOT_FOUND:
      return 'The requested resource was not found.';
    case ErrorType.UNKNOWN:
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}

// Log error to monitoring service (e.g., Sentry)
export function logError(error: AppError | Error, context?: any): void {
  // In production, send to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry.captureException(error, { extra: context });
    console.error('[ERROR]', error, context);
    
    // Send to backend logging endpoint
    try {
      fetch('/api/logs/error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error, context, timestamp: new Date().toISOString() }),
      }).catch(() => {
        // Silently fail if logging endpoint is unavailable
      });
    } catch (e) {
      // Ignore errors in error logging
    }
  } else {
    // In development, log to console
    console.error('[ERROR]', error, context);
  }
}

// Handle form validation errors
export function handleFormErrors(errors: Record<string, string[]>): Record<string, string> {
  const formattedErrors: Record<string, string> = {};
  
  Object.entries(errors).forEach(([field, messages]) => {
    formattedErrors[field] = Array.isArray(messages) ? messages[0] : messages.toString();
  });
  
  return formattedErrors;
}

// Sanitize user input to prevent XSS attacks
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
export function isStrongPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}
