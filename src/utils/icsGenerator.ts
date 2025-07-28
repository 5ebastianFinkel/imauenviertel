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
  duration: number = 1, // Duration in hours
  startTime?: string, // HH:MM format
  endTime?: string // HH:MM format
): string {
  // Format date to YYYYMMDD for all-day events
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  // Format date-time to YYYYMMDDTHHMMSS for timed events (local time)
  const formatDateTime = (date: Date, time?: string) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    if (time) {
      const [hours, minutes] = time.split(':');
      return `${year}${month}${day}T${hours.padStart(2, '0')}${minutes}00`;
    }
    return `${year}${month}${day}T000000`;
  };

  // Format current timestamp for DTSTAMP
  const formatDateTimeUTC = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  // Sanitize inputs
  const safeTitle = sanitizeICSText(title);
  const safeDescription = sanitizeICSText(description);
  
  let dtstart: string;
  let dtend: string;
  let isAllDay = !startTime;

  if (isAllDay) {
    // All-day event
    dtstart = `DTSTART;VALUE=DATE:${formatDate(date)}`;
    // For all-day events, end date is exclusive (next day)
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    dtend = `DTEND;VALUE=DATE:${formatDate(nextDay)}`;
  } else {
    // Timed event with timezone (Europe/Berlin)
    dtstart = `DTSTART;TZID=Europe/Berlin:${formatDateTime(date, startTime)}`;
    
    if (endTime) {
      dtend = `DTEND;TZID=Europe/Berlin:${formatDateTime(date, endTime)}`;
    } else if (startTime) {
      // Calculate end time based on duration
      const [startHour, startMin] = startTime.split(':').map(Number);
      const endHour = startHour + Math.floor(duration);
      const endMin = startMin + Math.round((duration % 1) * 60);
      const adjustedEndHour = endHour + Math.floor(endMin / 60);
      const adjustedEndMin = endMin % 60;
      const calculatedEndTime = `${String(adjustedEndHour).padStart(2, '0')}:${String(adjustedEndMin).padStart(2, '0')}`;
      dtend = `DTEND;TZID=Europe/Berlin:${formatDateTime(date, calculatedEndTime)}`;
    } else {
      // This should never happen as we check isAllDay above, but TypeScript needs this
      throw new Error('Invalid state: startTime is required for timed events');
    }
  }

  // Build event array
  const eventLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Im Auenviertel//Event Calendar//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];

  // Add timezone definition for Europe/Berlin if it's a timed event
  if (!isAllDay) {
    eventLines.push(
      'BEGIN:VTIMEZONE',
      'TZID:Europe/Berlin',
      'BEGIN:STANDARD',
      'DTSTART:19701025T030000',
      'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
      'TZOFFSETFROM:+0200',
      'TZOFFSETTO:+0100',
      'END:STANDARD',
      'BEGIN:DAYLIGHT',
      'DTSTART:19700329T020000',
      'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
      'TZOFFSETFROM:+0100',
      'TZOFFSETTO:+0200',
      'END:DAYLIGHT',
      'END:VTIMEZONE'
    );
  }

  eventLines.push(
    'BEGIN:VEVENT',
    `UID:${date.getTime()}-${Math.random().toString(36).substring(2, 9)}@imauenviertel.de`,
    dtstart,
    dtend,
    `SUMMARY:${safeTitle}`,
    safeDescription ? `DESCRIPTION:${safeDescription}` : '',
    `DTSTAMP:${formatDateTimeUTC(new Date())}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  );

  return eventLines.filter(Boolean).join('\r\n');
}

export function downloadICS(
  title: string, 
  date: Date, 
  description?: string,
  duration: number = 1,
  startTime?: string,
  endTime?: string
) {
  const icsContent = generateICSFile(title, date, description, duration, startTime, endTime);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${sanitizeFilename(title)}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href); // Clean up the URL object
}
