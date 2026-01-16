
import { Injectable } from '@angular/core';
import { Teacher } from '../interfaces/teacher';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private api = `${environment.apiUrl}/teachers`;

  constructor(private http: HttpClient) { }

  getTeachers() {
    return this.http.get<Teacher[]>(this.api);
  }

  // TODO
  // getTeacher(TeacherId: number) {
  //   if(!TeacherId) {
  //     throw new Error('Teacher ID not provided: ID is required for get Teacher.')
  //   }
  //   return this.http.get<Teacher>(`${this.api}/${TeacherId}`);
  // }

  // createTeacher(newTeacher: Teacher) {
  //   return this.http.post<Teacher>(this.api, newTeacher);
  // }

  updateTeacher(teacherToUpdate: Teacher) {
    if(!teacherToUpdate.id) {
      throw new Error('Teacher ID not provided: ID is required for update.');
    }

    return this.http.put<Teacher>(`${this.api}/${teacherToUpdate.id}`, teacherToUpdate);
  }

  deleteTeacher(teacherToDelete: Teacher) {
    if(!teacherToDelete.id) {
      throw new Error('Teacher ID not provided: ID is required for delete.');
    }

    return this.http.delete(`${this.api}/${teacherToDelete.id}`);
  }
}
