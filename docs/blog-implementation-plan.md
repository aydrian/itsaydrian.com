# Blog implementation plan

## Repository findings

- **Framework:** Astro 6.3.7 with the `@astrojs/cloudflare` adapter. Routes are file-based under `src/pages/`.
- **Config:** `astro.config.mjs` sets `trailingSlash: 'always'`, so blog URLs must be `/blog/` and `/blog/[slug]/`.
- **Styling:** Plain CSS in `src/styles/global.css`. Design tokens are CSS custom properties (`--bg`, `--ink`, `--font-display`, `--space-*`, `--r-lg`, etc.). No Tailwind or utility framework is present.
- **Layout:** `src/layouts/Layout.astro` provides the site shell (sticky header, theme toggle, footer, OG/Twitter meta). It is the only layout.
- **Navigation:** Hardcoded in `Layout.astro`. Links use `Astro.url.pathname` with `aria-current="page"` for active states.
- **Components:** Only `SubscriberForm.astro` and `TravelChatWidget.astro` exist. Reusable UI primitives live as CSS classes in `global.css` (`.card`, `.pill`, `.section`, `.container`, `.btn`, `.h1`/`.h2`/`.h3`, `.body`, `.body-sm`, `.eyebrow`).
- **Data patterns:** No Astro content collections and no CMS integration. Static JS/TS modules are the natural fit for mock data.
- **Existing routes:** `/`, `/travel/`, `/apps/`, `/apps/tiny-maintenance/`, `/atticus-list/`, `/404`.

## Proposed file structure

```
src/
├── data/
│   └── blog.ts          # Post type, mock posts array, categories array, helpers
├── components/
│   ├── BlogPostCard.astro
│   └── CategoryFilter.astro
├── pages/
│   └── blog/
│       ├── index.astro  # /blog/ — list + category filter
│       └── [slug].astro # /blog/:slug/ — single post detail
└── layouts/
    └── Layout.astro     # add Blog nav link
```

## Data model

```ts
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  fullContent: string; // HTML string rendered with set:html
  date: string;        // ISO date, e.g. "2026-06-01"
  category: string;    // must be one of BlogCategory
  coverImage?: string;
  ogImage?: string;
}

export const categories: string[] = [
  "Travel",
  "Japan",
  "Apps",
  "Pet care",
  "Life in NYC",
];
```

### Helpers to export

- `getAllPosts()` — posts sorted by `date` descending.
- `getPostBySlug(slug)` — returns `BlogPost | undefined`.
- `getPostsByCategory(category)` — filtered, sorted.
- `getAllCategories()` — deduplicated list from posts plus the canonical `categories` array.

## Mock data approach

Keep all data in `src/data/blog.ts`. Start with 4 mock posts distributed across at least 3 categories so the filter UI is testable. Content can be realistic placeholder copy. Do not add a CMS, API, or server fetch.

## Page plan

### `/blog/` (index)

- Use `Layout` with `title="Blog"` and a short meta description.
- Hero section with `.display` heading and `.lede` subtitle.
- `CategoryFilter` component: a row of pill buttons. "All" is the default. Selecting a category updates the visible list. Implementation can be server-rendered with query-param filtering (e.g. `?category=Japan`) using `Astro.url.searchParams`, or client-side JS hiding cards. Given the small dataset, server-side filtering with query params is simpler and keeps the page functional without JS.
- Grid of `BlogPostCard` components. Each card links to `/blog/{slug}/` and shows title, date, category pill, and excerpt.
- Reuse existing classes: `.section`, `.container`, `.card`, `.pill`, `.btn-link`, `.body-sm`, `.h3`.

### `/blog/[slug]/` (detail)

- Dynamic route: `src/pages/blog/[slug].astro`.
- In the frontmatter, read `Astro.params.slug`, call `getPostBySlug`, and return `Astro.redirect('/404/')` (or render a 404-style message inline) if missing.
- Use `Layout` with post title, description (excerpt), and optional `ogImage`.
- Render `fullContent` with `set:html={post.fullContent}` inside a prose wrapper (e.g. `.blog-prose`).
- Show date and category pill above the title.
- Add a "Back to blog" `.btn-link` at the bottom.
- Match typography: title uses `.h1` or `.display`, body uses existing type scale.

## Styling approach

- Prefer existing tokens/classes. Add blog-specific layout rules in page-level `<style>` blocks (as done on `/travel/` and `/apps/`).
- If a `.blog-prose` utility is needed, add it to `src/styles/global.css` rather than scattering it across pages. Define it after the existing typography section.
- Maintain the existing 4pt spacing scale, `var(--container)` max-width, and `var(--r-lg)` radius conventions.

## Navigation integration

In `src/layouts/Layout.astro`, add a Blog link inside `.nav-links` between "Apps" and "Atticus's list":

```astro
<a href="/blog/" aria-current={Astro.url.pathname.startsWith('/blog/') ? 'page' : undefined}>Blog</a>
```

This matches the active-state pattern used for `/apps/`.

## Component reuse

- `BlogPostCard.astro` — wraps the `.card` class, accepts a `BlogPost` prop, renders media (if `coverImage`), category pill, title, excerpt, date, and a read-more link.
- `CategoryFilter.astro` — accepts `categories`, `currentCategory`, and builds links with `?category=` query params. Uses `.pill` classes plus a selected state.

## Build / verification

- Run `bun dev` and verify `/blog/` and `/blog/<slug>/` render.
- Verify category filtering.
- Verify the Blog nav link shows active state on both blog pages.
- Run `bun run build` before considering the implementation done.

## Out of scope

- CMS, markdown/MDX authoring, RSS feed, pagination, search, comments, scheduled publishing, deployment, or real posts. This implementation is for the blog shell and mock data only.
