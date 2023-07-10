import { defineCollection, z } from "astro:content";
import { categories } from "./categories";

export const collections = {
  blog: defineCollection({
    schema: z.object({
      draft: z.boolean().default(false),
      date: z.string().or( z.date() ).transform( arg => new Date( arg ) ),
      title: z.string(),
      urlParam: z.string().optional(),
      category: z.enum(categories),
      tags: z.array(z.string()).optional(),
      share: z.object({
        image: z.string().optional(),
        title: z.string(),
        description: z.string()
      }).strict(),
    })
  })
}
