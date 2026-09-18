import type { Program } from './Program.js';

export function calculateFreePlaces(program: Program): number {
  return program.capacity - program.enrolledCount;
}

export function calculateProgressPercent(program: Program): number {
  if (program.capacity <= 0) {
    return 0;
  }

  return Math.round((program.enrolledCount / program.capacity) * 100);
}

export function buildProgressBar(
  program: Program,
  size = 10,
): string {
  const percent = calculateProgressPercent(program);
  const filled = Math.min(
    size,
    Math.round((percent / 100) * size),
  );

  return '▓'.repeat(filled) + '░'.repeat(size - filled);
}

export function getProgramIndicator(program: Program): string {
  if (program.status === 'closed') {
    return '🔒';
  }

  const percent = calculateProgressPercent(program);

  if (percent >= 100) {
    return '✅';
  }

  if (percent < 50) {
    return '🔴';
  }

  if (percent < 80) {
    return '🟡';
  }

  return '🟢';
}