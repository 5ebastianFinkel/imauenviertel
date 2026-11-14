// Writes dist/client/sitemap.xml after `vite build`. Every prerendered page
// declares its canonical URL (see src/utils/seo.ts), so the sitemap is simply
// the list of those. Pages without one, such as 404.html, are left out.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outDir = "dist/client";

const files = (await readdir(outDir, { recursive: true })).filter((file) => file.endsWith(".html"));

const urls = [];
for (const file of files) {
  const html = await readFile(join(outDir, file), "utf8");
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical) urls.push(canonical);
}
urls.sort();

if (urls.length === 0) throw new Error(`No pages with a canonical URL found in ${outDir}`);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((url) => `  <url><loc>${url.replaceAll("&", "&amp;")}</loc></url>`),
  "</urlset>",
  "",
].join("\n");

await writeFile(join(outDir, "sitemap.xml"), xml);
console.log(`[sitemap] ${urls.length} pages written to ${outDir}/sitemap.xml`);
