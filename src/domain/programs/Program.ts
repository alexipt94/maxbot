export type ProgramCategory = 'sport' | 'other';

export type ProgramStatus = 'open' | 'closed';

export type Program = {
  id: string;
  title: string;
  category: ProgramCategory;
  capacity: number;
  enrolledCount: number;
  status: ProgramStatus;
  leaderIds: string[];
  updatedAt: string;
};