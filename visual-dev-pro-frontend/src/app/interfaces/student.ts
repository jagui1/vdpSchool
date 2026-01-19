import { Course } from './course';

export interface Student {
  id?: number;
  schoolId: number;
  fullName: string;
  email: string;
  gradeLevel: number;
  enrolledCourses: Course[];
}
