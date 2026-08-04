import { defineConfig } from 'astro/config';

import { SITE_URL } from './src/config/site';

/**
 * Конфигурация автономной сборки — папка, которую можно открыть двойным кликом
 * по index.html, без сервера и без интернета.
 *
 * Отличия от основного astro.config.ts:
 *   base: '/'              — без подпапки репозитория;
 *   build.format: 'file'   — about.html вместо about/index.html,
 *                            иначе file:// показывает список файлов вместо страницы;
 *   outDir: dist-offline   — чтобы не затирать сборку для GitHub Pages;
 *   без sitemap            — в офлайн-версии он бессмысленен.
 *
 * После сборки пути остаются абсолютными, поэтому команда build:offline
 * дополнительно запускает scripts/make-offline.mjs — он делает их относительными.
 */
export default defineConfig({
  site: SITE_URL,
  base: '/',
  output: 'static',
  trailingSlash: 'ignore',
  outDir: './dist-offline',
  build: {
    format: 'file',
  },
});
