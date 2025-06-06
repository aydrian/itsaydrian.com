import type { Config } from "@react-router/dev/config";

export default {
  prerender: ["/blog"],
  ssr: true,
  future: {
    unstable_viteEnvironmentApi: true
  }
} satisfies Config;
