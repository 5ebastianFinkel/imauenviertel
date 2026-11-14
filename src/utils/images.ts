// Responsive images for content images that live on an image service which
// resizes through the URL:
// - Cloudinary, where Decap CMS uploads images (media_library in public/admin/config.yml)
// - Unsplash (imgix URL parameters)
// Other images, such as the older files in public/uploads, are used as they are.

// Our Cloudinary cloud. Images of other clouds are left alone, their
// transformation settings and quota are not ours to use.
export const CLOUDINARY_CLOUD = "dc6swddrn";

export const IMAGE_WIDTHS = [480, 800, 1200, 1600, 2000];

// res.cloudinary.com/<cloud>/image/upload/[transformations/]v<version>/<public id>
const cloudinaryUpload = new RegExp(
  `^(https://res\\.cloudinary\\.com/${CLOUDINARY_CLOUD}/image/upload/)((?:[^/]+/)*?)(v\\d+/.+)$`,
);

// URL of the image resized to `width`, or undefined if it cannot be resized
export function resizedImageUrl(src: string, width: number): string | undefined {
  const cloudinary = cloudinaryUpload.exec(src);
  if (cloudinary) {
    // Appended after transformations the CMS may have added. f_auto/q_auto
    // pick the format and quality per browser; c_limit never scales up.
    const [, base, transformations, rest] = cloudinary;
    return `${base}${transformations}f_auto,q_auto,c_limit,w_${width}/${rest}`;
  }

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return undefined;
  }
  if (url.protocol === "https:" && url.hostname === "images.unsplash.com") {
    url.searchParams.set("w", String(width));
    const auto = url.searchParams.get("auto");
    if (!auto?.split(",").includes("format")) url.searchParams.set("auto", auto ? `${auto},format` : "format");
    return url.toString();
  }

  return undefined;
}

export interface ResponsiveImage {
  src: string;
  srcSet?: string;
  sizes?: string;
}

// `src`, `srcSet` across IMAGE_WIDTHS and `sizes` (the displayed width, as in
// the <img> attribute) for images that can be resized; just `src` otherwise
export function responsiveImage(src: string, sizes?: string): ResponsiveImage {
  if (!resizedImageUrl(src, IMAGE_WIDTHS[0])) return { src };
  return {
    // Browsers without srcset support get a mid-sized image
    src: resizedImageUrl(src, 1200)!,
    srcSet: IMAGE_WIDTHS.map((width) => `${resizedImageUrl(src, width)} ${width}w`).join(", "),
    sizes,
  };
}
