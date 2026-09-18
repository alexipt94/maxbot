import type { Program } from '../domain/programs/Program.js';

export function buildProgramKeyboard(programs: Program[]) {
  return {
    buttons: programs.map((program) => [
      {
        type: 'callback' as const,
        text: program.title,
        payload: `program:${program.id}`,
      },
    ]),
  };
}