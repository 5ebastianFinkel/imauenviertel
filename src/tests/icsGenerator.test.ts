import { describe, expect, it } from 'vitest';
import { generateICSFile, sanitizeFilename } from '../utils/icsGenerator';

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

  it('should set end time to 1 hour after start time by default', () => {
    const title = "Test Event";
    const date = new Date('2025-06-15T10:00:00Z');

    const icsContent = generateICSFile(title, date);

    expect(icsContent).toContain('DTSTART:20250615T100000Z');
    expect(icsContent).toContain('DTEND:20250615T110000Z');
  });

  it('should handle custom duration', () => {
    const title = "Test Event";
    const date = new Date('2025-06-15T10:00:00Z');
    const duration = 3; // 3 hours

    const icsContent = generateICSFile(title, date, undefined, duration);

    expect(icsContent).toContain('DTSTART:20250615T100000Z');
    expect(icsContent).toContain('DTEND:20250615T130000Z');
  });

  it('should sanitize special characters in title and description', () => {
    const title = "Test;Event\\with,special\nchars";
    const date = new Date('2025-06-15T10:00:00Z');
    const description = "Description;with\\backslash,comma\nand newline";

    const icsContent = generateICSFile(title, date, description);

    // Check that special characters are escaped
    expect(icsContent).toContain('SUMMARY:Test\\;Event\\\\with\\,special\\nchars');
    expect(icsContent).toContain('DESCRIPTION:Description\\;with\\\\backslash\\,comma\\nand newline');
  });

  it('should include additional ICS fields', () => {
    const title = "Test Event";
    const date = new Date('2025-06-15T10:00:00Z');

    const icsContent = generateICSFile(title, date);

    // Check for additional fields
    expect(icsContent).toContain('PRODID:-//Im Auenviertel//Event Calendar//DE');
    expect(icsContent).toContain('CALSCALE:GREGORIAN');
    expect(icsContent).toContain('METHOD:PUBLISH');
    expect(icsContent).toContain('UID:');
    expect(icsContent).toContain('DTSTAMP:');
    expect(icsContent).toContain('STATUS:CONFIRMED');
  });
});

describe('Filename Sanitization', () => {
  it('should sanitize filename with special characters', () => {
    const filename = 'Test/Event:with*special|chars<>?.pdf';
    const sanitized = sanitizeFilename(filename);
    
    expect(sanitized).toBe('Test_Event_with_special_chars_.pdf');
  });

  it('should handle German umlauts', () => {
    const filename = 'Gemeinschaftsarbeit Frühjahrsputz äöüÄÖÜß';
    const sanitized = sanitizeFilename(filename);
    
    expect(sanitized).toBe('Gemeinschaftsarbeit_Frühjahrsputz_äöüÄÖÜß');
  });

  it('should remove multiple consecutive underscores', () => {
    const filename = 'Test   Event___Name';
    const sanitized = sanitizeFilename(filename);
    
    expect(sanitized).toBe('Test_Event_Name');
  });

  it('should remove leading and trailing underscores', () => {
    const filename = '_Test Event_';
    const sanitized = sanitizeFilename(filename);
    
    expect(sanitized).toBe('Test_Event');
  });

  it('should limit filename length', () => {
    const longFilename = 'a'.repeat(300);
    const sanitized = sanitizeFilename(longFilename);
    
    expect(sanitized.length).toBeLessThanOrEqual(255);
  });
});
