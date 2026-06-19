# ItsAydrian.com — Claude Code Context

## Project Overview
Personal site for ItsAydrian LLC. Astro 6 static site with Cloudflare Workers adapter. Deployed to Cloudflare via GitHub Actions.

## Tech Stack
- Astro 6.4.8 with `@astrojs/cloudflare`, `@astrojs/mdx`, `@astrojs/sitemap`
- TypeScript (ES modules, `type: "module"`)
- Bun for package management and scripts
- Wrangler for Cloudflare Workers types/deploy
- Cloudflare Pages/Workers deployment via GitHub Actions

## Commands
- `bun install` — install dependencies
- `bun dev` — start dev server
- `bun run build` — production build
- `bun run preview` — build + preview
- `bun run deploy` — build + wrangler deploy (manual)

## Project Structure
- `src/layouts/Layout.astro` — base layout with meta, nav, footer, theme
- `src/pages/**/*.astro` — routes (file-based routing)
- `src/components/**/*.astro` — reusable components
- `src/styles/global.css` — design tokens and global styles
- `src/scripts/theme.ts` — client-side theme toggle
- `src/data/blog.ts` — blog post loading helpers
- `src/posts/*.mdx` — MDX blog posts
- `public/` — static assets
- `astro.config.mjs` — Astro config
- `wrangler.jsonc` — Cloudflare config

## Key Conventions

### Routing
- `trailingSlash: 'always'` in Astro config
- All internal links end with `/` (e.g., `/travel/`, `/blog/`)
- `aria-current="page"` set in nav for active route

### Design System (from `src/styles/global.css`)
- CSS custom properties for colors, type, spacing
- Colors: `--hydro`, `--angel-feather`, `--scoville-high`, `--english-breakfast`, `--crowberry-blue`
- Surfaces: `--bg`, `--bg-soft`, `--bg-card`
- Ink: `--ink`, `--ink-soft`, `--ink-faint`
- Accent: `--accent` (crowberry blue), `--accent-hot` (scoville)
- Fonts: `--font-display` (Instrument Serif), `--font-body` (Inter), `--font-jp` (Noto Sans JP)
- Type scale: `--fs-12` through `--fs-display`
- Spacing: `--space-1` through `--space-32` (4pt rhythm)
- Radii: `--r-sm`, `--r-md`, `--r-lg`, `--r-xl`, `--r-pill`
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-hero`
- Motion: `--ease-out-quart`, `--ease-out-expo`, `--dur-fast`, `--dur`, `--dur-slow`

### Layout Primitives
- `.container` — max-width 1240px, centered
- `.container-narrow` — max-width 880px
- `.measure` — max-width 60ch
- `.section` — vertical section padding

### Typography Classes
- `.display` — large display serif
- `.h1`, `.h2`, `.h3`, `.h4` — heading hierarchy
- `.eyebrow` — small uppercase label
- `.lede` — large intro paragraph
- `.body`, `.body-sm` — body text
- `.jp` — Japanese text styling

### Buttons
- `.btn`, `.btn-primary`, `.btn-hot`, `.btn-ghost`, `.btn-link`
- Use `.btn-lg` for larger CTAs

### Cards
- `.card` — standard card (NOT clickable wrapper)
- `.card-media`, `.card-media-portrait`, `.card-media-square`
- `.card-body`, `.card-footer`

### Animation
- Scroll-triggered animations use `.rise` class
- Staggered elements use `data-delay="1"`, `data-delay="2"`, etc.
- When adding new animated sections, ensure ALL elements that should animate have `.rise` and staggered delays are consistent

### Theme
- Dark mode via `.dark` class on `<html>`
- `data-theme-preference` stored in localStorage ("light", "dark", "system")
- Theme toggle in header

### Meta / SEO
- Layout handles OG/Twitter/meta tags
- Pass `title`, `description`, `ogImage`, etc. to Layout
- Default OG image: `/assets/aydrian-tokyo-hero-1600.jpg`
- Canonical URL via `Astro.url.href`

### Blog
- MDX posts in `src/posts/*.mdx`
- Frontmatter: `title`, `excerpt`, `date`, `category`, `slug` (optional), `draft` (optional)
- Categories: Travel, Japan, Apps, Pet care, Life in NYC
- Drafts excluded from production; pass `includeDrafts: true` to see drafts

### Images
- Hero/preload images passed via `preloadImage` prop to Layout
- Most content images use `loading="lazy"` except hero
- Provide descriptive alt text

### Environment
- `PUBLIC_GA_MEASUREMENT_ID` — Google Analytics measurement ID
- `GITHUB_HEAD_REF` used at build time to detect preview builds

## Workflow Rules
- Use Bun, not npm
- Always run `bun run build` after changes before declaring done
- Do not commit or push — Janine handles git/PR workflow
- Do not ask clarifying questions; use best judgment
- Prefer Astro native features over heavy client-side JS
- Keep accessibility in mind (alt text, aria labels, semantic HTML)
