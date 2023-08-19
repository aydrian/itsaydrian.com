import { flatRoutes } from "remix-flat-routes";

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  devServerBroadcastDelay: 1000,
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true
  },
  ignoredRouteFiles: ["**/.*"],
  postcss: true,
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes);
  },
  server: "./server.ts",
  serverBuildPath: "functions/[[path]].js",
  serverConditions: ["worker"],
  serverDependenciesToBundle: "all",
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  serverModuleFormat: "esm",
  serverNodeBuiltinsPolyfill: {
    modules: {},
  },
  serverPlatform: "neutral",
  tailwind: true
};
