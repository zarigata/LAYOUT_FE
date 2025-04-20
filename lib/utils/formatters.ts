// ██████╗ █████╗ ██████╗ ███████╗██╗  ██╗
// ██╔════╝██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
// ██║     ███████║██║  ██║█████╗   ╚███╔╝ 
// ██║     ██╔══██║██║  ██║██╔══╝   ██╔██╗ 
// ╚██████╗██║  ██║██████╔╝███████╗██╔╝ ██╗
// ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
// Utility functions for formatting data

/**
 * Format bytes to a human-readable string
 * @param bytes Number of bytes
 * @param decimals Number of decimal places
 * @returns Formatted string (e.g. "1.5 MB")
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format a date to a human-readable string
 * @param date Date to format
 * @param format Format to use (short, medium, long, full)
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, format: 'short' | 'medium' | 'long' | 'full' = 'medium'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    short: { month: 'numeric', day: 'numeric', year: '2-digit' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  }[format];
  
  return dateObj.toLocaleDateString(undefined, options);
}

/**
 * Format a time to a human-readable string
 * @param date Date to format
 * @param includeSeconds Whether to include seconds
 * @returns Formatted time string
 */
export function formatTime(date: Date | string, includeSeconds = false): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...(includeSeconds ? { second: '2-digit' } : {}),
  };
  
  return dateObj.toLocaleTimeString(undefined, options);
}

/**
 * Format a datetime to a human-readable string
 * @param date Date to format
 * @param dateFormat Format to use for the date part
 * @param includeSeconds Whether to include seconds in the time part
 * @returns Formatted datetime string
 */
export function formatDateTime(
  date: Date | string,
  dateFormat: 'short' | 'medium' | 'long' | 'full' = 'medium',
  includeSeconds = false
): string {
  return `${formatDate(date, dateFormat)} ${formatTime(date, includeSeconds)}`;
}

/**
 * Format a number as currency
 * @param amount Amount to format
 * @param currency Currency code (e.g. USD, EUR)
 * @param locale Locale to use for formatting
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format a number with commas
 * @param number Number to format
 * @param decimals Number of decimal places
 * @returns Formatted number string
 */
export function formatNumber(number: number, decimals = 0): string {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format a percentage
 * @param value Value to format (e.g. 0.75 for 75%)
 * @param decimals Number of decimal places
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format a duration in seconds to a human-readable string
 * @param seconds Duration in seconds
 * @param compact Whether to use compact format
 * @returns Formatted duration string
 */
export function formatDuration(seconds: number, compact = false): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (compact) {
    return [
      hours > 0 ? `${hours}h` : '',
      minutes > 0 ? `${minutes}m` : '',
      hours === 0 ? `${remainingSeconds}s` : '',
    ].filter(Boolean).join(' ');
  }
  
  return [
    hours > 0 ? `${hours} hour${hours !== 1 ? 's' : ''}` : '',
    minutes > 0 ? `${minutes} minute${minutes !== 1 ? 's' : ''}` : '',
    hours === 0 ? `${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}` : '',
  ].filter(Boolean).join(', ');
}

/**
 * Truncate a string to a maximum length
 * @param text Text to truncate
 * @param maxLength Maximum length
 * @param ellipsis String to append when truncated
 * @returns Truncated string
 */
export function truncateText(text: string, maxLength: number, ellipsis = '...'): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * Convert a string to title case
 * @param text Text to convert
 * @returns Title case string
 */
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format a file name to be safe for use in URLs and file systems
 * @param fileName File name to format
 * @returns Safe file name
 */
export function formatSafeFileName(fileName: string): string {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Format a phone number
 * @param phoneNumber Phone number to format
 * @param format Format to use (e.g. "(XXX) XXX-XXXX")
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phoneNumber: string, format = '(XXX) XXX-XXXX'): string {
  const digits = phoneNumber.replace(/\D/g, '');
  let result = format;
  
  for (let i = 0; i < digits.length; i++) {
    result = result.replace('X', digits[i]);
  }
  
  // Remove any remaining X placeholders
  result = result.replace(/X/g, '');
  
  return result;
}
