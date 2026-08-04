/**
 * Post-build для автономной сборки.
 *
 * Astro выдаёт абсолютные пути от корня сайта:
 *     <link href="/_astro/style.css">   <a href="/about/">
 * При открытии через file:// браузер ищет их в корне диска, поэтому переводим
 * пути в относительные и подставляем реальные имена файлов:
 *     <link href="./_astro/style.css">  <a href="./about.html">
 *
 * Запускается командой npm run build:offline после astro build.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT_DIR = fileURLToPath(new URL('../dist-offline', import.meta.url));

/** Рекурсивно собирает файлы с указанными расширениями */
async function collectFiles(directory, extensions) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath, extensions)));
    } else if (extensions.some((extension) => entry.name.endsWith(extension))) {
      files.push(fullPath);
    }
  }

  return files;
}

/** './' для файла в корне, '../' на каждый уровень вложенности */
function relativePrefix(filePath) {
  const depth = relative(OUT_DIR, dirname(filePath)).split(/[\\/]/).filter(Boolean).length;
  return depth === 0 ? './' : '../'.repeat(depth);
}

/**
 * '/'          -> './index.html'
 * '/about/'    -> './about.html'
 * '/_astro/a'  -> './_astro/a'
 * Внешние ссылки, mailto: и якоря не трогаем.
 */
function toRelativeUrl(url, prefix) {
  if (!url.startsWith('/') || url.startsWith('//')) {
    return url;
  }

  const [pathPart, hash] = url.split('#');
  let target = pathPart.slice(1);

  if (target === '') {
    target = 'index.html';
  } else if (target.endsWith('/')) {
    target = `${target.slice(0, -1)}.html`;
  }

  return `${prefix}${target}${hash ? `#${hash}` : ''}`;
}

/** Переписывает href/src и каждый URL внутри srcset */
function rewriteHtml(html, prefix) {
  return html
    .replace(/srcset="([^"]*)"/g, (_match, value) => {
      const rewritten = value
        .split(',')
        .map((candidate) => {
          const [url, descriptor] = candidate.trim().split(/\s+/);
          return [toRelativeUrl(url, prefix), descriptor].filter(Boolean).join(' ');
        })
        .join(', ');

      return `srcset="${rewritten}"`;
    })
    .replace(
      /(?<![\w-])(href|src)="([^"]*)"/g,
      (_match, attribute, value) => `${attribute}="${toRelativeUrl(value, prefix)}"`,
    );
}

/** url(/_astro/file.woff2) внутри CSS — на случай шрифтов и фонов */
function rewriteCss(css, prefix) {
  return css.replace(
    /url\((['"]?)(\/[^'")]+)\1\)/g,
    (_match, quote, url) => `url(${quote}${toRelativeUrl(url, prefix)}${quote})`,
  );
}

const htmlFiles = await collectFiles(OUT_DIR, ['.html']);
const cssFiles = await collectFiles(OUT_DIR, ['.css']);

for (const file of htmlFiles) {
  const source = await readFile(file, 'utf8');
  await writeFile(file, rewriteHtml(source, relativePrefix(file)), 'utf8');
}

for (const file of cssFiles) {
  const source = await readFile(file, 'utf8');
  await writeFile(file, rewriteCss(source, relativePrefix(file)), 'utf8');
}

console.log(
  `Автономная сборка готова: dist-offline (${htmlFiles.length} страниц, ${cssFiles.length} css).`,
);
console.log('Откройте dist-offline/index.html двойным кликом.');
