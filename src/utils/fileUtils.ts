// Utility functions for file handling
import { sanitizeFilename } from './stringUtils';

export function getDownloadPath(filename: string): string {
  return `/downloads/${filename}`;
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function isPdfFile(filename: string): boolean {
  return getFileExtension(filename) === 'pdf';
}

// Re-export for backward compatibility
export { sanitizeFilename }; 