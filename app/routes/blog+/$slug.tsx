import { type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useMemo } from "react";
import { getParams } from "remix-params-helper";
import {
  type TypedMetaFunction,
  typedjson,
  useTypedLoaderData
} from "remix-typedjson";
import z from "zod";

import { Pre } from "~/components/mdx-components";
import { getMDXComponent } from "~/utils/mdx";

const ParamsSchema = z.object({
  slug: z.string()
});

type Frontmatter = {
  [key: string]: any;
};

type BlogContentType = {
  code: string;
  frontmatter: Frontmatter;
  hash: string;
  html: string;
  readTime: any;
  slug: string;
};

export async function loader({ context, params }: LoaderFunctionArgs) {
  const result = getParams(params, ParamsSchema);
  if (!result.success) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }
  const slug = result.data.slug;
  const env = context.env as Env;

  const data = await env.CONTENT.get<BlogContentType>(`blog/${slug}`, "json");
  if (!data) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }

  console.log({ frontmatter: JSON.stringify(data.frontmatter) });

  return typedjson(
    { ...data, slug }
    // { headers: { "cache-control": "max-age=3600000" } }
  );
}

export const meta: TypedMetaFunction<typeof loader> = ({ data }) => {
  let title = "ItsAydrian Blog";
  let description = "";
  if (data) {
    title = `${data.frontmatter.title} - ${title}`;
    description = data.frontmatter.description;
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
  const { code, frontmatter, html, readTime } =
    useTypedLoaderData<typeof loader>();
  const Component = useMemo(() => {
    if (typeof window === "undefined" && !code) {
      return null;
    }
    return getMDXComponent(code);
  }, [code]);

  return (
    <>
      <header>
        <h1>{frontmatter.title}</h1>
      </header>
      <main>
        {Component ? (
          <Component components={{ pre: Pre }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </main>
      <div>{readTime?.text}</div>
    </>
  );
}
