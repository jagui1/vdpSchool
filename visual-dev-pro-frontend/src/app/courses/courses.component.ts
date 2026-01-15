import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SchoolService } from '../services/school.service';
import { School } from '../interfaces/school';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from '../services/course.service';
import { Course } from '../interfaces/course';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';

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

  onDelete(courseToDelete: Course) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '500px',
      width: '500px',
      data: {
        title: 'Delete Course',
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
    // TODO
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
