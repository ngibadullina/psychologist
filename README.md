# Сайт-визитка психолога

Статический сайт на Astro + TypeScript, без backend. Публикация — GitHub Pages.

## Требования

- Node.js >= 22.12
- npm

## Команды

| Команда           | Действие                                        |
| ----------------- | ----------------------------------------------- |
| `npm install`     | установить зависимости                          |
| `npm run dev`     | локальный сервер разработки на `localhost:4321` |
| `npm run build`   | production-сборка в `dist/`                     |
| `npm run preview` | локальный просмотр собранного сайта             |
| `npm run check`   | проверка типов и `.astro`-файлов                |

## Структура проекта

```
public/            статические файлы без обработки (favicon, robots.txt, документы)
src/
  assets/          изображения, которые обрабатывает Astro
  components/      небольшие переиспользуемые компоненты
  config/          централизованные настройки: контакты, навигация, адрес сайта
  content/         статьи блога (Astro Content Collections) — добавим позже
  layouts/         макеты страниц
  pages/           маршруты сайта
  styles/          дизайн-система и глобальные стили
  utils/           небольшие хелперы (например, ссылки с учётом base)
astro.config.ts    конфигурация Astro: site, base, интеграции
```

## Настройка публикации

Адрес сайта задаётся в одном месте — [`src/config/site.ts`](src/config/site.ts):

```ts
export const SITE_URL = 'https://USERNAME.github.io';
export const BASE_PATH = '/PsychologistWebsite';
```

- GitHub Pages в подпапке: `SITE_URL = 'https://USERNAME.github.io'`, `BASE_PATH = '/REPOSITORY'`
- Собственный домен: `SITE_URL = 'https://example.com'`, `BASE_PATH = '/'`

Все внутренние ссылки и пути к файлам из `public/` строятся через `withBase()`
из [`src/utils/url.ts`](src/utils/url.ts), поэтому смена сценария не требует правок в компонентах.

## Статус

Этап 1: каркас проекта, дизайн-система, `BaseLayout`, стартовая главная страница.
Дальше: шапка с мобильным меню и подвал, страницы сайта, блог, SEO, GitHub Actions.
