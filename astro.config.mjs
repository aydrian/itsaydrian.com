// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { readdirSync, readFileSync } from 'node:fs';

// Map each blog post URL to its last-modified date (frontmatter `updated`, else `date`)
// so the sitemap can include <lastmod>.
function blogLastmod() {
  const dir = new URL('./src/posts/', import.meta.url);
  const map = new Map();
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.mdx'))) {
    const fm = readFileSync(new URL(file, dir), 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const field = (/** @type {string} */ name) => fm.match(new RegExp(`^${name}:\\s*["']?([^"'\\n]+)["']?\\s*$`, 'm'))?.[1]?.trim();
    const slug = field('slug') ?? file.replace(/\.mdx$/, '');
    const when = field('updated') ?? field('date');
    if (when) map.set(`/blog/${slug}/`, new Date(when).toISOString());
  }
  return map;
}
const lastmodByPath = blogLastmod();

// https://astro.build/config
const isPreviewBuild = !!process.env.GITHUB_HEAD_REF && process.env.GITHUB_HEAD_REF !== 'main';

export default defineConfig({
  site: 'https://itsaydrian.com',
  trailingSlash: 'always',
  adapter: cloudflare(),
  integrations: [
    sitemap({
      serialize(item) {
        const lastmod = lastmodByPath.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
    mdx(),
  ],
  vite: {
    define: {
      __PREVIEW_BUILD__: isPreviewBuild ? 'true' : 'false',
    },
  },
});
