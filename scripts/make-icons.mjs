/**
 * Генерация логотипа и фавиконок.
 *
 * Два разных источника — намеренно:
 *
 *   __assets__/logo.png   подробная эмблема → src/assets/logo.png для шапки,
 *                         где размер 44 px и детали ещё различимы;
 *   public/favicon.svg    упрощённый знак → растровые иконки, потому что на
 *                         16-32 px тонкие ветви исходника сливаются в пятно.
 *
 * Раскладка:
 *   src/assets/logo.png          — шапка, обрабатывается Astro
 *   public/favicon-32.png        — вкладка браузера
 *   public/favicon-192.png       — Android, ярлык на рабочем столе
 *   public/apple-touch-icon.png  — iOS, фон непрозрачный
 *
 * Запуск: npm run icons
 * Повторять нужно при замене логотипа или правке favicon.svg.
 */

import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SOURCE = `${ROOT}__assets__/logo.png`;
const MARK_SVG = `${ROOT}public/favicon.svg`;

/** Цвет фона сайта — для непрозрачной иконки iOS */
const PAGE_BACKGROUND = '#fbfaf8';

/** Ниже этой яркости пиксель считаем фоном, а не эмблемой */
const BRIGHTNESS_THRESHOLD = 140;

/** Границы светлой части изображения */
async function findEmblemBounds() {
  const { data, info } = await sharp(SOURCE)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let minX = info.width;
  let minY = info.height;
  let maxX = 0;
  let maxY = 0;

  // В буфере может быть не один канал на пиксель (например, серый + альфа),
  // поэтому шаг берём из метаданных, а не предполагаем.
  const stride = info.channels;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      if (data[(y * info.width + x) * stride] < BRIGHTNESS_THRESHOLD) continue;

      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  return { minX, minY, maxX, maxY, width: info.width, height: info.height };
}

/** Квадрат вокруг эмблемы, не выходящий за пределы исходника */
function squareCrop(bounds) {
  const centerX = (bounds.minX + bounds.maxX) / 2;
  const centerY = (bounds.minY + bounds.maxY) / 2;
  const side = Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY);

  const half = side / 2;
  const left = Math.max(0, Math.round(centerX - half));
  const top = Math.max(0, Math.round(centerY - half));
  const size = Math.min(Math.round(side), bounds.width - left, bounds.height - top);

  return { left, top, width: size, height: size };
}

/** Круглая маска — обрезает чёрные углы кадра */
function circleMask(size) {
  return Buffer.from(
    `<svg width="${size}" height="${size}">` +
      `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/>` +
      `</svg>`,
  );
}

/** Круглая эмблема заданного размера с прозрачным фоном */
function roundEmblem(crop, size) {
  return sharp(SOURCE)
    .extract(crop)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: circleMask(size), blend: 'dest-in' }])
    .png();
}

const bounds = await findEmblemBounds();
const crop = squareCrop(bounds);

console.log(
  `Эмблема найдена: ${crop.width}×${crop.height} px, отступ слева ${crop.left}, сверху ${crop.top}.`,
);

await mkdir(`${ROOT}src/assets`, { recursive: true });
await mkdir(`${ROOT}public`, { recursive: true });

// Подробная эмблема — только для шапки
await roundEmblem(crop, 512).toFile(`${ROOT}src/assets/logo.png`);

// Растровые иконки — из упрощённого знака
const mark = await readFile(MARK_SVG);
const renderMark = (size) => sharp(mark, { density: 384 }).resize(size, size).png();

await renderMark(32).toFile(`${ROOT}public/favicon-32.png`);
await renderMark(192).toFile(`${ROOT}public/favicon-192.png`);

// iOS не поддерживает прозрачность в иконке и заливает её чёрным,
// поэтому подкладываем цвет фона сайта. Отступ по краям — как у системных
// иконок, иначе знак упирается в скруглённые углы.
const APPLE_SIZE = 180;
const APPLE_INSET = 20;
const appleMark = await renderMark(APPLE_SIZE - APPLE_INSET * 2).toBuffer();

await sharp({
  create: {
    width: APPLE_SIZE,
    height: APPLE_SIZE,
    channels: 4,
    background: PAGE_BACKGROUND,
  },
})
  .composite([{ input: appleMark, top: APPLE_INSET, left: APPLE_INSET }])
  .png()
  .toFile(`${ROOT}public/apple-touch-icon.png`);

console.log('Готово: src/assets/logo.png, favicon-32, favicon-192, apple-touch-icon.');
