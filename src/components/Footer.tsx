import { Link } from "@tanstack/react-router";

// Styles: styles/components/footer.css
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">
            Im Auenviertel <em>e.V.</em>
          </p>
          <p>Kleingartenverein in Münster-Gievenbeck</p>
          <svg className="site-footer__leaf" viewBox="0 0 64 64" aria-hidden="true">
            <path d="M10 54C10 28 26 10 56 8c0 30-18 46-46 46Z" />
            <path d="M10 54 40 24" />
          </svg>
        </div>

        <div>
          <h2 className="eyebrow">Anlage geöffnet</h2>
          <p>
            15. März – 30. September
            <br />
            täglich 08–20 Uhr
          </p>
        </div>

        <div>
          <h2 className="eyebrow">Kontakt</h2>
          <p>
            <a href="mailto:mail@imauenviertel.de">mail@imauenviertel.de</a>
            <br />
            <Link to="/contact/">Zum Kontaktformular</Link>
          </p>
        </div>

        <div>
          <h2 className="eyebrow">Rechtliches</h2>
          <p>
            <Link to="/impressum/">Impressum</Link>
            <br />
            <Link to="/datenschutz/">Datenschutz</Link>
          </p>
        </div>
      </div>

      {/* The year is rendered at build time and may differ in the browser */}
      <p className="site-footer__copy" suppressHydrationWarning>
        © {year} Kleingärtnerverein „Im Auenviertel“ e.V.
      </p>
    </footer>
  );
}
