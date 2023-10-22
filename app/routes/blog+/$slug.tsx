import { type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getParams } from "remix-params-helper";
import {
  type TypedMetaFunction,
  typedjson,
  useTypedLoaderData
} from "remix-typedjson";
import client from "tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import z from "zod";

const ParamsSchema = z.object({
  slug: z.string()
});

export async function loader({ params }: LoaderFunctionArgs) {
  const result = getParams(params, ParamsSchema);
  if (!result.success) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }
  const slug = result.data.slug;

  const postResponse = await client.queries.post({
    relativePath: slug + ".mdx"
  });

  const post = postResponse.data.post;

  return typedjson(
    { post }
    // { headers: { "cache-control": "max-age=3600000" } }
  );
}

export const meta: TypedMetaFunction<typeof loader> = ({ data }) => {
  let title = "ItsAydrian Blog";
  let description = "";
  if (data) {
    title = data.post.title;
    description = data.post.description ?? "";
  }
  return [
    { title },
    {
      content: description,
      name: "description"
    },
    {
      content: title,
      property: "og:title"
    },
    {
      content: description,
      property: "og:description"
    },
    {
      content: "website",
      property: "og:type"
    },
    {
      content: "https://itsaydrian.com",
      property: "og:url"
    },
    // {
    //   content: "https://itsaydrian.com/og-image.png",
    //   property: "og:image"
    // },
    {
      content: "summary_large_image",
      name: "twitter:card"
    },
    {
      content: "@itsaydrian",
      name: "twitter:creator"
    },
    {
      content: title,
      name: "twitter:title"
    },
    {
      content: description,
      name: "twitter:description"
    }
  ];
};

export default function BlogPost() {
  const { post } = useTypedLoaderData();
  return (
    <>
      <header>
        <h1>{post.title}</h1>
      </header>
      <main>
        <TinaMarkdown content={post.body} />
      </main>
    </>
  );
}
