/**
 * Централизованная конфигурация сайта.
 *
 * Язык сайта — украинский. Комментарии оставлены на русском (язык нашей работы).
 *
 * ВАЖНО: контакты ниже — временные заглушки.
 * Замените их на реальные данные перед публикацией.
 * Секретов и токенов здесь быть не должно: файл попадает в клиентскую сборку.
 */

/**
 * Сценарий публикации.
 *
 * 1) Собственный домен — https://gibadullina.com/
 *      SITE_URL  = 'https://gibadullina.com'
 *      BASE_PATH = '/'
 *
 * 2) GitHub Pages в подпапке репозитория — https://ngibadullina.github.io/psychologist/
 *      SITE_URL  = 'https://ngibadullina.github.io'
 *      BASE_PATH = '/psychologist'
 *
 * Сейчас настроен сценарий 1.
 * Домен привязан файлом public/CNAME — его читает GitHub Pages при выкладке.
 */
export const SITE_URL = 'https://gibadullina.com';
export const BASE_PATH = '/';

export const SITE = {
  /** Имя специалиста */
  author: 'Наталія Гібадулліна',
  /** Короткое название сайта (используется в <title> и шапке) */
  name: 'Наталія Гібадулліна — психолог-консультант',
  /** Специализация одной строкой */
  role: 'Психолог-консультант, гештальт-терапевт',
  /** Заголовок главной страницы по умолчанию */
  title: 'Наталія Гібадулліна — психолог-консультант, гештальт-терапевт',
  /** Описание по умолчанию (до ~160 символов) */
  description:
    'Індивідуальні консультації психолога онлайн та очно. Гештальт-підхід, робота з тривогою, стосунками та внутрішніми конфліктами.',
  lang: 'uk',
  locale: 'uk_UA',
} as const;

/**
 * Контакты. Меняются только здесь — компоненты берут значения отсюда.
 * location пока заглушка — уточните формат и часовой пояс.
 */
export const CONTACTS = {
  email: 'gibadullinanatalia@gmail.com',
  telegram: {
    label: '@na_ta_8',
    url: 'https://t.me/na_ta_8',
  },
  instagram: {
    label: '@natalia.gibadullina_',
    url: 'https://instagram.com/natalia.gibadullina_',
  },
} as const;

/**
 * Instagram временно скрыт: страница ещё не готова.
 * Поставьте true — ссылка и упоминания вернутся в контакты, подвал,
 * на страницу конфиденциальности и в описание страницы «Контакти».
 * Сами данные аккаунта выше удалять не нужно.
 */
export const INSTAGRAM_ENABLED: boolean = false;

/**
 * Блог скрыт, пока нет ни одной статьи.
 * Поставьте true — вернутся пункт меню, блок «Останні статті» на главной,
 * кнопка на странице 404 и страница блога в sitemap.
 */
export const BLOG_ENABLED: boolean = false;

/** Все разделы сайта. Пути указываются без BASE_PATH — он добавляется хелпером withBase(). */
const ALL_NAV_LINKS = [
  { href: '/', label: 'Головна' },
  { href: '/about/', label: 'Про мене' },
  { href: '/services/', label: 'Запити' },
  { href: '/format/', label: 'Формат роботи' },
  { href: '/blog/', label: 'Блог' },
  { href: '/contacts/', label: 'Контакти' },
] as const;

/**
 * Основная навигация: шапка, мобильное меню и подвал берут её отсюда,
 * поэтому скрытый раздел достаточно отфильтровать в одном месте.
 */
export const NAV_LINKS = ALL_NAV_LINKS.filter(
  (link) => BLOG_ENABLED || link.href !== '/blog/',
);
