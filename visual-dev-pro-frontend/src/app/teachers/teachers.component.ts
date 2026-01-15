import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SchoolService } from '../services/school.service';
import { TeacherService } from '../services/teacher.service';
import { School } from '../interfaces/school';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Teacher } from '../interfaces/teacher';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

    schoolId!: number;
    schoolName!: string;
    schoolAddress!: string;

    dataSource = new MatTableDataSource<Teacher>([]);
  
    columnsToDisplay = ['name', 'email', 'subject', 'Update', 'Delete'];
  
    constructor(private route: ActivatedRoute, private schoolService: SchoolService, private teacherService: TeacherService, private dialog: MatDialog) {}

    ngOnInit() {
      this.schoolId = Number(this.route.snapshot.paramMap.get('id'));
      this.updateDataSource();
  }

  onUpdate(teacher: Teacher) {
    // TODO 
  }

  onDelete(teacherToDelete: Teacher) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '500px',
      width: '500px',
      data: {
        title: 'Delete Teacher',
        fields: [
          { label: 'Name', value: teacherToDelete.fullName },
          { label: 'Email', value: teacherToDelete.email },
          { label: 'Subject', value: teacherToDelete.subject }
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.teacherService.deleteTeacher(teacherToDelete).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('Teacher deleted successfully');
            this.updateDataSource();
          }
        });
      }
    });
  }

  onCreate(){
    // TODO
  }

  updateDataSource() {
    this.schoolService.getSchool(this.schoolId).subscribe({
      next: (data: School) => {
        console.log(data.teachers);
        this.dataSource.data = data.teachers;
        this.schoolName = data.name ? data.name : "Cannot find School Name";
        this.schoolAddress = data.address ? data.address : "Cannot find School Address";
        console.log(this.dataSource);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Data loaded successfully');
      }
    });
  }
}
