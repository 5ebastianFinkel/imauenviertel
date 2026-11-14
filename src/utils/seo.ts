// Head tags shared by all pages. The root route (src/routes/__root.tsx) adds
// the site-wide tags, pageHead() the ones that differ per page.
export const SITE_URL = "https://imauenviertel.netlify.app";
export const SITE_NAME = "Im Auenviertel";
export const SITE_TITLE = "Im Auenviertel - Kleingartenverein";
export const SITE_DESCRIPTION =
  "Kleingartenverein in Münster Gievenbeck - Gemeinschaft, Natur und Erholung in unserem Kleingartenverein Im Auenviertel";

export const NOT_FOUND_TITLE = `Seite nicht gefunden | ${SITE_NAME}`;

export function pageHead(title: string, path: string) {
  // Pages are published as /page/index.html, so the canonical URL ends in a slash
  const canonical = new URL(path.endsWith("/") ? path : `${path}/`, SITE_URL).toString();
  return {
    meta: [
      { title: title ? `${title} | ${SITE_NAME}` : SITE_TITLE },
      { property: "og:url", content: canonical },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}
