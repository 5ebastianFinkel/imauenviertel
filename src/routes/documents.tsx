import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { allDocuments, allLinks } from "content-collections";
import { Container } from "@components/Container";
import { SectionHead } from "@components/SectionHead";
import { sortByOrder } from "@utils/content";
import { pageHead } from "@utils/seo";
import { useScrollReveal } from "@utils/useScrollReveal";

export const Route = createFileRoute("/documents")({
  head: () => pageHead("Dokumente & Links", "/documents"),
  loader: () => ({
    documents: sortByOrder(allDocuments),
    links: sortByOrder(allLinks),
  }),
  component: DocumentsPage,
});

// Styles: styles/pages/documents.css
function DocumentsPage() {
  const { documents, links } = Route.useLoaderData();
  useScrollReveal();

  return (
    <Container className="page-documents">
      <SectionHead
        eyebrow="Aus dem Vereinsarchiv"
        title={
          <>
            Dokumente <em>&amp; Links</em>
          </>
        }
        desc="Ordnungen, Formulare und Pläne zum Herunterladen – und gute Adressen rund ums Kleingärtnern."
      />

      <div className="lists">
        <section aria-labelledby="documents-title">
          <h2 id="documents-title" className="list-title">
            Dokumente
          </h2>
          <ul className="rows">
            {documents.map((doc, i) => (
              <li
                key={doc.id}
                data-reveal
                style={{ "--reveal-delay": `${Math.min(i, 6) * 60}ms` } as CSSProperties}
              >
                <a href={doc.file} download>
                  <span className="rows__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rows__text">
                    <span className="rows__title">{doc.title}</span>
                    {doc.description && <span className="rows__desc">{doc.description}</span>}
                  </span>
                  <span className="rows__meta">PDF ↓</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="links"
          aria-labelledby="links-title"
          data-reveal
          style={{ "--reveal-delay": "150ms" } as CSSProperties}
        >
          <h2 id="links-title" className="list-title">
            Interessante Links
          </h2>
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <span className="links__title">
                    {link.title} <span aria-hidden="true">↗</span>
                  </span>
                  {link.description && <span className="links__desc">{link.description}</span>}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
