export type EnrollmentStatus = 'enrolled' | 'not_enrolled';

export type Enrollment = {
  id: string;
  programId: string;
  childName: string;
  status: EnrollmentStatus;
};