// Utility functions for file handling

export function getDownloadPath(filename: string): string {
  return `/downloads/${filename}`;
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function isPdfFile(filename: string): boolean {
  return getFileExtension(filename) === 'pdf';
}

export function sanitizeFilename(filename: string): string {
  // Remove unsafe characters and normalize
  return filename
    .replace(/[^a-zA-Z0-9\s\-_.äöüÄÖÜß]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 255);
} 