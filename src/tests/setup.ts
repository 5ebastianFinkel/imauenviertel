import { vi } from 'vitest';

// Setup global URL and Blob for browser environment
Object.defineProperty(window, 'URL', {
  value: {
    createObjectURL: vi.fn(() => 'blob:http://localhost/test-blob'),
    revokeObjectURL: vi.fn(),
  },
  writable: true,
});

Object.defineProperty(window, 'Blob', {
  value: class MockBlob {
    constructor(public content: any[], public options: any = {}) {}
    get size() { return 0; }
    get type() { return this.options.type || ''; }
  },
  writable: true,
});

// Add type declaration for window.downloadCalendar
declare global {
  interface Window {
    downloadCalendar: (title: string, dateStr: string, description?: string) => HTMLAnchorElement;
  }
}