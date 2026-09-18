import type { Program } from '../../domain/programs/Program.js';
import { getProgramIndicator } from '../../domain/programs/programProgress.js';

export type ProgramButton = {
  type: 'callback';
  text: string;
  payload: string;
};

function buildProgramButton(program: Program): ProgramButton {
  const indicator = getProgramIndicator(program);


  return {
    type: 'callback',
    text: `${indicator} ${program.title} · ${program.enrolledCount}/${program.capacity} `,
    payload: `program:${program.id}`,
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
        type: 'callback',
        text: '🏃 СПОРТИВНЫЕ СЕКЦИИ',
        payload: 'category:sport',
      },
    ]);

    for (const program of sportPrograms) {
      rows.push([buildProgramButton(program)]);
    }
  }

  if (otherPrograms.length > 0) {
    rows.push([
      {
        type: 'callback',
        text: '🎨 ОСТАЛЬНЫЕ НАПРАВЛЕНИЯ',
        payload: 'category:other',
      },
    ]);

    for (const program of otherPrograms) {
      rows.push([buildProgramButton(program)]);
    }
  }

  return rows;
}