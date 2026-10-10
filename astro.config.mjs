import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://imauenviertel.netlify.app",
  integrations: [
    mdx(),
    // Keep design preview pages out of the sitemap
    sitemap({ filter: (page) => !page.includes("/redesign") }),
    icon(),
  ],
  vite: {
    plugins: [tailwind()],
  },
});
