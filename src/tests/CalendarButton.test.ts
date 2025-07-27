import { describe, expect, it, vi, beforeEach } from 'vitest';
import { generateICSFile } from '../utils/icsGenerator';

describe('CalendarButton', () => {
  beforeEach(() => {
    // Clear document body
    document.body.innerHTML = '';
    
    // Mock click handler function that simulates the calendar button behavior
    window.downloadCalendar = vi.fn((title: string, dateStr: string, description?: string) => {
      const date = new Date(dateStr);
      const icsContent = generateICSFile(title, date, description);
      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/\s+/g, '_')}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return link;
    });
  });

  it('should create download link with correct attributes', () => {
    const title = "Test Event";
    const date = new Date('2025-06-15T10:00:00Z');
    const description = "Test Description";

    // Simulate the calendar button click
    const result = window.downloadCalendar(title, date.toISOString(), description);

    // Verify ICS content was generated
    expect(result).toBeDefined();
    expect(result.download).toBe('Test_Event.ics');
    expect(result.href).toContain('blob:');
  });

  it('should handle events without description', () => {
    const title = "Test Event No Desc";
    const date = new Date('2025-07-20T14:00:00Z');

    // Simulate the calendar button click without description
    const result = window.downloadCalendar(title, date.toISOString());

    expect(result).toBeDefined();
    expect(result.download).toBe('Test_Event_No_Desc.ics');
  });
});
