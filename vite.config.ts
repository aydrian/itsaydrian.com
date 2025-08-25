import { cloudflare } from "@cloudflare/vite-plugin";
import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";
import devtoolsJson from 'vite-plugin-devtools-json';
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tailwindcss(),
		mdx({
			remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
		}),
		reactRouter(),
		iconsSpritesheet({
			inputDir: "svg-icons",
			outputDir: "app/components/icons",
			withTypes: true
		}),
		devtoolsJson(),
		tsconfigPaths(),
	],
});
