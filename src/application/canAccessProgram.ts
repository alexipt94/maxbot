import type { UserAccess } from '../domain/users/UserAccess.js';

export function canAccessProgram(
  access: UserAccess,
  programId: string,
): boolean {
  if (access.role === 'admin') {
    return true;
  }

  return access.programIds.includes(programId);
}