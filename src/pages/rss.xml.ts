import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

import { SITE } from '~/config/site';
import { getPublishedPosts, postUrl } from '~/utils/blog';
import { withBase } from '~/utils/url';

/** RSS-лента блога: заголовок, описание и ссылка на каждую статью. */
export const GET: APIRoute = async ({ site }) => {
  const posts = await getPublishedPosts();

  return rss({
    title: `Блог — ${SITE.author}`,
    description: 'Статті про емоції, стосунки та турботу про себе.',
    site: new URL(withBase('/'), site),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: postUrl(post),
      categories: [post.data.category],
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
};
