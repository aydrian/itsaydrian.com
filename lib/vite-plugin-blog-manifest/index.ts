import type { Plugin } from "vite";

import fs from "fs";
import matter from "gray-matter";
import path from "path";

import {
  type BlogManifest,
  BlogManifestSchema,
  type PostEntry,
  PostMetadataSchema
} from "./types";

const VIRTUAL_MODULE_ID = "virtual:blog-manifest";
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`;

export default function blogManifest(
  postsDir: string = "./app/routes/blog/_posts"
): Plugin {
  const absolutePostsDir = path.resolve(postsDir);

  return {
    // Configure the dev server to watch the posts directory
    configureServer(server) {
      // Add the posts directory to Vite's file watcher
      server.watcher.add(absolutePostsDir);
      console.log(`[blog-manifest] Watching directory: ${absolutePostsDir}`);
    },

    // Handle hot updates when watched files change
    handleHotUpdate({ file, server }) {
      // Only handle changes to markdown files in posts directory
      if (!/\.mdx?$/.test(file) || !file.startsWith(absolutePostsDir)) {
        return;
      }

      const relativeFile = path.relative(absolutePostsDir, file);
      console.log(`[blog-manifest] Detected change: ${relativeFile}`);

      // Invalidate the virtual module so it regenerates
      const module = server.moduleGraph.getModuleById(
        RESOLVED_VIRTUAL_MODULE_ID
      );
      if (module) {
        server.moduleGraph.invalidateModule(module);
        console.log("[blog-manifest] Virtual module invalidated");
      }

      // Send a full reload message to the browser
      server.ws.send({
        type: "full-reload"
      });

      // Return empty array to indicate we've handled the update
      return [];
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return generateManifest(absolutePostsDir);
      }
    },

    name: "blog-manifest",

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    }
  };
}

function generateManifest(postsDir: string): string {
  const posts = scanPostsDirectory(postsDir);
  const manifest: BlogManifest = BlogManifestSchema.parse({ posts });

  return `export default ${JSON.stringify(manifest)}`;
}

function parseMetadataFromMdx(content: string, filename: string) {
  try {
    const { data } = matter(content);
    return PostMetadataSchema.parse(data);
  } catch (error) {
    console.warn(`[blog-manifest] Invalid frontmatter in ${filename}:`, error);
    return undefined;
  }
}

function scanPostsDirectory(dir: string): PostEntry[] {
  const posts: PostEntry[] = [];
  const isProduction = process.env.NODE_ENV === "production";

  function walkDir(currentDir: string, baseDir: string = dir) {
    try {
      const files = fs.readdirSync(currentDir, { withFileTypes: true });

      for (const file of files) {
        const fullPath = path.join(currentDir, file.name);

        if (file.isDirectory()) {
          walkDir(fullPath, baseDir);
        } else if (file.isFile() && /\.mdx?$/.test(file.name)) {
          // Only process .md and .mdx files
          const slug = file.name.replace(/\.mdx?$/, "");

          try {
            // Read the file content and parse metadata
            const content = fs.readFileSync(fullPath, "utf-8");
            const metadata = parseMetadataFromMdx(content, file.name);

            // If metadata is invalid or missing, we can't create a post entry.
            if (!metadata) {
              continue;
            }

            if (metadata.isDraft && isProduction) {
              console.log(`[posts-manifest] Skipping draft: ${slug}`);
              continue;
            }

            posts.push({
              filename: file.name,
              isDraft: metadata.isDraft,
              metadata,
              pathname: `/blog/${slug}`,
              slug
            });
          } catch (error) {
            console.warn(`Failed to process ${file.name}:`, error);
          }
        }
      }
    } catch (error) {
      console.error(`Failed to read directory ${currentDir}:`, error);
    }
  }

  walkDir(dir);

  // Sort by date, newest first
  posts.sort((a, b) => {
    return (
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );
  });

  return posts;
}
