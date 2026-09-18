import type { UserAccess } from '../../domain/users/UserAccess.js';

export const userAccess: UserAccess[] = [
  {
    maxUserId: 72902775,
    displayName: 'Алексей Владимирович Иптышев',
    role: 'admin',
    programIds: [],
    active: true,
  },
  {
    maxUserId: 11111111,
    displayName: 'Тестовый руководитель',
    role: 'leader',
    programIds: ['football'],
    active: true,
  },
];