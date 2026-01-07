
import { Injectable } from '@angular/core';
import { School } from '../interfaces/school';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  getSchools() {
    return this.http.get<School[]>('http://localhost:5045/vdpschool/schools');
  }

  createSchool(newSchool: School) {
    return this.http.post<School>('http://localhost:5045/vdpschool/schools', newSchool);
  }

  updateSchool(updateSchool: School) {
    if(!updateSchool.id) {
      throw new Error('School ID not found: ID is required for update.');
    }

    return this.http.put<School>(`http://localhost:5045/vdpschool/${updateSchool.id}`, updateSchool);
  }

  deleteSchool(schoolToDelete: School) {
    if(!schoolToDelete.id) {
      throw new Error('School ID not found: ID is required for delete.');
    }

    return this.http.delete(`http://localhost:5045/vdpschool/${schoolToDelete.id}`);
  }
}
