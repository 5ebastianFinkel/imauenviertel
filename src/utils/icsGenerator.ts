export function generateICSFile(title: string, date: Date, description?: string): string {
  // Format date to YYYYMMDD
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const event = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(date)}`,
    `DTEND:${formatDate(new Date(date.getTime() + 3600000))}`, // Add 1 hour by default
    `SUMMARY:${title}`,
    description ? `DESCRIPTION:${description}` : '',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean).join('\r\n');

  return event;
}

export function downloadICS(title: string, date: Date, description?: string) {
  const icsContent = generateICSFile(title, date, description);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${title.replace(/\s+/g, '_')}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
