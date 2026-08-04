import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { BASE_PATH, SITE_URL } from './src/config/site';

// https://astro.build/config
export default defineConfig({
  /** Полный адрес сайта — нужен для canonical, Open Graph, sitemap и RSS. */
  site: SITE_URL,
  /** Подпапка публикации. '/' для собственного домена, '/REPOSITORY' для GitHub Pages. */
  base: BASE_PATH,
  /** Статическая генерация без серверного backend. */
  output: 'static',
  /** Единый формат URL: /about/ вместо /about — меньше редиректов и дублей для SEO. */
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
});
