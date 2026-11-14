import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { allTeams } from "content-collections";
import { Container } from "@components/Container";
import { SectionHead } from "@components/SectionHead";
import { getPublished } from "@utils/content";
import { pageHead } from "@utils/seo";
import { useScrollReveal } from "@utils/useScrollReveal";

export const Route = createFileRoute("/about")({
  head: () => pageHead("Der Vorstand", "/about"),
  loader: () => ({
    // Team entries with 'draft: false' & date before current date
    members: getPublished(allTeams).sort((a, b) => a.id.localeCompare(b.id)),
  }),
  component: AboutPage,
});

const initials = (name: string) =>
  name
    .replace(/^Dr\.\s*/, "")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

// Styles: styles/pages/about.css
function AboutPage() {
  const { members } = Route.useLoaderData();
  useScrollReveal();

  return (
    <Container className="page-about">
      <SectionHead
        eyebrow="Über uns"
        title={
          <>
            Der <em>Vorstand</em>
          </>
        }
        desc="Ehrenamtlich für die Anlage und alle, die darin gärtnern."
      />

      <div className="intro" data-reveal>
        <h2>Der Vorstand stellt sich vor.</h2>
        <p>
          Wir treffen uns regelmäßig, um im Team die vielen kleinen und größeren Aufgaben rund um unseren
          Kleingartenverein ehrenamtlich zu erledigen. Dazu gehören zum Beispiel die Aufnahme von neuen
          Mitgliedern, die Organisation der Mitgliederversammlung, die Jahresabrechnungen, der Kontakt zum
          Stadt- und Bezirksverband oder die Aushänge im Schaukasten.
        </p>
        <p>
          Ihr erreicht uns alle zusammen über die E-Mail-Adresse{" "}
          <a href="mailto:mail@imauenviertel.de">mail@imauenviertel.de</a>.
        </p>
      </div>

      <ul className="team">
        {members.map((member, i) => (
          <li
            key={member.id}
            className="member"
            data-reveal
            style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
          >
            <span className="member__mark" aria-hidden="true">
              {initials(member.name)}
            </span>
            <h3>{member.name}</h3>
            <p>{member.title}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
