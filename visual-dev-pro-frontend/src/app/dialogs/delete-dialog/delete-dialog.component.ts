import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { School } from '../../interfaces/school';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  schoolToDelete!: School;

  deleteForm = new FormGroup({
    name: new FormControl({ value: '', disabled: true }),
    address: new FormControl({ value: '', disabled: true }),
  });

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: School, private schoolService: SchoolService) {
    this.schoolToDelete = data;
  }

  ngOnInit() {
    this.deleteForm.controls['name'].setValue(this.schoolToDelete.name);
    this.deleteForm.controls['address'].setValue(this.schoolToDelete.address);
  }

  onSubmit() {
    this.schoolService.deleteSchool(this.schoolToDelete).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('School deleted successfully');
        this.dialogRef.close(true);
      }
    });
  }

}