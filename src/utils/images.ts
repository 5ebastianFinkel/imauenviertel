// Responsive images through the Netlify Image CDN (https://docs.netlify.com/build/image-cdn/overview/).
// /.netlify/images resizes and re-encodes an image on request. It only exists
// on Netlify; `pnpm dev` and `pnpm preview` redirect it to the original image
// (see imageCdnFallback in vite.config.ts).

// Remote hosts the CDN may fetch from. Keep in sync with `remote_images` in
// netlify.toml; images from other hosts are used as they are.
export const REMOTE_IMAGE_HOSTS = ["images.unsplash.com", "res.cloudinary.com"];

export const IMAGE_WIDTHS = [480, 800, 1200, 1600, 2000];

// Site images (/uploads/...) and images on the allowed remote hosts
export function canTransform(src: string): boolean {
  if (src.startsWith("/")) return !src.startsWith("//") && !src.startsWith("/.netlify/");
  try {
    const url = new URL(src);
    return url.protocol === "https:" && REMOTE_IMAGE_HOSTS.includes(url.hostname);
  } catch {
    return false;
  }
}

export function imageCdnUrl(src: string, width: number): string {
  // The url parameter is the image URL as a browser would request it, so
  // percent-encode it once (CMS file names may contain spaces and umlauts)
  // and then encode it as a query value.
  const url = src.startsWith("/") ? encodeURI(safeDecodeURI(src)) : src;
  return `/.netlify/images?url=${encodeURIComponent(url)}&w=${width}`;
}

export interface ResponsiveImage {
  src: string;
  srcSet?: string;
}

// `src` plus a `srcSet` of CDN widths. Pass the image's own width when it is
// known, so small images are not scaled up.
export function responsiveImage(src: string, intrinsicWidth?: number): ResponsiveImage {
  if (!canTransform(src)) return { src };

  const largest = IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
  const widths = intrinsicWidth
    ? [...IMAGE_WIDTHS.filter((width) => width < intrinsicWidth), Math.min(intrinsicWidth, largest)]
    : IMAGE_WIDTHS;
  const unique = [...new Set(widths)];

  // Browsers without srcset support get a mid-sized image
  const fallback = unique.find((width) => width >= 1200) ?? unique[unique.length - 1];
  return {
    src: imageCdnUrl(src, fallback),
    srcSet: unique.map((width) => `${imageCdnUrl(src, width)} ${width}w`).join(", "),
  };
}

function safeDecodeURI(value: string): string {
  try {
    return decodeURI(value);
  } catch {
    return value;
  }
}
