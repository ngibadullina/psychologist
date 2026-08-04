/**
 * Хелперы для ссылок с учётом base-пути.
 *
 * import.meta.env.BASE_URL Astro формирует из поля `base` в astro.config.ts,
 * поэтому все внутренние ссылки и пути к файлам из /public строим только через withBase().
 * Это даёт рабочие ссылки и на https://USERNAME.github.io/REPOSITORY/, и на собственном домене.
 */

/** Приводит base к виду без завершающего слэша: '/repo' или '' */
function normalizedBase(): string {
  const base = import.meta.env.BASE_URL;
  return base.endsWith('/') ? base.slice(0, -1) : base;
}

/** Внутренняя ссылка: withBase('/about/') -> '/REPOSITORY/about/' */
export function withBase(path = '/'): string {
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase()}${suffix}`;
}

/** Активен ли пункт меню для текущего URL */
export function isActivePath(currentPathname: string, href: string): boolean {
  const target = withBase(href);
  const current = currentPathname.endsWith('/') ? currentPathname : `${currentPathname}/`;
  const normalizedTarget = target.endsWith('/') ? target : `${target}/`;

  if (normalizedTarget === withBase('/')) {
    return current === normalizedTarget;
  }

  return current.startsWith(normalizedTarget);
}
