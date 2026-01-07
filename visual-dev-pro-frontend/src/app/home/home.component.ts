import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { School } from '../interfaces/school';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateDialogComponent } from '../dialogs/update-dialog/update-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  schoolDataArray: any = [];

  dataSource = new MatTableDataSource<School>();

  columnsToDisplay = ['name', 'address', 'Update', 'Delete'];

  constructor(private schoolService: SchoolService, private dialog: MatDialog) { }

  ngOnInit() {
    this.updateDataSource();
  }

  onUpdate(school: School) {
    let dialogRef = this.dialog.open(UpdateDialogComponent, {
      height: '500px',
      width: '500px',
      data: school,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateDataSource();
    });
  }

  onDelete(school: School) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '500px',
      width: '500px',
      data: school,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateDataSource();
    });
  }

  updateDataSource() {
    this.schoolService.getSchools().subscribe({
      next: (data) => {
        console.log(data);
        this.schoolDataArray = data;
        this.dataSource = new MatTableDataSource<School>(this.schoolDataArray);
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
