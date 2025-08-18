import { cloudflare } from "@cloudflare/vite-plugin";
import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
	plugins: [
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tailwindcss(),
		mdx({
			remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
		}),
		reactRouter(),
		iconsSpritesheet({
			withTypes: true,
			inputDir: "svg-icons",
			outputDir: "app/components/icons"
		}),
		devtoolsJson(),
		tsconfigPaths(),
	],
});
