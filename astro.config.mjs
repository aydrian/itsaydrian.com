// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
const isPreviewBuild = !!process.env.GITHUB_HEAD_REF && process.env.GITHUB_HEAD_REF !== 'main';

export default defineConfig({
  site: 'https://itsaydrian.com',
  trailingSlash: 'always',
  adapter: cloudflare(),
  integrations: [sitemap(), mdx()],
  vite: {
    define: {
      __PREVIEW_BUILD__: isPreviewBuild ? 'true' : 'false',
    },
  },
});
