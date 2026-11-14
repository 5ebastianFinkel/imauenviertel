import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { allDocuments } from "content-collections";
import { ContactForm } from "@components/ContactForm";
import { Container } from "@components/Container";
import { SectionHead } from "@components/SectionHead";
import { pageHead } from "@utils/seo";
import { useScrollReveal } from "@utils/useScrollReveal";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("Kontakt", "/contact"),
  loader: () => ({
    checklist: allDocuments.find((doc) => doc.title.startsWith("Checkliste")),
    application: allDocuments.find((doc) => doc.title.startsWith("Bewerbungsbogen")),
  }),
  component: ContactPage,
});

// Styles: styles/pages/contact.css
function ContactPage() {
  const { checklist, application } = Route.useLoaderData();
  useScrollReveal();

  return (
    <Container className="page-contact">
      <SectionHead
        eyebrow="Kontakt"
        title={
          <>
            Schreib <em>uns.</em>
          </>
        }
        desc="Bei Fragen, Anregungen oder Interesse an einem Garten."
      />

      <div className="contact">
        <div className="contact__info">
          <section className="card" data-reveal>
            <h2>Für Garten&shy;interessierte</h2>
            <p>
              <strong>Im Moment ist keine Parzelle frei.</strong>
            </p>
            <p>
              Wir führen aber eine Warteliste. Wenn Sie auf die Warteliste aufgenommen werden möchten, lesen
              Sie sich bitte unsere Checkliste „Bin ich ein Kleingärtner“ durch. Danach füllen Sie bitte den
              Bewerbungsbogen aus und senden Sie ihn an{" "}
              <a href="mailto:mail@imauenviertel.de">mail@imauenviertel.de</a>.
            </p>
            {(checklist || application) && (
              <ul className="card__files">
                {checklist && (
                  <li>
                    <a className="btn-sm" href={checklist.file} download>
                      {checklist.title} ↓
                    </a>
                  </li>
                )}
                {application && (
                  <li>
                    <a className="btn-sm" href={application.file} download>
                      {application.title} ↓
                    </a>
                  </li>
                )}
              </ul>
            )}
          </section>

          <section className="plain" data-reveal style={{ "--reveal-delay": "100ms" } as CSSProperties}>
            <h2>Kontakt zum Vorstand</h2>
            <p>
              Haben Sie Fragen? Wir helfen Ihnen gerne weiter. Füllen Sie das Formular aus oder senden Sie uns
              eine E-Mail.
            </p>
            <p className="address">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              Ramertsweg 50, 48161 Münster
            </p>
          </section>
        </div>

        <div className="contact__form" data-reveal style={{ "--reveal-delay": "150ms" } as CSSProperties}>
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
