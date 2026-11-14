import { downloadICS } from "@utils/icsGenerator";

// Calendar download button: creates an .ics file for the event in the browser.
interface Props {
  title: string;
  date: Date;
  description?: string;
  startTime?: string; // HH:MM format
  endTime?: string; // HH:MM format
  className?: string;
}

export function CalendarButton({ title, date, description, startTime, endTime, className }: Props) {
  const onClick = () => {
    try {
      if (title.trim() === "") {
        console.error("CalendarButton: Invalid or missing title");
        alert("Fehler: Kein gültiger Titel für den Termin gefunden.");
        return;
      }

      if (isNaN(date.getTime())) {
        console.error("CalendarButton: Invalid date:", date);
        alert("Fehler: Das Datum des Termins ist ungültig.");
        return;
      }

      downloadICS(title.trim(), date, description, startTime, endTime);
    } catch (error) {
      console.error("CalendarButton: Error generating calendar file:", error);
      alert("Fehler beim Erstellen der Kalenderdatei. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <button
      type="button"
      className={["calendar-button btn-sm", className].filter(Boolean).join(" ")}
      aria-label={`Termin „${title}“ zum Kalender hinzufügen`}
      onClick={onClick}
    >
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 7v5m-2.5-2.5h5"></path>
      </svg>
      <span>In den Kalender</span>
    </button>
  );
}
