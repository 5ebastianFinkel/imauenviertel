import type { CSSProperties } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { allBlogs } from "content-collections";
import { Container } from "@components/Container";
import { SectionHead } from "@components/SectionHead";
import { formatPublishDate, getPublished } from "@utils/content";
import { responsiveImage } from "@utils/images";
import { pageHead } from "@utils/seo";
import { useScrollReveal } from "@utils/useScrollReveal";

export const Route = createFileRoute("/blog/")({
  head: () => pageHead("Neuigkeiten", "/blog"),
  loader: () => ({
    // Published posts, newest first. The post body is not needed here.
    posts: getPublished(allBlogs)
      .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
      .map(({ html: _html, ...post }) => post),
  }),
  component: BlogPage,
});

// Styles: styles/pages/blog.css
function BlogPage() {
  const { posts } = Route.useLoaderData();
  useScrollReveal();

  return (
    <Container className="page-blog">
      <SectionHead
        eyebrow="Neuigkeiten"
        title={
          <>
            Neues aus dem <em>Verein</em>
          </>
        }
        desc="Aktuelle Meldungen und Berichte über Veranstaltungen, Gemeinschaftsarbeit und das Leben in der Anlage."
      />

      <ul className="posts">
        {posts.map((post, index) => (
          <li
            key={post.id}
            className={index === 0 ? "post post--lead" : "post"}
            data-reveal
            style={{ "--reveal-delay": `${(index % 2) * 120}ms` } as CSSProperties}
          >
            <Link to="/blog/$id" params={{ id: post.id }}>
              <div className="post__image">
                <img
                  {...responsiveImage(post.image.src, post.image.width)}
                  sizes={index === 0 ? "(max-width: 760px) 100vw, 60vw" : "(max-width: 760px) 100vw, 50vw"}
                  alt={post.image.alt}
                  width={1200}
                  height={900}
                  loading={index <= 1 ? "eager" : "lazy"}
                  decoding={index <= 1 ? "sync" : "async"}
                />
              </div>
              <div className="post__text">
                <p className="eyebrow post__category">{post.category}</p>
                <h2>{post.title}</h2>
                <p className="post__meta">
                  {post.author} · <time dateTime={post.publishDate}>{formatPublishDate(post.publishDate)}</time>
                </p>
                <span className="link-arrow">
                  Weiterlesen <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
