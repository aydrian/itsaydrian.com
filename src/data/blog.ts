export interface BlogVideo {
  /** YouTube video ID */
  id: string;
  title: string;
  description?: string;
  /**
   * When the video was published, ISO 8601. Best as a full datetime with an
   * offset (e.g. "2026-11-11T09:30:00-08:00", from the YouTube watch page).
   * A bare date ("2026-11-11") still works: toSchemaDateTime() turns it into
   * midnight UTC so Google's VideoObject check gets a time and a timezone.
   */
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
  /** Estimated minutes to read, from the MDX source. */
  readingTime: number;
  /** h2 headings, for the table of contents. */
  headings: { depth: number; slug: string; text: string }[];
  draft?: boolean;
  linksPage?: { label?: string; description?: string } | boolean;
  cta?: boolean;
}

/**
 * Format a frontmatter date for schema.org DateTime fields such as
 * VideoObject.uploadDate. Google flags a bare date there ("Invalid datetime
 * value" and "missing a timezone"), so a date-only value becomes midnight UTC.
 * Values that already carry a time are passed through unchanged. YAML turns an
 * unquoted date into a Date object, so that case is handled too.
 */
export function toSchemaDateTime(value: string | Date): string {
  if (value instanceof Date) return value.toISOString().replace(/\.\d{3}Z$/, 'Z');
  const trimmed = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return `${trimmed}T00:00:00Z`;
  return trimmed;
}

export interface GetAllPostsOptions {
  includeDrafts?: boolean;
}

export type BlogCategory =
  | "Travel"
  | "Japan"
  | "Apps"
  | "Pet care"
  | "Life in NYC";

/** One-line intro for each category page. */
export const categoryDescriptions: Record<BlogCategory, string> = {
  Travel: "Trip guides and day trips: how to get there, what it costs, and what I'd do again.",
  Japan: "Small towns, odd detours and the bigger sights, with the trains and pins to find them.",
  Apps: "Notes from the apps I build and the tools I use to build them.",
  "Pet care": "Atticus the corgi, the gear he likes, and what I've learned looking after other people's dogs.",
  "Life in NYC": "Neighborhood finds and seasonal outings around New York City.",
};

export const categories: BlogCategory[] = [
  "Travel",
  "Japan",
  "Apps",
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
    cta?: boolean;
    [key: string]: any;
  };
  Content: any;
  getHeadings?: () => { depth: number; slug: string; text: string }[];
  file: string;
}

let mdxCache: BlogPost[] | null = null;

const WORDS_PER_MINUTE = 230;

/**
 * Rough reading time from MDX source: drops frontmatter, import/export lines,
 * JSX tags and markdown syntax, then counts words. Content rendered by
 * components (gear lists, maps) isn't counted, which is fine for an estimate.
 */
export function estimateReadingTime(raw: string): number {
  const text = raw
    .replace(/^---\n[\s\S]*?\n---/, '')
    .replace(/^(import|export)\s.*$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|-]/g, ' ');
  const words = text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** URL-safe slug for a category: "Pet care" -> "pet-care", "Life in NYC" -> "life-in-nyc". */
export function categorySlug(category: BlogCategory): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function categoryFromSlug(slug: string): BlogCategory | undefined {
  return categories.find((c) => categorySlug(c) === slug);
}

export function categoryUrl(category: BlogCategory): string {
  return `/blog/category/${categorySlug(category)}/`;
}

/**
 * Card image for a post. Cover images ship with -680.webp and -1200.webp
 * siblings (see the post image convention); fall back to the original file
 * when a variant is missing.
 */
export function coverVariants(post: BlogPost): { src: string; srcset?: string } | undefined {
  const cover = post.coverImage;
  if (!cover) return undefined;
  const base = cover.replace(/\.(jpe?g|png|webp)$/i, '');
  const has = (path: string) => publicFiles.has(path);
  const small = `${base}-680.webp`;
  const large = `${base}-1200.webp`;
  if (has(small) && has(large)) return { src: small, srcset: `${small} 680w, ${large} 1200w` };
  if (has(small)) return { src: small };
  return { src: cover };
}

// Paths of files under public/images, so coverVariants() can check for webp
// variants without touching the filesystem at runtime.
const publicFiles = new Set(
  Object.keys(import.meta.glob('/public/images/**/*.webp', { query: '?url', eager: false })).map((p) =>
    p.replace(/^\/public/, '')
  )
);

const rawPosts = import.meta.glob<string>('../posts/*.mdx', { query: '?raw', import: 'default', eager: true });

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
      readingTime: estimateReadingTime(rawPosts[file] ?? ''),
      headings: (mod.getHeadings?.() ?? []).filter((h) => h.depth === 2),
      draft: !!fm.draft,
      linksPage: fm.linksPage,
      cta: fm.cta,
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

/**
 * Up to `limit` other posts to read next: same category first (newest first),
 * then the newest posts from other categories.
 */
export async function getRelatedPosts(
  post: BlogPost,
  limit = 3,
  options?: GetAllPostsOptions
): Promise<BlogPost[]> {
  const others = (await getAllPosts(options)).filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, limit);
}
