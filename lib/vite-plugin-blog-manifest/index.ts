import type { Plugin } from "vite";

import fs from "fs";
import matter from "gray-matter";
import path from "path";

import type { BlogManifest, PostEntry, PostMetadata } from "./types";

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
  const manifest: BlogManifest = { posts };

  return `export default ${JSON.stringify(manifest)}`;
}

function parseMetadataFromMdx(content: string): null | PostMetadata {
  try {
    // Use gray-matter to extract frontmatter
    const { data } = matter(content);

    // Ensure required fields exist
    if (!data.title) {
      return null;
    }

    // Return typed metadata
    return {
      author: data.author || "Anonymous",
      category: data.category || "Uncategorized",
      date: data.date || new Date().toISOString(),
      description: data.description || "",
      isDraft: data.isDraft === true,
      tags: Array.isArray(data.tags) ? data.tags : [],
      title: data.title || ""
    } as PostMetadata;
  } catch (error) {
    console.warn("Failed to parse frontmatter:", error);
    return null;
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

          // Default metadata
          const defaultMetadata: PostMetadata = {
            author: "Anonymous",
            category: "Uncategorized",
            date: new Date().toISOString(),
            description: "",
            isDraft: false,
            tags: [],
            title: slug.replace(/-/g, " ")
          };

          try {
            // Read the file content and parse metadata
            const content = fs.readFileSync(fullPath, "utf-8");
            const parsedMetadata = parseMetadataFromMdx(content);

            const metadata = parsedMetadata
              ? { ...defaultMetadata, ...parsedMetadata }
              : defaultMetadata;

            // Check the isDraft property from metadata
            const isDraft = metadata.isDraft === true;

            // Skip drafts in production
            if (isDraft && isProduction) {
              console.log(`[posts-manifest] Skipping draft: ${slug}`);
              continue;
            }

            posts.push({
              filename: file.name,
              isDraft,
              metadata,
              pathname: `/blog/${slug}`,
              slug
            });
          } catch (error) {
            console.warn(`Failed to process ${file.name}:`, error);

            // Still add the post with default metadata if parsing fails
            posts.push({
              filename: file.name,
              isDraft: false,
              metadata: defaultMetadata,
              pathname: `/blog/${slug}`,
              slug
            });
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
