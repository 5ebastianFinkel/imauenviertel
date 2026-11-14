import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import remarkGfm from "remark-gfm";
import { z } from "zod";

// The CMS sometimes saves a single file as an array, normalize to string
const fileRef = z.union([z.string(), z.array(z.string()).nonempty().transform((arr) => arr[0])]);

// Dates are kept as ISO strings so they survive the trip into the client bundle
const isoDateTime = z
  .union([z.string(), z.date()])
  .transform((value) => new Date(value).toISOString());

const time = z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/); // HH:MM format

const blog = defineCollection({
  name: "blog",
  directory: "src/content/blog",
  include: "**/*.md",
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    image: z.object({
      src: fileRef,
      alt: z.string(),
    }),
    publishDate: isoDateTime,
    author: z.string().default("Im Auenviertel"),
    category: z.string(),
    tags: z.array(z.string()),
    content: z.string(),
  }),
  transform: async ({ content: _content, _meta, ...data }, context) => {
    const html = await compileMarkdown(context, { _meta, content: _content }, { remarkPlugins: [remarkGfm] });
    return { ...data, id: _meta.path, html };
  },
});

const team = defineCollection({
  name: "team",
  directory: "src/content/team",
  include: "**/*.md",
  parser: "frontmatter-only",
  schema: z.object({
    draft: z.boolean(),
    name: z.string(),
    title: z.string(),
    avatar: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: isoDateTime,
  }),
  transform: ({ _meta, ...data }) => ({ ...data, id: _meta.path }),
});

const events = defineCollection({
  name: "events",
  directory: "src/content/events",
  include: "**/*.md",
  parser: "frontmatter-only",
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    // Calendar day (YYYY-MM-DD). It is turned into a local Date where it is
    // displayed, see parseLocalDate in src/utils/content.ts.
    date: z
      .union([z.string(), z.date().transform((date) => date.toISOString().slice(0, 10))])
      .pipe(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
    startTime: time.optional(),
    endTime: time.optional(),
    description: z.string().optional(),
  }),
  transform: ({ _meta, ...data }) => ({ ...data, id: _meta.path }),
});

const documents = defineCollection({
  name: "documents",
  directory: "src/content/documents",
  include: "**/*.md",
  parser: "frontmatter-only",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    file: fileRef,
    order: z.number().default(0), // For sorting documents
    publishDate: isoDateTime,
  }),
  transform: ({ _meta, ...data }) => ({ ...data, id: _meta.path }),
});

const links = defineCollection({
  name: "links",
  directory: "src/content/links",
  include: "**/*.md",
  parser: "frontmatter-only",
  schema: z.object({
    title: z.string(),
    url: z.url(),
    description: z.string().optional(),
    order: z.number().default(0), // For sorting links
  }),
  transform: ({ _meta, ...data }) => ({ ...data, id: _meta.path }),
});

export default defineConfig({
  content: [blog, team, events, documents, links],
});
