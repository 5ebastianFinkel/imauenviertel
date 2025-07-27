import { describe, expect, it, vi } from 'vitest';
import { generateICSFile } from '../utils/icsGenerator';

describe('ICS Generator', () => {
  it('should generate valid ICS content', () => {
    const title = "Test Event";
    const date = new Date('2025-06-15T10:00:00Z');
    const description = "Test Description";

    const icsContent = generateICSFile(title, date, description);

    // Check basic ICS structure
    expect(icsContent).toContain('BEGIN:VCALENDAR');
    expect(icsContent).toContain('VERSION:2.0');
    expect(icsContent).toContain('BEGIN:VEVENT');
    expect(icsContent).toContain('END:VEVENT');
    expect(icsContent).toContain('END:VCALENDAR');

    // Check event details
    expect(icsContent).toContain(`SUMMARY:${title}`);
    expect(icsContent).toContain(`DESCRIPTION:${description}`);
    expect(icsContent).toContain('DTSTART:20250615T100000Z');
  });

  it('should handle events without description', () => {
    const title = "Test Event";
    const date = new Date('2025-06-15T10:00:00Z');

    const icsContent = generateICSFile(title, date);

    expect(icsContent).toContain(`SUMMARY:${title}`);
    expect(icsContent).not.toContain('DESCRIPTION:');
  });

  it('should set end time to 1 hour after start time', () => {
    const title = "Test Event";
    const date = new Date('2025-06-15T10:00:00Z');

    const icsContent = generateICSFile(title, date);

    expect(icsContent).toContain('DTSTART:20250615T100000Z');
    expect(icsContent).toContain('DTEND:20250615T110000Z');
  });
});
