import type { ComponentType } from "react";

type FrontMatter = {
  date: string;
  description?: string;
  title: string;
};

type PostModule = {
  default: ComponentType;
  frontmatter: FrontMatter;
};

type ProcessedPost = PostModule & {
  href: string;
  key: string;
};

export function getPosts(): ProcessedPost[] {
  const posts = import.meta.glob<PostModule>("./posts/*.mdx", { eager: true });
  const postsArray = Object.entries(posts).map(
    ([key, value]): ProcessedPost => ({
      ...value,
      href: "", // Initialize with an empty string
      key
    })
  );

  // Sort posts by date string in descending order (newest first)
  postsArray.sort((a, b) => {
    const dateA = a.frontmatter?.date || "";
    const dateB = b.frontmatter?.date || "";
    return dateB > dateA ? 1 : -1;
  });

  // Add href property by converting file path to URL path
  for (const post of postsArray) {
    post.href = post.key
      .replace("./posts/", "/blog/")
      .replace(".mdx", "")
      .replaceAll(".", "/");
  }

  return postsArray;
}
