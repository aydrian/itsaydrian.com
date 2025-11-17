import { Link } from "react-router";

import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card";
import { cn } from "~/utils/css";
import {
  getCategories,
  getPosts,
  getPostsByCategory
} from "~/utils/posts.server";

import type { Route } from "./+types/_index";

export default function Blog({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-foreground text-3xl font-bold">Blog</h1>
        {loaderData.categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Link
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                loaderData.currentCategory === "All"
                  ? "bg-primary text-primary-foreground border-transparent"
                  : "border-border hover:bg-accent"
              )}
              to="/blog"
            >
              All
            </Link>
            {loaderData.categories.map((category) => (
              <Link
                className={cn(
                  "rounded-full border px-3 py-1 text-sm transition-colors",
                  loaderData.currentCategory === category
                    ? "bg-primary text-primary-foreground border-transparent"
                    : "border-border hover:bg-accent"
                )}
                key={category}
                to={`/blog?category=${encodeURIComponent(category)}`}
              >
                {toTitleCase(category)}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="mx-auto max-w-6xl">
        {loaderData.posts.length === 0 ? (
          <p className="text-foreground/70 mt-4">No blog posts found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {loaderData.posts.map((post) => (
                <Link className="group" key={post.slug} to={post.pathname}>
                  <Card className="flex h-full cursor-pointer flex-col transition-all hover:scale-[1.02] hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between gap-2">
                        <CardTitle>{post.metadata.title}</CardTitle>
                        {post.isDraft && <Badge variant="warning">Draft</Badge>}
                      </div>
                      {post.metadata.description && (
                        <CardDescription>
                          {post.metadata.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardFooter className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                      <p className="text-muted-foreground shrink-0 text-sm">
                        {new Date(post.metadata.date).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                          }
                        )}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        {post.metadata.tags?.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");

  const posts = category ? getPostsByCategory(category) : getPosts();
  const categories = getCategories();

  const currentCategory = category ?? "All";

  return { categories, currentCategory, posts };
}

function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}
