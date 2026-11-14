import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

// The site is prerendered, so this entry only runs in `vite dev` and during
// the build. Its one job is /404.html: that page is rendered from a URL no
// route matches (see `pages` in vite.config.ts), which lets the browser
// hydrate it under whatever unknown address Netlify serves it for. The
// prerenderer only keeps successful responses, hence the 200.
const NOT_FOUND_PAGE = "/404";

export default createServerEntry({
  async fetch(request) {
    const response = await handler.fetch(request);
    const pathname = new URL(request.url).pathname.replace(/\/$/, "");
    if (response.status === 404 && pathname === NOT_FOUND_PAGE) {
      return new Response(response.body, { status: 200, headers: response.headers });
    }
    return response;
  },
});
