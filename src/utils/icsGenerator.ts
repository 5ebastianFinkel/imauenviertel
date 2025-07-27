// Sanitize text for ICS format to prevent injection and ensure valid content
function sanitizeICSText(text: string | undefined): string {
  if (!text) return '';
  // Escape special characters according to ICS specification
  return text
    .replace(/\\/g, '\\\\') // Escape backslashes first
    .replace(/;/g, '\\;')   // Escape semicolons
    .replace(/,/g, '\\,')   // Escape commas
    .replace(/\n/g, '\\n')  // Escape newlines
    .replace(/\r/g, '');    // Remove carriage returns
}

// Sanitize filename to remove unsafe characters
export function sanitizeFilename(filename: string): string {
  // Replace all unsafe characters with underscores
  // Keep only alphanumeric, spaces, hyphens, dots, and underscores
  return filename
    .replace(/[^a-zA-Z0-9\s\-_.äöüÄÖÜß]/g, '_')
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/_+/g, '_')  // Replace multiple underscores with single
    .replace(/^_|_$/g, '') // Remove leading/trailing underscores
    .substring(0, 255);   // Limit filename length
}

export function generateICSFile(
  title: string, 
  date: Date, 
  description?: string,
  duration: number = 1 // Duration in hours
): string {
  // Format date to YYYYMMDDTHHMMSSZ for ICS format
  const formatDateTimeUTC = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  // Sanitize inputs
  const safeTitle = sanitizeICSText(title);
  const safeDescription = sanitizeICSText(description);
  
  // Calculate end date based on duration
  const endDate = new Date(date.getTime() + (duration * 3600000));

  const event = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Im Auenviertel//Event Calendar//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${date.getTime()}-${Math.random().toString(36).substring(2, 9)}@imauenviertel.de`,
    `DTSTART:${formatDateTimeUTC(date)}`,
    `DTEND:${formatDateTimeUTC(endDate)}`,
    `SUMMARY:${safeTitle}`,
    safeDescription ? `DESCRIPTION:${safeDescription}` : '',
    `DTSTAMP:${formatDateTimeUTC(new Date())}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean).join('\r\n');

  return event;
}

export function downloadICS(
  title: string, 
  date: Date, 
  description?: string,
  duration: number = 1
) {
  const icsContent = generateICSFile(title, date, description, duration);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${sanitizeFilename(title)}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href); // Clean up the URL object
}
