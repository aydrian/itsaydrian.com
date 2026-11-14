export interface BlogVideo {
  /** YouTube video ID */
  id: string;
  title: string;
  description?: string;
  /** ISO 8601 date the video was published */
  uploadDate: string;
  /** ISO 8601 duration, e.g. PT8M29S */
  duration?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  /** Shorter title for <title> and social tags; falls back to title. */
  seoTitle?: string;
  excerpt: string;
  /** Meta description (~155 chars); falls back to excerpt. */
  seoDescription?: string;
  fullContent?: string;
  Content?: any;
  date: string;
  updated?: string;
  category: BlogCategory;
  coverImage?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  /** Extra images for structured data, e.g. other aspect ratios. */
  schemaImages?: string[];
  video?: BlogVideo;
  draft?: boolean;
  linksPage?: { label?: string; description?: string } | boolean;
}

export interface GetAllPostsOptions {
  includeDrafts?: boolean;
}

export type BlogCategory =
  | "Travel"
  | "Japan"
  | "Apps"
  | "Engineering"
  | "Pet care"
  | "Life in NYC";

export const categories: BlogCategory[] = [
  "Travel",
  "Japan",
  "Apps",
  "Engineering",
  "Pet care",
  "Life in NYC",
];

// MDX posts live in src/posts/*.mdx.
// Frontmatter fields: title, excerpt, date, category, slug
interface MdxModule {
  frontmatter: {
    title?: string;
    excerpt?: string;
    date?: string;
    updated?: string;
    category?: string;
    slug?: string;
    draft?: boolean;
    linksPage?: { label?: string; description?: string } | boolean;
    [key: string]: any;
  };
  Content: any;
  file: string;
}

let mdxCache: BlogPost[] | null = null;

function isValidCategory(category: string): category is BlogCategory {
  return categories.includes(category as BlogCategory);
}

function mdxSlugFromFile(file: string, frontmatterSlug?: string): string {
  if (frontmatterSlug) return frontmatterSlug;
  const basename = file.split('/').pop()?.replace(/\.mdx$/, '') ?? '';
  return basename;
}

async function loadMdxPosts(): Promise<BlogPost[]> {
  if (mdxCache) return mdxCache;

  const modules = import.meta.glob<MdxModule>('../posts/*.mdx', { eager: true });
  const mdxPosts: BlogPost[] = [];

  for (const [file, mod] of Object.entries(modules)) {
    const fm = mod.frontmatter || {};
    const category = fm.category || 'Life in NYC';
    if (!isValidCategory(category)) {
      console.warn(`Skipping MDX post ${file}: unknown category "${category}"`);
      continue;
    }

    mdxPosts.push({
      id: `mdx-${mdxSlugFromFile(file, fm.slug)}`,
      slug: mdxSlugFromFile(file, fm.slug),
      title: fm.title || mdxSlugFromFile(file, fm.slug),
      seoTitle: fm.seoTitle,
      excerpt: fm.excerpt || '',
      seoDescription: fm.seoDescription,
      Content: mod.Content,
      date: fm.date || new Date().toISOString().split('T')[0],
      updated: fm.updated,
      category,
      coverImage: fm.coverImage,
      ogImage: fm.ogImage,
      ogImageAlt: fm.ogImageAlt,
      ogImageWidth: fm.ogImageWidth,
      ogImageHeight: fm.ogImageHeight,
      schemaImages: fm.schemaImages,
      video: fm.video,
      draft: !!fm.draft,
      linksPage: fm.linksPage,
    });
  }

  mdxCache = mdxPosts;
  return mdxPosts;
}

export async function getMdxPosts(): Promise<BlogPost[]> {
  const all = await loadMdxPosts();
  return all.filter((post) => !post.draft);
}

export async function getAllPosts(options?: GetAllPostsOptions): Promise<BlogPost[]> {
  const includeDrafts = options?.includeDrafts ?? false;
  const posts = includeDrafts ? await loadMdxPosts() : await getMdxPosts();
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getDraftPosts(): Promise<BlogPost[]> {
  const all = await loadMdxPosts();
  return all
    .filter((post) => post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(
  slug: string,
  options?: GetAllPostsOptions
): Promise<BlogPost | undefined> {
  const includeDrafts = options?.includeDrafts ?? false;
  const posts = includeDrafts ? await loadMdxPosts() : await getMdxPosts();
  return posts.find((post) => post.slug === slug);
}

export function getPostsByCategory(
  category: BlogCategory,
  options?: GetAllPostsOptions
): Promise<BlogPost[]> {
  return getAllPosts(options).then((all) => all.filter((post) => post.category === category));
}

export async function getAllCategoriesAsync(options?: GetAllPostsOptions): Promise<BlogCategory[]> {
  const all = await getAllPosts(options);
  const usedCategories = new Set(all.map((post) => post.category));
  return categories.filter((category) => usedCategories.has(category));
}

export async function getLinksPagePosts(): Promise<BlogPost[]> {
  const all = await getMdxPosts();
  return all
    .filter((post) => !!post.linksPage)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
