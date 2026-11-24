import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts } from '../data/blog';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://itsaydrian.com');
  const posts = await getAllPosts();

  return rss({
    title: 'ItsAydrian Blog',
    description: 'Notes on travel, Japan, apps, and life in New York. Written by Aydrian Howard.',
    site: new URL('/blog/', site).href,
    trailingSlash: true,
    xmlns: { media: 'http://search.yahoo.com/mrss/' },
    items: posts.map((post) => {
      const image = post.ogImage ?? post.coverImage;
      return {
        title: post.title,
        description: post.seoDescription ?? post.excerpt,
        pubDate: new Date(post.date),
        link: `/blog/${post.slug}/`,
        categories: [post.category],
        author: 'howdy@itsaydrian.com (Aydrian Howard)',
        customData: image ? `<media:content url="${new URL(image, site).href}" medium="image" />` : undefined,
      };
    }),
    customData: '<language>en-us</language>',
  });
}
