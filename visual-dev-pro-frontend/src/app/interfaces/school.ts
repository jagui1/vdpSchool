import { Student } from './student';
import { Teacher } from './teacher';
import { Course } from './course';

export interface School {
  id?: number;
  name: string;
  address: string;
  students: Student[];
  teachers: Teacher[];
  courses: Course[];
}
