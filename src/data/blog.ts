export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  fullContent?: string;
  Content?: any;
  date: string;
  category: BlogCategory;
  coverImage?: string;
  ogImage?: string;
}

export type BlogCategory =
  | "Travel"
  | "Japan"
  | "Apps"
  | "Pet care"
  | "Life in NYC";

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
    category?: string;
    slug?: string;
    draft?: boolean;
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

export async function getMdxPosts(): Promise<BlogPost[]> {
  if (mdxCache) return mdxCache;

  const modules = import.meta.glob<MdxModule>('../posts/*.mdx', { eager: true });
  const mdxPosts: BlogPost[] = [];

  for (const [file, mod] of Object.entries(modules)) {
    const fm = mod.frontmatter || {};
    if (fm.draft) continue;

    const category = fm.category || 'Life in NYC';
    if (!isValidCategory(category)) {
      console.warn(`Skipping MDX post ${file}: unknown category "${category}"`);
      continue;
    }

    mdxPosts.push({
      id: `mdx-${mdxSlugFromFile(file, fm.slug)}`,
      slug: mdxSlugFromFile(file, fm.slug),
      title: fm.title || mdxSlugFromFile(file, fm.slug),
      excerpt: fm.excerpt || '',
      Content: mod.Content,
      date: fm.date || new Date().toISOString().split('T')[0],
      category,
    });
  }

  mdxCache = mdxPosts;
  return mdxPosts;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const mdxPosts = await getMdxPosts();
  return [...mdxPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const mdxPosts = await getMdxPosts();
  return mdxPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): Promise<BlogPost[]> {
  return getAllPosts().then((all) => all.filter((post) => post.category === category));
}

export async function getAllCategoriesAsync(): Promise<BlogCategory[]> {
  const all = await getAllPosts();
  const usedCategories = new Set(all.map((post) => post.category));
  return categories.filter((category) => usedCategories.has(category));
}
