import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getParams } from "remix-params-helper";
import z from "zod";

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
  const slug = result.data;
  const env = context.env as Env;

  const data = await env.CONTENT.get<BlogContentType>(`blog/${slug}`, "json");
  if (!data) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }

  return json(
    { ...data, slug },
    { headers: { "cache-control": "max-age=3600000" } }
  );
}

export default function BlogSlug() {
  const { frontmatter, html, readTime } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div>{readTime}</div>
    </div>
  );
}
