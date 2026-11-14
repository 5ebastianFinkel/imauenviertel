import { Link } from "@tanstack/react-router";
import { Container } from "./Container";

// The router's notFoundComponent, shown for unknown URLs. It is also
// prerendered as /404.html (see src/server.ts). Styles: styles/pages/404.css
export function NotFound() {
  return (
    <Container className="page-404">
      <div className="missing">
        <div className="missing__text">
          <p className="eyebrow">Fehler 404</p>
          <h1>
            Hier wächst <em>leider nichts.</em>
          </h1>
          <p className="missing__desc">
            Diese Seite wurde leider nicht gefunden. Vielleicht wurde sie verschoben – auf der Startseite
            findest du alles Wichtige.
          </p>
          <div className="missing__actions">
            <Link className="btn" to="/">
              Zur Startseite
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6"></path>
              </svg>
            </Link>
            <Link className="link-arrow" to="/blog">
              Neuigkeiten <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <p className="missing__code" aria-hidden="true">
          404
        </p>
      </div>
    </Container>
  );
}
