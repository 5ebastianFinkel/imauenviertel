import type { CSSProperties } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { allDocuments, allEvents, allLinks } from "content-collections";
import pathImage from "@assets/Ergebnis_Heckenschnitt.webp?w=800;1280;1920;2560&format=webp&as=img";
import gateImage from "@assets/Gartentor.webp?w=480;800&format=webp&as=img";
import flowerImage from "@assets/Blumen.webp?w=360;560&format=webp&as=img";
import { CalendarButton } from "@components/ui/CalendarButton";
import {
  day,
  formatTime,
  getUpcomingEvents,
  monthShort,
  parseLocalDate,
  sortByOrder,
  weekday,
} from "@utils/content";
import { pageHead } from "@utils/seo";
import { useScrollReveal } from "@utils/useScrollReveal";

export const Route = createFileRoute("/")({
  head: () => pageHead("", "/"),
  loader: () => {
    const allDocumentsSorted = sortByOrder(allDocuments);
    return {
      events: getUpcomingEvents(allEvents, 3),
      documents: allDocumentsSorted.slice(0, 5),
      links: sortByOrder(allLinks),
      eventCalendar: allDocumentsSorted.find((doc) => doc.title.startsWith("Veranstaltungskalender")),
    };
  },
  component: HomePage,
});

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

// Styles: styles/pages/home.css
function HomePage() {
  const { events, documents, links, eventCalendar } = Route.useLoaderData();
  useScrollReveal();

  return (
    <div className="home">
      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero__bg"
          src={pathImage.src}
          srcSet={pathImage.srcset}
          sizes="100vw"
          width={pathImage.w}
          height={pathImage.h}
          alt=""
          loading="eager"
          decoding="async"
        />
        <div className="hero__shade" aria-hidden="true"></div>

        <div className="hero__content wrap">
          <p className="eyebrow fade" style={delay(100)}>
            Kleingartenverein · Münster-Gievenbeck
          </p>
          <h1 id="hero-title" className="fade" style={delay(200)}>
            Wo der Feierabend
            <br />
            <em>Wurzeln schlägt.</em>
          </h1>
          <p className="lede fade" style={delay(320)}>
            Gemeinschaft, Natur und Erholung – mitten im Auenviertel. Komm vorbei, pack mit an und bleib auf
            ein Gespräch am Gartenzaun.
          </p>
          <div className="hero__row fade" style={delay(440)}>
            <a className="btn btn-down" href="#termine">
              Kommende Termine
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5v14m-6-6 6 6 6-6"></path>
              </svg>
            </a>
            <div className="hours">
              <span className="hours__dot" aria-hidden="true"></span>
              <span>
                Anlage geöffnet <strong>15.03.–30.09.</strong>, täglich <strong>08–20 Uhr</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="termine" className="wrap section" aria-labelledby="events-title">
        <div className="section__head" data-reveal>
          <span className="section__num">01</span>
          <h2 id="events-title">
            Termine im <em>Gartenjahr</em>
          </h2>
        </div>

        {events.length > 0 ? (
          <ol className="timeline">
            {events.map((event, i) => {
              const date = parseLocalDate(event.date);
              return (
                <li key={event.id} className="moment" data-reveal style={revealDelay(i * 110)}>
                  <span className="moment__dot" aria-hidden="true" />
                  <p className="moment__date">
                    <span className="moment__day">{day(date)}</span>
                    <span>{monthShort(date)}</span>
                  </p>
                  <h3>{event.title}</h3>
                  <p className="moment__time">
                    {weekday(date)}, {formatTime(event)}
                  </p>
                  {event.description && <p className="moment__desc">{event.description}</p>}
                  <div className="moment__action">
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
          <div className="empty" data-reveal>
            <p className="empty__title">Die Termine der neuen Saison folgen in Kürze.</p>
            {eventCalendar && (
              <p>
                Bis dahin findest du alle geplanten Veranstaltungen im{" "}
                <a href={eventCalendar.file} download>
                  {eventCalendar.title} (PDF)
                </a>
                .
              </p>
            )}
          </div>
        )}
        <Link className="link-arrow" to="/dates" data-reveal>
          Alle Termine <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="wrap section" aria-labelledby="docs-title">
        <div className="section__head" data-reveal>
          <span className="section__num">02</span>
          <h2 id="docs-title">
            Dokumente <em>&amp; Links</em>
          </h2>
        </div>
        <div className="lists">
          <div>
            <ul className="rows">
              {documents.map((doc, i) => (
                <li key={doc.id} data-reveal style={revealDelay(i * 70)}>
                  <a href={doc.file} download>
                    <span className="rows__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="rows__title">{doc.title}</span>
                    <span className="rows__meta">PDF ↓</span>
                  </a>
                </li>
              ))}
            </ul>
            <Link className="link-arrow rows__more" to="/documents" data-reveal>
              Alle Dokumente <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="side" data-reveal style={revealDelay(150)}>
            <figure className="side__photo">
              <img
                src={flowerImage.src}
                srcSet={flowerImage.srcset}
                sizes="(max-width: 900px) 90vw, 28vw"
                width={flowerImage.w}
                height={flowerImage.h}
                alt="Lila Iris und blaue Krokusse im Frühlingsgarten"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <h3>Verbände &amp; Gesetz</h3>
            <ul className="side__links">
              {links.map((link) => (
                <li key={link.id}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wrap join" aria-labelledby="join-title" data-reveal>
        <figure className="join__photo">
          <img
            src={gateImage.src}
            srcSet={gateImage.srcset}
            sizes="(max-width: 900px) 90vw, 45vw"
            width={gateImage.w}
            height={gateImage.h}
            alt="Das Gartentor mit dem Schild des Vereins und den Öffnungszeiten"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="join__text">
          <h2 id="join-title">
            Ein eigener Garten? <em>Sprich uns an.</em>
          </h2>
          <p>
            Der Vorstand beantwortet gern deine Fragen zu freien Parzellen, Wartezeiten und dem Vereinsleben.
          </p>
          <div className="join__actions">
            <Link className="btn" to="/contact">
              Kontakt aufnehmen
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6"></path>
              </svg>
            </Link>
            <Link className="link-arrow" to="/documents">
              Bewerbungsbogen <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
