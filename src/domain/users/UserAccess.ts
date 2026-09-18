export type UserRole = 'admin' | 'leader' | 'viewer';

export type UserAccess = {
  maxUserId: number;
  displayName: string;
  role: UserRole;
  programIds: string[];
  active: boolean;
};