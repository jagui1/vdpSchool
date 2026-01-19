import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SchoolService } from '../services/school.service';
import { School } from '../interfaces/school';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from '../services/course.service';
import { Course } from '../interfaces/course';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { InputDialogComponent } from '../dialogs/input-dialog/input-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

    schoolId!: number;
    schoolName!: string;
    schoolAddress!: string;

    dataSource = new MatTableDataSource<Course>([]);
  
    columnsToDisplay = ['name', 'credits', 'Update', 'Delete'];
  
    constructor(private route: ActivatedRoute, private schoolService: SchoolService, private courseService: CourseService, private dialog: MatDialog) {}

    ngOnInit() {
      this.schoolId = Number(this.route.snapshot.paramMap.get('id'));
      this.updateDataSource();
  }

  onUpdate(courseToUpdate: Course) {
    let dialogRef = this.dialog.open(InputDialogComponent, {
      height: '500px',
      width: '500px',
      data: {
        title: 'Update',
        entity: 'Course',
        fields: [
          { label: 'Name', value: courseToUpdate.courseName },
          { label: 'Credits', value: courseToUpdate.credits, type: 'number' }
        ]
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        courseToUpdate.courseName = result.Name as string;
        courseToUpdate.credits = result.Credits as number;

        this.courseService.updateCourse(courseToUpdate).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('Course updated successfully');
            this.updateDataSource();
          }
        });
      }
    });  
  }

  onDelete(courseToDelete: Course) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '500px',
      width: '500px',
      data: {
        title: 'Delete',
        entity: 'Course',
        fields: [
          { label: 'Name', value: courseToDelete.courseName },
          { label: 'Credits', value: courseToDelete.credits }
        ]
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.courseService.deleteCourse(courseToDelete).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('Course deleted successfully');
            this.updateDataSource();
          }
        });
      }
    });
  }

  onCreate(){
    let dialogRef = this.dialog.open(InputDialogComponent, {
      height: '500px',
      width: '500px',
      data: {
        title: 'Create',
        entity: 'Course',
        fields: [
          { label: 'Name', value: '' },
          { label: 'Credits', value: '', type: 'number' }
        ]
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

        this.courseService.createCourse({
          schoolId: this.schoolId,
          courseName: result.Name as string,
          credits: result.Credits as number
        }).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('Course created successfully');
            this.updateDataSource();
          }
        });
      }
    });  
  }


  updateDataSource() {
    this.schoolService.getSchool(this.schoolId).subscribe({
      next: (data: School) => {
        console.log(data.courses);
        this.dataSource.data = data.courses;
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
