import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const summaries = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/summaries" }),
  schema: z.object({
    title: z.string(),
    series: z.string(),
    book: z.string(),
    bookOrder: z.number().optional(),
    startChapter: z.number(),
    range: z.string(),
  })
});

export const collections = { summaries };
