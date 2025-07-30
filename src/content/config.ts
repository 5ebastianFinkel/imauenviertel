// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define your collection(s)
const blogCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    image: z.object({
      src: z.string(),
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
  schema: z.object({
    title: z.string(),
    description: z.string(),
    file: z.string(), // Path to PDF file in /uploads/
    order: z.number().default(0), // For sorting documents
    publishDate: z.string().transform(str => new Date(str)),
  })
});

const linksCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    description: z.string().optional(),
    order: z.number().default(0), // For sorting links
  })
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'blog': blogCollection,
  'team': teamCollection,
  'events': eventsCollection,
  'documents': documentsCollection,
  'links': linksCollection,
};