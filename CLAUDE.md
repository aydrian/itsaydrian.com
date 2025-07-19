# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development server**: `bun run dev` - Starts React Router dev server (not Wrangler)
**Cloudflare Workers dev**: `bun run start` - Uses Wrangler for Cloudflare runtime emulation  
**Build**: `bun run build` - Production build using React Router
**Deploy**: `bun run deploy` - Builds and deploys to Cloudflare Workers
**Type checking**: `bun run typecheck` - Runs Cloudflare typegen + TypeScript compilation
**Linting**: `bun run lint` and `bun run lint:fix`
**Full validation**: `bun run check` - TypeScript + build + dry-run deploy

**Icon management**: `bun run build:icons` - Regenerates SVG sprite and TypeScript types from `svg-icons/`

## Architecture Overview

This is a **React Router v7** (formerly Remix) application deployed on **Cloudflare Workers** using the Hono.js runtime. The project uses **TailwindCSS v4** with the new `@import 'tailwindcss'` syntax and includes a comprehensive blog system.

### Key Technical Stack
- **Runtime**: Cloudflare Workers with Hono.js (`workers/app.ts`)
- **Framework**: React Router v7 with file-based routing
- **Styling**: TailwindCSS v4 with CSS variables and custom variants
- **Components**: Shadcn/ui with class-variance-authority
- **Type Safety**: Full TypeScript coverage with Cloudflare Workers types
- **Package Manager**: Bun (use `bun` instead of `npm`)

### Routing System
Routes are configured in `app/routes.ts` combining:
1. **Blog routes**: `/blog/*` mapped to MDX files in `app/posts/` wrapped by `postRoot.tsx`
2. **App routes**: File-based routing from `app/routes/` directory

Blog posts use naming convention: `YYYY.MM.DD.slug.mdx` with frontmatter support.

### Import Patterns
- Path alias: `~/*` maps to `./app/*`
- Components: `~/components/ui/` (Shadcn/ui components)
- Utils: `~/utils/misc` (includes `cn` utility for class merging)

### Styling Architecture
- **TailwindCSS v4** configured in `app/styles/tailwind.css`
- Uses CSS variables for theming with dark mode support
- Custom variant: `@custom-variant dark (&:is(.dark *))`
- Shadcn/ui color system with HSL values
- Component variants use `class-variance-authority`

### Icon System
- SVG sprite system with automatic generation
- Icons stored in `svg-icons/` directory  
- TypeScript types auto-generated for icon names
- Use `<Icon name="..." />` component with full type safety

## Development Patterns

### Component Development
- Use Shadcn/ui components when possible: `Button`, `Card`, `Badge`, etc.
- Always use `asChild` prop for Button components wrapping links
- Prefer TailwindCSS classes over CSS-in-JS
- Use `cn()` utility for conditional class merging

### Blog Content
- Create MDX files in `app/posts/` with frontmatter
- Filename format: `YYYY.MM.DD.slug.mdx`
- Routes automatically generated as `/blog/slug`

### Type Safety
- Run `bun run cf-typegen` after changing Cloudflare Workers configuration
- Icons automatically typed after running `bun run build:icons`
- Custom types defined in `worker-configuration.d.ts`

## Configuration Files

- **`wrangler.jsonc`**: Cloudflare Workers configuration with observability enabled
- **`components.json`**: Shadcn/ui configuration using "new-york" style
- **`vite.config.ts`**: Build configuration with Cloudflare plugin and MDX support
- **`sly.json`**: Icon library management (Simple Icons, Lucide, Heroicons)

## Important Notes

- This project migrated from Remix to React Router v7 - some docs may still reference Remix
- Use Bun as the package manager, not npm
- Cloudflare Workers runtime requires Node.js compatibility flags
- Development server runs on http://127.0.0.1:8788 when using Wrangler
- TailwindCSS v4 uses new syntax - no separate config file needed