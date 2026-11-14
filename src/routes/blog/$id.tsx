import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { allBlogs } from "content-collections";
import { Container } from "@components/Container";
import { formatPublishDate } from "@utils/content";
import { responsiveImage } from "@utils/images";
import { pageHead } from "@utils/seo";

// Posts may reference images in src/assets relatively (../../assets/photo.webp).
// Point those at an optimized copy emitted by Vite (vite-imagetools).
const assets = import.meta.glob<{ src: string; w: number; h: number }>("/src/assets/*", {
  eager: true,
  query: "?w=1600&withoutEnlargement&format=webp&as=img",
  import: "default",
});

const resolveAssets = (html: string) =>
  html.replace(/src="(?:\.\.\/)+assets\/([^"]+)"/g, (match, file: string) => {
    const image = assets[`/src/assets/${file}`];
    return image
      ? `src="${image.src}" width="${image.w}" height="${image.h}" loading="lazy" decoding="async"`
      : match;
  });

export const Route = createFileRoute("/blog/$id")({
  loader: ({ params }) => {
    const post = allBlogs.find((entry) => entry.id === params.id && !entry.draft);
    if (!post) throw notFound();
    return { post: { ...post, html: resolveAssets(post.html) } };
  },
  // Without loader data the post does not exist; the root route titles the not-found page
  head: ({ params, loaderData }) => (loaderData ? pageHead(loaderData.post.title, `/blog/${params.id}`) : {}),
  component: BlogPostPage,
});

// Styles: styles/pages/post.css
function BlogPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <Container className="page-post">
      <article className="article">
        <header className="article__head">
          <Link className="link-arrow back" to="/blog">
            <span aria-hidden="true">←</span> Alle Neuigkeiten
          </Link>
          <p className="eyebrow category">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="meta">
            {post.author} · <time dateTime={post.publishDate}>{formatPublishDate(post.publishDate)}</time>
          </p>
          {post.tags.length > 0 && (
            <ul className="tags" aria-label="Schlagwörter">
              {post.tags.map((tag) => (
                <li key={tag}>#{tag}</li>
              ))}
            </ul>
          )}
        </header>

        <figure className="article__image">
          <img
            {...responsiveImage(post.image.src, "(max-width: 1032px) calc(100vw - 2.5rem), 992px")}
            alt={post.image.alt}
            width={1600}
            height={900}
            loading="eager"
          />
        </figure>

        <div className="prose prose-lg article__body" dangerouslySetInnerHTML={{ __html: post.html }} />

        <footer className="article__foot">
          <Link className="btn btn-outline" to="/blog">
            Zurück zur Übersicht
          </Link>
        </footer>
      </article>
    </Container>
  );
}
