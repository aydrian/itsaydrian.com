import { cloudflare } from "@cloudflare/vite-plugin";
import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
// import { reactRouterDevTools } from "react-router-devtools";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet";
import tsconfigPaths from "vite-tsconfig-paths";

import blogManifestPlugin from "./lib/vite-plugin-blog-manifest";

export default defineConfig({
  plugins: [
    // reactRouterDevTools(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }),
    tailwindcss(),
    reactRouter(),
    iconsSpritesheet({
      inputDir: "svg-icons",
      outputDir: "app/components/icons",
      withTypes: true
    }),
    devtoolsJson(),
    blogManifestPlugin(),
    tsconfigPaths()
  ]
});
