import type { Route } from "./+types/blog._index";
import { Link } from "react-router";
import { getPosts } from "../posts.js";

export async function loader() {
  const posts = getPosts();
  console.log("Posts fetched:", posts);
  return { posts };
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1 className="text-2xl">Blog</h1>

      {loaderData.posts.length === 0 ? (
        <p className="mt-4 text-gray-600">No blog posts found.</p>
      ) : (
        <ul className="space-y-6">
          {loaderData.posts.map((post) => (
            <li key={post.key} className="border-b border-gray-200 pb-4 last:border-b-0">
              <Link 
                to={post.href}
                className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition duration-300"
              >
                {post.frontmatter.title}
              </Link>
              <p className="mt-2 text-sm text-gray-600">
                {post.frontmatter.date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}