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
 * 1) GitHub Pages в подпапке репозитория — https://ngibadullina.github.io/psychologist/
 *      SITE_URL  = 'https://ngibadullina.github.io'
 *      BASE_PATH = '/psychologist'
 *
 * 2) Собственный домен — https://example.com/
 *      SITE_URL  = 'https://example.com'
 *      BASE_PATH = '/'
 *
 * Сейчас настроен сценарий 1.
 */
export const SITE_URL = 'https://ngibadullina.github.io';
export const BASE_PATH = '/psychologist';

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

/** Основная навигация. Пути указываются без BASE_PATH — он добавляется хелпером withBase(). */
export const NAV_LINKS = [
  { href: '/', label: 'Головна' },
  { href: '/about/', label: 'Про мене' },
  { href: '/services/', label: 'Запити' },
  { href: '/format/', label: 'Формат роботи' },
  { href: '/blog/', label: 'Блог' },
  { href: '/contacts/', label: 'Контакти' },
] as const;
