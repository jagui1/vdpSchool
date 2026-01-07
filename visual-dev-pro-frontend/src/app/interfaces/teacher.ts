import { Course } from './course';

export interface Teacher {
  id: number;
  fullName: string;
  email: string;
  subject: string;
  coursesTaught: Course[];
}
