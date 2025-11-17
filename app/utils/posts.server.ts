import type { PostEntry } from "lib/vite-plugin-blog-manifest/types";

import manifest from "virtual:blog-manifest";

export function getCategories(): string[] {
  const categories = manifest.posts.map((post) => post.metadata.category);
  // Use a Set to get unique categories, then sort them alphabetically
  return [...new Set(categories)].sort();
}

export function getPostByPathname(pathname: string): null | PostEntry {
  return (
    manifest.posts.find((post: PostEntry) => post.pathname === pathname) ?? null
  );
}

export function getPostBySlug(slug: string): null | PostEntry {
  return manifest.posts.find((post) => post.slug === slug) ?? null;
}

export function getPosts(): PostEntry[] {
  return manifest.posts;
}

export function getPostsByCategory(category: string): PostEntry[] {
  return manifest.posts.filter((post) => {
    return post.metadata.category.toLowerCase() === category.toLowerCase();
  });
}
