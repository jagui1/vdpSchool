
import { Injectable } from '@angular/core';
import { School } from '../interfaces/school';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private api = `${environment.apiUrl}/schools`;

  constructor(private http: HttpClient) { }

  getSchools() {
    return this.http.get<School[]>(this.api);
  }

  getSchool(schoolId: number) {
    if(!schoolId) {
      throw new Error('School ID not provided: ID is required for get school.')
    }
    return this.http.get<School>(`${this.api}/${schoolId}`);
  }

  createSchool(newSchool: School) {
    return this.http.post<School>(this.api, newSchool);
  }

  updateSchool(updateSchool: School) {
    if(!updateSchool.id) {
      throw new Error('School ID not provided: ID is required for update.');
    }

    return this.http.put<School>(`${this.api}/${updateSchool.id}`, updateSchool);
  }

  deleteSchool(schoolToDelete: School) {
    if(!schoolToDelete.id) {
      throw new Error('School ID not provided: ID is required for delete.');
    }

    return this.http.delete(`${this.api}/${schoolToDelete.id}`);
  }
}
