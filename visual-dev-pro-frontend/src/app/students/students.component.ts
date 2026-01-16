import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SchoolService } from '../services/school.service';
import { StudentService } from '../services/student.service';
import { School } from '../interfaces/school';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../interfaces/student';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from '../dialogs/update-dialog/update-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

    schoolId!: number;
    schoolName!: string;
    schoolAddress!: string;

    dataSource = new MatTableDataSource<Student>([]);
  
    columnsToDisplay = ['name', 'email', 'gradeLevel', 'Update', 'Delete'];
  
    constructor(private route: ActivatedRoute, private schoolService: SchoolService, private studentService: StudentService, private dialog: MatDialog) {}

    ngOnInit() {
      this.schoolId = Number(this.route.snapshot.paramMap.get('id'));
      this.updateDataSource();
  }

  onUpdate(studentToUpdate: Student) {
    let dialogRef = this.dialog.open(UpdateDialogComponent, {
      height: '500px',
      width: '500px',
      data: {
        title: 'Update Student',
        fields: [
          { label: 'Name', value: studentToUpdate.fullName },
          { label: 'Email', value: studentToUpdate.email },
          { label: 'Grade', value: studentToUpdate.gradeLevel, type: 'number' }
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        studentToUpdate.fullName = result.Name as string;
        studentToUpdate.email = result.Email as string;
        studentToUpdate.gradeLevel = result.Grade as number;

        this.studentService.updateStudent(studentToUpdate).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('Student updated successfully');
            this.updateDataSource();
          }
        });
      }
    });
  }

  onDelete(studentToDelete: Student) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '500px',
      width: '500px',
      data: {
        title: 'Delete Student',
        fields: [
          { label: 'Name', value: studentToDelete.fullName },
          { label: 'Email', value: studentToDelete.email },
          { label: 'Grade', value: studentToDelete.gradeLevel }
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.studentService.deleteStudent(studentToDelete).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('Student deleted successfully');
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
        console.log(data.students);
        this.dataSource.data = data.students;
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
