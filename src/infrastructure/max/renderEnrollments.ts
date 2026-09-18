import type { Enrollment } from '../../domain/enrollments/Enrollment.js';

export function renderEnrollments(
  programTitle: string,
  enrollments: Enrollment[],
): string {
  if (enrollments.length === 0) {
    return [
      `📚 ${programTitle}`,
      '',
      'Список зарегистрированных детей пока пуст.',
    ].join('\n');
  }

  const children = enrollments.map((enrollment, index) => {
    const icon =
      enrollment.status === 'enrolled'
        ? '🟢'
        : '🟡';

    const statusText =
      enrollment.status === 'enrolled'
        ? 'зачислен'
        : 'не получилось зачислить';

    return `${index + 1}. ${icon} ${enrollment.childName} — ${statusText}`;
  });

  return [
    `📚 ${programTitle}`,
    '',
    'Зарегистрированные дети:',
    '',
    ...children,
  ].join('\n');
}