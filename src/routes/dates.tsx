import { createFileRoute } from "@tanstack/react-router";
import { allDocuments, allEvents } from "content-collections";
import { Container } from "@components/Container";
import { SectionHead } from "@components/SectionHead";
import { CalendarButton } from "@components/ui/CalendarButton";
import { day, formatTime, getUpcomingEvents, monthShort, parseLocalDate, weekday } from "@utils/content";
import { pageHead } from "@utils/seo";
import { useScrollReveal } from "@utils/useScrollReveal";

export const Route = createFileRoute("/dates")({
  head: () => pageHead("Termine", "/dates"),
  loader: () => ({
    events: getUpcomingEvents(allEvents),
    eventCalendar: allDocuments.find((doc) => doc.title.startsWith("Veranstaltungskalender")),
  }),
  component: DatesPage,
});

// Styles: styles/pages/dates.css
function DatesPage() {
  const { events, eventCalendar } = Route.useLoaderData();
  useScrollReveal();

  return (
    <Container className="page-dates">
      <SectionHead
        eyebrow="Gartenkalender"
        title={
          <>
            Termine im <em>Gartenjahr</em>
          </>
        }
        desc="Gemeinschaftsarbeit, Feste und Versammlungen – hier findest du alle kommenden Termine im Überblick."
      />

      {events.length > 0 ? (
        <ol className="agenda" aria-label="Liste der kommenden Termine">
          {events.map((event) => {
            const date = parseLocalDate(event.date);
            return (
              <li key={event.id} className="agenda__item" data-reveal aria-labelledby={`event-title-${event.id}`}>
                <p className="agenda__date">
                  <span className="agenda__day">{day(date)}</span>
                  <span className="agenda__month">
                    {monthShort(date)} {date.getFullYear()}
                  </span>
                </p>
                <div className="agenda__body">
                  <h2 id={`event-title-${event.id}`}>{event.title}</h2>
                  <p className="agenda__time">
                    {weekday(date)} · {formatTime(event)}
                  </p>
                  {event.description && <p className="agenda__desc">{event.description}</p>}
                </div>
                <div className="agenda__action">
                  <CalendarButton
                    title={event.title}
                    date={date}
                    description={event.description}
                    startTime={event.startTime}
                    endTime={event.endTime}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="empty" role="status">
          <p className="empty__title">Aktuell sind keine Termine eingetragen.</p>
          <p>
            Die Termine der neuen Saison folgen in Kürze.
            {eventCalendar && (
              <>
                {" "}
                Bis dahin findest du die geplanten Veranstaltungen im{" "}
                <a href={eventCalendar.file} download>
                  {eventCalendar.title} (PDF)
                </a>
                .
              </>
            )}
          </p>
        </div>
      )}
    </Container>
  );
}
