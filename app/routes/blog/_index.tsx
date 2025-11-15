import { Link } from "react-router";

import { getPosts } from "~/utils/posts.server";

import type { Route } from "./+types/_index";

export default function Blog({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1 className="text-2xl">Blog</h1>

      {loaderData.posts.length === 0 ? (
        <p className="mt-4 text-gray-600">No blog posts found.</p>
      ) : (
        <ul className="space-y-6">
          {loaderData.posts.map((post) => (
            <li
              className="border-b border-gray-200 pb-4 last:border-b-0"
              key={post.slug}
            >
              <Link
                className="text-lg font-semibold text-blue-600 transition duration-300 hover:text-blue-800"
                to={post.pathname}
              >
                {post.metadata.title}
              </Link>
              <p className="mt-2 text-sm text-gray-600">
                {new Date(post.metadata.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export async function loader() {
  const posts = await getPosts();
  console.log("Posts fetched:", posts);
  return { posts };
}
