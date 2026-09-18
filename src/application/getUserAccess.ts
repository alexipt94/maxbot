import type { UserAccess } from '../domain/users/UserAccess.js';
import { userAccess } from '../infrastructure/repositories/inMemoryUserAccess.js';

export function getUserAccess(
  maxUserId: number | undefined,
): UserAccess | null {
  if (maxUserId === undefined) {
    return null;
  }

  return (
    userAccess.find(
      (user) =>
        user.maxUserId === maxUserId &&
        user.active,
    ) ?? null
  );
}