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

export const posts: BlogPost[] = [
  {
    id: "1",
    slug: "first-trip-to-japan",
    title: "First Trip to Japan",
    excerpt:
      "Notes from two weeks in Tokyo, Kyoto, and Osaka — trains, convenience stores, and the art of not rushing.",
    fullContent: `<p>Japan had been on my list for years, but I kept telling myself I needed more time, more planning, more Japanese vocabulary. Eventually I booked the flights and figured the rest out along the way.</p>
<p>We started in Tokyo. The thing that surprised me most wasn't the neon or the crowds — it was how quiet the city could be. People move with purpose but not noise. Even the subway cars hush during rush hour.</p>
<p>Kyoto was slower. We walked the Philosopher's Path early in the morning before the tour buses arrived, and the bamboo grove in Arashiyama felt like stepping into a different season. Osaka replaced calm with appetite: takoyaki, okonomiyaki, and late-night walks along the Dotonbori canal.</p>
<p>My biggest travel takeaway: Japan rewards the small preparations. A pocket Wi-Fi, a Suica card, and a rough daily theme were enough. The rest was just showing up.</p>`,
    date: "2026-05-20",
    category: "Japan",
  },
  {
    id: "2",
    slug: "why-i-built-tiny-maintenance",
    title: "Why I Built Tiny Maintenance",
    excerpt:
      "A side project born from forgetting one too many home tasks and wanting something lighter than a full productivity suite.",
    fullContent: `<p>I've tried a lot of task apps. Most of them want to be my entire second brain. What I actually needed was a gentle list of recurring home maintenance chores with due dates that don't feel like punishment.</p>
<p>Tiny Maintenance started as a spreadsheet. Water the plants every Sunday. Replace the HVAC filter every three months. Descale the coffee maker when it starts looking sad. The spreadsheet worked until it didn't — too easy to ignore, too hard to update on my phone.</p>
<p>So I turned it into an app. The design principle was simple: one screen for what's due now, one screen for the full list, and a quick way to mark something done and reset its next due date.</p>
<p>It's not trying to compete with the big tools. It's just trying to keep my apartment from falling apart. So far, so good.</p>`,
    date: "2026-04-12",
    category: "Apps",
  },
  {
    id: "3",
    slug: "a-weekend-in-the-catskills",
    title: "A Weekend in the Catskills",
    excerpt:
      "Escaping the city for cold air, a wood stove, and a dog who finally stopped chewing the couch.",
    fullContent: `<p>We rented a cabin two hours north of the city with no real agenda. The goal was to not make plans, which is harder than it sounds when your default mode is optimizing every hour.</p>
<p>The first morning was foggy and silent. Atticus, usually suspicious of new places, claimed the rug in front of the wood stove and refused to move for three hours. I read half a book, made bad pour-over coffee, and watched the trees change color from the porch.</p>
<p>We did one hike to a waterfall, which was muddy and worth it. The rest of the time we cooked pasta, played cards, and tried to remember what boredom feels like. It feels good, it turns out.</p>
<p>Back in the city, I'm already plotting the next escape. Maybe with better coffee beans.</p>`,
    date: "2026-03-08",
    category: "Travel",
  },
  {
    id: "4",
    slug: "finding-rhythm-in-new-york",
    title: "Finding Rhythm in New York",
    excerpt:
      "Moving to the city as an adult means building routines that don't depend on square footage.",
    fullContent: `<p>New York doesn't give you a routine. It gives you options, noise, and a lot of stairs. After a few months of drift, I realized I had to build the rhythm myself instead of waiting for the city to provide one.</p>
<p>Mine starts with the same coffee shop most mornings. Not because the coffee is the best in the neighborhood, but because the barista remembers my order and the corner table has enough light to read. Small anchors matter.</p>
<p>Weekends are for long walks with no destination. I've started picking a subway line, riding it to the end, and walking back until I'm tired. It sounds aimless, but it's the closest thing I have to a reset button.</p>
<p>The city still overwhelms me sometimes. But now I have a few reliable seams in the noise where I can catch my breath.</p>`,
    date: "2026-01-30",
    category: "Life in NYC",
  },
];

export function getAllCategories(): BlogCategory[] {
  const usedCategories = new Set(posts.map((post) => post.category));
  return categories.filter((category) => usedCategories.has(category));
}

// MDX posts live in src/posts/*.mdx and are merged with the hardcoded posts.
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
  return [...posts, ...mdxPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const mdxPosts = await getMdxPosts();
  return (
    posts.find((post) => post.slug === slug) ||
    mdxPosts.find((post) => post.slug === slug)
  );
}

export function getPostsByCategory(category: BlogCategory): Promise<BlogPost[]> {
  return getAllPosts().then((all) => all.filter((post) => post.category === category));
}

export async function getAllCategoriesAsync(): Promise<BlogCategory[]> {
  const all = await getAllPosts();
  const usedCategories = new Set(all.map((post) => post.category));
  return categories.filter((category) => usedCategories.has(category));
}
