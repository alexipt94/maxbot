import type { Program } from '../../domain/programs/Program.js';
import {
  buildProgressBar,
  calculateProgressPercent,
  getProgramIndicator,
} from '../../domain/programs/programProgress.js';

export type ProgramButton = {
  text: string;
  callbackData: string;
};

function buildProgramButton(program: Program): ProgramButton {
  const indicator = getProgramIndicator(program);
  const progressBar = buildProgressBar(program);
  const percent = calculateProgressPercent(program);

  return {
    text: `${indicator} ${program.title} · ${program.enrolledCount}/${program.capacity} · ${progressBar} ${percent}%`,
    callbackData: `program:${program.id}`,
  };
}

export function buildProgramsKeyboard(
  programs: Program[],
): ProgramButton[][] {
  const sportPrograms = programs.filter(
    (program) => program.category === 'sport',
  );

  const otherPrograms = programs.filter(
    (program) => program.category === 'other',
  );

  const rows: ProgramButton[][] = [];

  if (sportPrograms.length > 0) {
    rows.push([
      {
        text: '🏃 СПОРТИВНЫЕ СЕКЦИИ',
        callbackData: 'category:sport',
      },
    ]);

    for (const program of sportPrograms) {
      rows.push([buildProgramButton(program)]);
    }
  }

  if (otherPrograms.length > 0) {
    rows.push([
      {
        text: '🎨 ОСТАЛЬНЫЕ НАПРАВЛЕНИЯ',
        callbackData: 'category:other',
      },
    ]);

    for (const program of otherPrograms) {
      rows.push([buildProgramButton(program)]);
    }
  }

  return rows;
}