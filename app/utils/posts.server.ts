import type { PostEntry } from "lib/vite-plugin-blog-manifest/types";

import manifest from "virtual:blog-manifest";

export function getPostByPathname(pathname: string): null | PostEntry {
  return (
    manifest.posts.find((post: PostEntry) => post.pathname === pathname) ?? null
  );
}

export function getPostBySlug(slug: string): null | PostEntry {
  return manifest.posts.find((post: PostEntry) => post.slug === slug) ?? null;
}

export function getPosts(): PostEntry[] {
  return manifest.posts;
}
