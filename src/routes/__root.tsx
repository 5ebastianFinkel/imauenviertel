import { useEffect, type ReactNode } from "react";
import { createRootRoute, HeadContent, Outlet, Scripts, useLocation } from "@tanstack/react-router";
import { Footer } from "@components/Footer";
import { Navbar } from "@components/Navbar";
import { NotFound } from "@components/NotFound";
import { NOT_FOUND_TITLE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@utils/seo";
import appCss from "../styles/globals.css?url";

// After a login on the public site, continue to the CMS
const identityRedirect = `
document.addEventListener("DOMContentLoaded", () => {
  try {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", (user) => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  } catch (error) {
    console.error("Netlify Identity initialization error:", error);
  }
});`;

export const Route = createRootRoute({
  head: ({ matches }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width" },
      { name: "theme-color", content: "#fbf7ee" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: SITE_NAME },
      // Pages set their own title (see pageHead). When no page matched the
      // URL, or a page stopped loading with notFound(), NotFound is shown.
      {
        title:
          matches.length === 1 || matches.some((match) => match.status !== "success")
            ? NOT_FOUND_TITLE
            : SITE_TITLE,
      },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_URL}/opengraph.png` },
      { property: "og:image:alt", content: SITE_TITLE },
      { property: "og:locale", content: "de_DE" },
      { property: "og:site_name", content: SITE_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@imauenviertel" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      // Marks the document as scripted before the first paint (see the
      // scroll reveal and mobile menu styles)
      { children: 'document.documentElement.classList.add("js");' },
      { src: "https://identity.netlify.com/v1/netlify-identity-widget.js", defer: true },
      { children: identityRedirect },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    // The inline script above adds the "js" class before React hydrates
    <html lang="de" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  // Transparent header over the full-bleed hero of the start page
  const overlayHeader = useLocation({ select: (location) => location.pathname === "/" });

  // The inline script in <head> sets this before the first paint. Set it again
  // in case React had to render the document from scratch.
  useEffect(() => document.documentElement.classList.add("js"), []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[60] bg-ink text-paper px-4 py-2 rounded-leaf-sm"
      >
        Zum Hauptinhalt springen
      </a>
      <Navbar overlay={overlayHeader} />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
