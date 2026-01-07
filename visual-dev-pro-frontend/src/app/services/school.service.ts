
import { Injectable } from '@angular/core';
import { School } from '../interfaces/school';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  getSchools() {
    return this.http.get<School>('http://localhost:5045/vdpschool/schools');
  }

  createSchool(newSchool: School) {
    return this.http.post<School>('http://localhost:5045/vdpschool/schools', newSchool);
  }

  updateSchool(id: number, updateSchool: School) {
    return this.http.put<School>(`http://localhost:5045/vdpschool/${id}`, updateSchool);
  }

  deleteSchool(id: number) {
    return this.http.delete(`http://localhost:5045/vdpschool/${id}`);
  }
}
