import { defineConfig, type Connect, type Plugin } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import contentCollections from "@content-collections/vite";
import { imagetools } from "vite-imagetools";

// Decap CMS lives in public/admin/. Vite only serves it at /admin/index.html,
// so point /admin and /admin/ there during development (Netlify does this in
// production).
const adminDevRewrite = (): Plugin => ({
  name: "admin-dev-rewrite",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === "/admin" || req.url === "/admin/") req.url = "/admin/index.html";
      next();
    });
  },
});

// The Netlify Image CDN (/.netlify/images, see src/utils/images.ts) only runs
// on Netlify. Locally, send its requests to the original image instead.
const imageCdnFallback = (): Plugin => {
  const redirect: Connect.NextHandleFunction = (req, res, next) => {
    if (!req.url?.startsWith("/.netlify/images")) return next();
    const target = new URL(req.url, "http://localhost").searchParams.get("url");
    if (!target) return next();
    res.statusCode = 302;
    res.setHeader("Location", target);
    res.end();
  };
  return {
    name: "image-cdn-fallback",
    configureServer: (server) => void server.middlewares.use(redirect),
    configurePreviewServer: (server) => void server.middlewares.use(redirect),
  };
};

export default defineConfig({
  server: { port: 4321 },
  resolve: { tsconfigPaths: true },
  plugins: [
    adminDevRewrite(),
    imageCdnFallback(),
    contentCollections(),
    imagetools(),
    tailwindcss(),
    tanstackStart({
      // The site is fully static: every page is rendered to HTML at build time
      // and served from dist/client without a server.
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // Downloads and CMS uploads are files, not pages
        filter: ({ path }) => !path.startsWith("/uploads") && !path.startsWith("/admin"),
      },
      pages: [
        // Netlify serves /404.html for unknown URLs. No route matches /404, so
        // this renders the not-found page (see src/server.ts).
        { path: "/404", prerender: { outputPath: "/404.html" } },
      ],
      // scripts/sitemap.mjs writes the sitemap from the prerendered pages
      sitemap: { enabled: false },
    }),
    viteReact(),
  ],
});
