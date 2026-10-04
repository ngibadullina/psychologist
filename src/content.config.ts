import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { SITE } from './config/site';

/**
 * Статьи блога.
 *
 * Одна статья — одна папка: src/content/blog/<slug>/index.md.
 * Имя папки становится адресом: /blog/<slug>/.
 * Обложка и картинки из текста лежат в той же папке и подключаются
 * относительным путём ('./cover.jpg') — Astro сам их сожмёт.
 *
 * Пошаговая инструкция — в AGENTS.md, раздел «Как добавить статью».
 *
 * У каждой статьи обязательны заголовок, описание, дата, рубрика и теги:
 * без них сборка остановится с ошибкой.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        /** Для meta description и карточки статьи, до ~160 символов */
        description: z.string(),
        publishDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        /** Обложка, рекомендуемый размер 1200×630 */
        image: image().optional(),
        imageAlt: z.string().optional(),
        category: z.string(),
        tags: z.array(z.string()).min(1, 'Нужен хотя бы один тег'),
        /** Черновик видно в npm run dev, в production-сборку он не попадает */
        draft: z.boolean().default(false),
        author: z.string().default(SITE.author),
      })
      .refine((data) => !data.image || data.imageAlt, {
        message: 'Для обложки нужен imageAlt — текстовое описание картинки',
        path: ['imageAlt'],
      }),
});

export const collections = { blog };
