import { getCollection, type CollectionEntry } from 'astro:content';

import { withBase } from '~/utils/url';

export type Post = CollectionEntry<'blog'>;

/**
 * Опубликованные статьи, новые сверху.
 * Черновики видны только в режиме разработки — чтобы их можно было вычитать.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);

  return posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

/** Адрес статьи: /blog/<slug>/ */
export function postUrl(post: Post): string {
  return withBase(`/blog/${post.id}/`);
}

const dateFormatter = new Intl.DateTimeFormat('uk-UA', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/** 4 жовтня 2026 р. */
export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}

/** Для атрибута datetime: 2026-10-04 */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
