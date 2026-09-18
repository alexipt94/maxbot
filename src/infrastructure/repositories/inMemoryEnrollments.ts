import type { Enrollment } from '../../domain/enrollments/Enrollment.js';

export const enrollments: Enrollment[] = [
  {
    id: 'enrollment-1',
    programId: 'football',
    childName: 'Ребёнок 1',
    status: 'enrolled',
  },
  {
    id: 'enrollment-2',
    programId: 'football',
    childName: 'Ребёнок 2',
    status: 'enrolled',
  },
  {
    id: 'enrollment-3',
    programId: 'football',
    childName: 'Ребёнок 3',
    status: 'not_enrolled',
  },
  {
    id: 'enrollment-4',
    programId: 'swimming',
    childName: 'Ребёнок 4',
    status: 'enrolled',
  },
  {
    id: 'enrollment-5',
    programId: 'swimming',
    childName: 'Ребёнок 5',
    status: 'not_enrolled',
  },
  {
    id: 'enrollment-6',
    programId: 'robotics',
    childName: 'Ребёнок 6',
    status: 'enrolled',
  },
];