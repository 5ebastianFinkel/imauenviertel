// Calendar button functionality
import { generateICSFile, sanitizeFilename } from '../utils/icsGenerator';

function downloadICS(title, date, description, startTime, endTime) {
  const icsContent = generateICSFile(title, date, description, startTime, endTime);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${sanitizeFilename(title)}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

// Expose function globally for testing and external modules
window.downloadICS = downloadICS;

// Initialize calendar buttons
export function initializeCalendarButtons() {
  document.querySelectorAll('.calendar-button').forEach(button => {
    button.addEventListener('click', (e) => {
      try {
        const btn = e.currentTarget;
        const title = btn.dataset.title;
        const dateString = btn.dataset.date;
        const description = btn.dataset.description;
        const startTime = btn.dataset.startTime;
        const endTime = btn.dataset.endTime;

        // Validate required fields
        if (!title || typeof title !== 'string' || title.trim() === '') {
          console.error('CalendarButton: Invalid or missing title');
          alert('Fehler: Kein gültiger Titel für den Termin gefunden.');
          return;
        }

        if (!dateString || typeof dateString !== 'string') {
          console.error('CalendarButton: Invalid or missing date string');
          alert('Fehler: Kein gültiges Datum für den Termin gefunden.');
          return;
        }

        // Parse and validate date
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          console.error('CalendarButton: Invalid date format:', dateString);
          alert('Fehler: Das Datum des Termins ist ungültig.');
          return;
        }

        // Download ICS file
        downloadICS(title.trim(), date, description, startTime, endTime);
      } catch (error) {
        console.error('CalendarButton: Error generating calendar file:', error);
        alert('Fehler beim Erstellen der Kalenderdatei. Bitte versuchen Sie es erneut.');
      }
    });
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCalendarButtons);
} else {
  initializeCalendarButtons();
}