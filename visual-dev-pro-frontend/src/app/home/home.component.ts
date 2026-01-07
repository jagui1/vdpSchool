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

  onCreate(){
    let dialogRef = this.dialog.open(CreateDialogComponent, {
      height: '500px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.updateDataSource();
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
