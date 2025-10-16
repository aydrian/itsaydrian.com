import type { Config } from "@react-router/dev/config";

export default {
  future: {
		unstable_optimizeDeps: true,
    unstable_splitRouteModules: true,
    unstable_viteEnvironmentApi: true,
    v8_middleware: true,
  },
  prerender: ["/blog"],
  ssr: true
} satisfies Config;
