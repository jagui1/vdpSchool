
import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private api = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get<Course[]>(this.api);
  }

  getCourse(courseId: number) {
    if(!courseId) {
      throw new Error('Course ID not provided: ID is required for get course.')
    }
    return this.http.get<Course>(`${this.api}/${courseId}`);
  }

  createCourse(newCourse: Course) {
    return this.http.post<Course>(this.api, newCourse);
  }

  updateCourse(updateCourse: Course) {
    if(!updateCourse.id) {
      throw new Error('Course ID not provided: ID is required for update.');
    }

    return this.http.put<Course>(`${this.api}/${updateCourse.id}`, updateCourse);
  }

  deleteCourse(courseToDelete: Course) {
    if(!courseToDelete.id) {
      throw new Error('Course ID not provided: ID is required for delete.');
    }

    return this.http.delete(`${this.api}/${courseToDelete.id}`);
  }
}
