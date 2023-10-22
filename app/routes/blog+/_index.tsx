import { type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { client } from "tina/__generated__/client";

export async function loader({ request }: LoaderFunctionArgs) {
  const postsResponse = await client.queries.postConnection();
  const posts = postsResponse.data.postConnection.edges?.map((post) => {
    return {
      id: post?.node?.id,
      slug: post?.node?._sys.filename,
      title: post?.node?.title
    };
  });

  return typedjson(
    { posts },
    {
      headers: {
        "cache-control": "max-age=3600000"
      }
    }
  );
}

export default function BlogIndex() {
  const { posts } = useTypedLoaderData<typeof loader>();
  return (
    <div>
      <h1>Blog</h1>
      {posts ? (
        <ul>
          {posts.filter(Boolean).map((post) => (
            <li key={post.id}>
              <Link to={`./${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
