import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://imauenviertel.netlify.app",
  // Astro 7 defaults to JSX whitespace rules, which drop the space before an
  // inline element on a new line ("an\n<a>…" renders as "an…"). Keep the
  // lossless compression Astro 6 used.
  compressHTML: true,
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwind()],
  },
});
