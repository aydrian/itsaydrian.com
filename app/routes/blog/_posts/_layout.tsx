import { Link, Outlet } from "react-router";

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

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        className="text-foreground/80 hover:text-foreground mb-4 inline-block transition-colors"
        to="/blog"
      >
        &larr; Back to Blog
      </Link>
      {metadata.isDraft && (
        <div className="mb-4 rounded-lg border border-amber-400/50 bg-amber-400/10 p-4 text-center text-amber-300">
          <p className="font-bold">This is a draft post.</p>
        </div>
      )}
      <div className="bg-card/80 rounded-xl p-8 shadow-lg backdrop-blur-sm md:p-12">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {/* Post Header */}
          {/* Post Header */}
          <div className="mb-8 border-b pb-8">
            <h1 className="mb-2 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {metadata.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {metadata.description}
            </p>
            <p className="text-muted-foreground mt-4 text-sm">
              By {metadata.author} on{" "}
              {new Date(metadata.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </p>
          </div>
          <Outlet />
        </article>
      </div>
    </div>
  );
}
