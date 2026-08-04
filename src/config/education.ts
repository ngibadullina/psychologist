/**
 * Образование и профессиональное обучение.
 * Данные предоставлены владельцем сайта. Ничего не добавляем от себя.
 *
 * Сканы дипломов и сертификатов будут добавлены позже — тогда в записи
 * появится необязательное поле со ссылкой на документ.
 */

export interface EducationEntry {
  year: string;
  title: string;
  institution: string;
}

/** Базовое образование */
export const DEGREES: readonly EducationEntry[] = [
  {
    year: '2025',
    title: 'Бакалавр психології',
    institution:
      'Житомирський інститут ПрАТ «ВНЗ „Міжрегіональна Академія управління персоналом“»',
  },
];

/** Профессиональное обучение — от свежего к раннему */
export const TRAINING: readonly EducationEntry[] = [
  {
    year: '2026',
    title:
      'Theory and practice of the art therapy in work with the different categories of population',
    institution: 'International Training Company «Osnova»',
  },
  {
    year: '2024',
    title: 'Сімейна системна терапія (Family Systemic Psychotherapy)',
    institution: 'Міжрегіональний інститут гештальт-терапії і мистецтва (MIGIS)',
  },
  {
    year: '2023',
    title: 'Основи сучасної психосоматики: психоаналітичний підхід',
    institution: 'Міжнародний інститут психології',
  },
  {
    year: '2023',
    title: 'Основи психоаналізу',
    institution: 'Міжнародний інститут психології',
  },
  {
    year: '2021',
    title: 'Теорія і практика гештальт-терапії (I ступінь)',
    institution: 'Міжрегіональний інститут гештальт-терапії і мистецтва (MIGIS)',
  },
];
