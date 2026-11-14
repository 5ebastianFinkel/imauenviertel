import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import logo from "@assets/logo.avif?w=48;96&format=webp&as=img";

interface Props {
  // Transparent header laid over the start page hero
  overlay?: boolean;
}

const menuitems = [
  { title: "Neuigkeiten", path: "/blog" },
  { title: "Termine", path: "/dates" },
  { title: "Über uns", path: "/about" },
  { title: "Dokumente & Links", path: "/documents" },
  { title: "Kontakt", path: "/contact" },
] as const;

// Styles: styles/components/navbar.css
export function Navbar({ overlay = false }: Props) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = useLocation({ select: (location) => location.pathname });

  // Close the mobile menu after navigating
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={overlay ? "site-header site-header--overlay" : "site-header"}
      data-open={open ? "" : undefined}
    >
      <div className="site-header__inner">
        <Link
          to="/"
          className="brand"
          aria-label="Im Auenviertel – zur Startseite"
          activeOptions={{ exact: true }}
        >
          <span className="brand__mark">
            <img
              src={logo.src}
              srcSet={logo.srcset}
              sizes="30px"
              width={logo.w}
              height={logo.h}
              alt=""
              loading="eager"
              decoding="async"
            />
          </span>
          <span className="brand__name">Im Auenviertel</span>
        </Link>

        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-toggle__label">Menü</span>
          <span className="menu-toggle__icon" aria-hidden="true">
            <span></span>
          </span>
        </button>

        <nav id="site-menu" className="site-nav" aria-label="Hauptnavigation">
          <ul>
            {menuitems.map((item) => (
              <li key={item.path}>
                {/* Link sets aria-current="page" on the active entry */}
                <Link to={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
