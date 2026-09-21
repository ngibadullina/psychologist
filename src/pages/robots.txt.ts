import type { APIRoute } from 'astro';

import { withBase } from '~/utils/url';

/**
 * robots.txt генерируется, а не лежит статикой в public/:
 * адрес sitemap должен следовать за SITE_URL из конфига,
 * иначе при смене домена файл начнёт указывать в никуда.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL(withBase('/sitemap-index.xml'), site).href;

  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
