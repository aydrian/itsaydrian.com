import { Outlet } from "react-router";

import { getPostByPathname } from "~/utils/posts.server";

import type { Route } from "./+types/_layout";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  const post = getPostByPathname(url.pathname);

  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }

  return post;
}

export default function PostLayout({ loaderData }: Route.ComponentProps) {
  const { metadata } = loaderData;
  console.log("metadata:", metadata);

  return (
    <div>
      <h1 className="text-2xl">You are in the Layout</h1>
      <article>
        <h1>{metadata.title}</h1>
        <div className="handler">
          <p>
            By {metadata.author} •{" "}
            {new Date(metadata.date).toLocaleDateString()}
          </p>
          <p>Category: {metadata.category}</p>
          <p>Tags: {metadata.tags?.join(", ")}</p>
        </div>
        <Outlet />
      </article>
    </div>
  );
}
