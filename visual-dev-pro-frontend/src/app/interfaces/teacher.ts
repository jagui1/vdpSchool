import { Course } from './course';

export interface Teacher {
  id?: number;
  schoolId: number;
  fullName: string;
  email: string;
  subject: string;
  coursesTaught: Course[];
}
