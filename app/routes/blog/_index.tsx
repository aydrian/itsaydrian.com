import { Link } from "react-router";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card";
import { getPosts } from "~/utils/posts.server";

import type { Route } from "./+types/_index";

export default function Blog({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1 className="text-foreground mb-6 text-3xl font-bold">Blog</h1>
      <div className="mx-auto max-w-6xl">
        {loaderData.posts.length === 0 ? (
          <p className="text-foreground/70 mt-4">No blog posts found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loaderData.posts.map((post) => (
              <Link className="group" key={post.slug} to={post.pathname}>
                <Card className="flex h-full cursor-pointer flex-col transition-all hover:scale-[1.02] hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>{post.metadata.title}</CardTitle>
                    {post.metadata.description && (
                      <CardDescription>
                        {post.metadata.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <p className="text-muted-foreground text-sm">
                      {new Date(post.metadata.date).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        }
                      )}
                    </p>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export async function loader() {
  const posts = await getPosts();
  console.log("Posts fetched:", posts);
  return { posts };
}
