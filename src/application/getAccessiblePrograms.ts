import type { Program } from '../domain/programs/Program.js';
import type { UserAccess } from '../domain/users/UserAccess.js';
import { programs } from '../infrastructure/repositories/inMemoryPrograms.js';

export function getAccessiblePrograms(
  access: UserAccess,
): Program[] {
  if (access.role === 'admin') {
    return programs;
  }

  return programs.filter((program) =>
    access.programIds.includes(program.id),
  );
}