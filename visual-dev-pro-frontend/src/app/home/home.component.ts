import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { School } from '../interfaces/school';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateDialogComponent } from '../dialogs/update-dialog/update-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { CreateDialogComponent } from '../dialogs/create-dialog/create-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataSource = new MatTableDataSource<School>([]);

  columnsToDisplay = ['name', 'address', 'Courses', 'Teachers', 'Students', 'Update', 'Delete'];

  constructor(private schoolService: SchoolService, private dialog: MatDialog) { }

  ngOnInit() {
    this.updateDataSource();
  }

  onUpdate(schoolToUpdate: School) {
    let dialogRef = this.dialog.open(UpdateDialogComponent, {
      height: '500px',
      width: '500px',
      data: {
        title: 'Update School',
        fields: [
          { label: 'Name', value: schoolToUpdate.name },
          { label: 'Address', value: schoolToUpdate.address }
        ]
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        schoolToUpdate.name = result.Name as string;
        schoolToUpdate.address = result.Address as string;
        console.log("School to update");
        console.log(schoolToUpdate);

        this.schoolService.updateSchool(schoolToUpdate).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('School updated successfully');
            this.updateDataSource();
          }
        });
      }
    });
  }

  onDelete(schoolToDelete: School) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '500px',
      width: '500px',
      data: {
        title: 'Delete School',
        fields: [
          { label: 'Name', value: schoolToDelete.name },
          { label: 'Address', value: schoolToDelete.address }
        ]
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.schoolService.deleteSchool(schoolToDelete).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('School deleted successfully');
            this.updateDataSource();
          }
        });
      }
    });
  }

  onCreate(){
    let dialogRef = this.dialog.open(CreateDialogComponent, {
      height: '500px',
      width: '500px',
      data: {
        title: 'Create School',
        fields: [
          { label: 'Name', value: '' },
          { label: 'Address', value: '' }
        ]
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

        this.schoolService.createSchool({
          name: result.Name as string,
          address: result.Address as string,
          students: [],
          teachers: [],
          courses: []
        }).subscribe({

          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('School updated successfully');
            this.updateDataSource();
          }
        });      
      }
    });
  }

  updateDataSource() {
    this.schoolService.getSchools().subscribe({
      next: (data: School[]) => {
        console.log(data);
        this.dataSource.data = data;
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
