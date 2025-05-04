import { type RouteConfig, route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default [
  // Render /post pages from /app/blog with the post container
  route("blog", "./postRoot.tsx", [
    ...(await flatRoutes({ rootDirectory: "./posts" }))
  ]),
  // Everything else from the /app/routes directory
  ...(await flatRoutes())
] satisfies RouteConfig;
