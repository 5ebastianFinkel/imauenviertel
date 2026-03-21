import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    image: z.object({
      // CMS sometimes saves src as array, normalize to string
      src: z.union([
        z.string(),
        z.array(z.string()).transform(arr => arr[0])
      ]),
      alt: z.string(),
    }),
    publishDate: z.union([
      z.string().transform(str => new Date(str)),
      z.date()
    ]),
    author: z.string().default('Im Auenviertel'),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

const teamCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/team" }),
  schema: z.object({
    draft: z.boolean(),
    name: z.string(),
    title: z.string(),
    avatar: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.string().transform(str => new Date(str)),
  }),
});

const eventsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    date: z.union([
      z.string().transform(str => {
        // Parse date as local time, not UTC
        const [year, month, day] = str.split('-').map(Number);
        return new Date(year, month - 1, day);
      }),
      z.date()
    ]),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(), // HH:MM format
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(), // HH:MM format
    description: z.string().optional(),
  })
})

const documentsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/documents" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // CMS sometimes saves file as array, normalize to string
    file: z.union([
      z.string(),
      z.array(z.string()).transform(arr => arr[0])
    ]),
    order: z.number().default(0), // For sorting documents
    publishDate: z.union([
      z.string().transform(str => new Date(str)),
      z.date()
    ]),
  })
});

const linksCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/links" }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    description: z.string().optional(),
    order: z.number().default(0), // For sorting links
  })
});

export const collections = {
  'blog': blogCollection,
  'team': teamCollection,
  'events': eventsCollection,
  'documents': documentsCollection,
  'links': linksCollection,
};
