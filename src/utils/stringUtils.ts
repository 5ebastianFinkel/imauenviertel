// Shared string utility functions

export function sanitizeFilename(filename: string): string {
  // Remove unsafe characters and normalize
  return filename
    .replace(/[^a-zA-Z0-9\s\-_.äöüÄÖÜß]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 255);
}