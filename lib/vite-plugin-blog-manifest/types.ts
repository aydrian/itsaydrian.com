import { z } from "zod";

export const PostMetadataSchema = z.object({
  author: z.string().default("Anonymous"),
  category: z.string().default("Uncategorized"),
  date: z.coerce.date().default(() => new Date()),
  description: z.string().default(""),
  heroImage: z.string().optional(),
  isDraft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  title: z.string({ error: "Title is required for a blog post." })
});

export const PostEntrySchema = z.object({
  filename: z.string(),
  isDraft: z.boolean(),
  metadata: PostMetadataSchema,
  pathname: z.string(),
  slug: z.string()
});

export const BlogManifestSchema = z.object({
  posts: z.array(PostEntrySchema)
});

export type BlogManifest = z.infer<typeof BlogManifestSchema>;
export type PostEntry = z.infer<typeof PostEntrySchema>;
export type PostMetadata = z.infer<typeof PostMetadataSchema>;
