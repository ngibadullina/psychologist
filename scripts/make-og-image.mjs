/**
 * Картинка для превью ссылки (Open Graph) — public/og-image.jpg, 1200x630.
 *
 * Её показывают Telegram, Facebook, LinkedIn и поисковики, когда кто-то
 * делится ссылкой на сайт. Без неё ссылка разворачивается голым текстом.
 *
 * Слева — логотип, имя, специализация и адрес сайта, справа — фотография.
 * Тексты и цвета берутся из конфига и дизайн-системы, чтобы картинка
 * не разъезжалась с сайтом.
 *
 * Запуск: npm run og
 * Повторять при смене фотографии, имени или специализации.
 */

import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

import { SITE, SITE_URL } from '../src/config/site.ts';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

const WIDTH = 1200;
const HEIGHT = 630;

/** Ширина колонки с фотографией */
const PHOTO_WIDTH = 460;
const TEXT_LEFT = 80;

/* Цвета продублированы из src/styles/tokens.css: CSS-переменные в растр не попадают */
const COLOR_BG = '#fbfaf8';
const COLOR_TEXT = '#2e3330';
const COLOR_MUTED = '#565e5a';
const COLOR_ACCENT = '#4e6b60';
const COLOR_BORDER = '#e3ded4';

/** Домен без протокола — для подписи внизу */
const domain = SITE_URL.replace(/^https?:\/\//, '');

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <text x="${TEXT_LEFT}" y="330" font-family="Georgia, serif" font-size="56" fill="${COLOR_TEXT}">${SITE.author}</text>
  <text x="${TEXT_LEFT}" y="382" font-family="Segoe UI, sans-serif" font-size="26" fill="${COLOR_MUTED}">${SITE.role}</text>
  <rect x="${TEXT_LEFT}" y="420" width="64" height="3" fill="${COLOR_ACCENT}" />
  <text x="${TEXT_LEFT}" y="545" font-family="Segoe UI, sans-serif" font-size="24" fill="${COLOR_MUTED}">${domain}</text>
  <rect x="${WIDTH - PHOTO_WIDTH - 1}" y="0" width="1" height="${HEIGHT}" fill="${COLOR_BORDER}" />
</svg>
`);

const photo = await sharp(`${ROOT}src/assets/portrait.jpg`)
  .resize(PHOTO_WIDTH, HEIGHT, { fit: 'cover', position: 'top' })
  .toBuffer();

const logo = await sharp(`${ROOT}src/assets/logo.png`).resize(84, 84).toBuffer();

await sharp({
  create: { width: WIDTH, height: HEIGHT, channels: 3, background: COLOR_BG },
})
  .composite([
    { input: photo, left: WIDTH - PHOTO_WIDTH, top: 0 },
    { input: logo, left: TEXT_LEFT, top: 90 },
    { input: overlay, left: 0, top: 0 },
  ])
  .jpeg({ quality: 88 })
  .toFile(`${ROOT}public/og-image.jpg`);

console.log('public/og-image.jpg готов (1200x630).');
