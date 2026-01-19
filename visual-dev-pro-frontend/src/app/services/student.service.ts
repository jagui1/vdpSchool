
import { Injectable } from '@angular/core';
import { Student } from '../interfaces/student';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private api = `${environment.apiUrl}/students`;

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get<Student[]>(this.api);
  }

  // TODO
  // getStudent(StudentId: number) {
  //   if(!StudentId) {
  //     throw new Error('Student ID not provided: ID is required for get Student.')
  //   }
  //   return this.http.get<Student>(`${this.api}/${StudentId}`);
  // }

  createStudent(newStudent: Student) {
    return this.http.post<Student>(this.api, newStudent);
  }

  updateStudent(studentToUpdate: Student) {
    if(!studentToUpdate.id) {
      throw new Error('Student ID not provided: ID is required for update.');
    }

    return this.http.put<Student>(`${this.api}/${studentToUpdate.id}`, studentToUpdate);
  }

  deleteStudent(studentToDelete: Student) {
    if(!studentToDelete.id) {
      throw new Error('Student ID not provided: ID is required for delete.');
    }

    return this.http.delete(`${this.api}/${studentToDelete.id}`);
  }
}
