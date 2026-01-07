import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { School } from '../../interfaces/school';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  updateSchool!: School;
  schoolToUpdate!: School;

  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  constructor(public dialogRef: MatDialogRef<UpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: School, private schoolService: SchoolService) {
    this.schoolToUpdate = data;
  }

  ngOnInit() {
    this.updateForm.controls['name'].setValue(this.schoolToUpdate.name);
    this.updateForm.controls['address'].setValue(this.schoolToUpdate.address);
    console.log(this.schoolToUpdate);
  }

  onSubmit() {
    this.updateSchool = {
      id: this.schoolToUpdate.id,
      name: this.updateForm.controls['name'].value as string,
      address: this.updateForm.controls['address'].value as string,
      students: this.schoolToUpdate.students,
      teachers: this.schoolToUpdate.teachers,
      courses: this.schoolToUpdate.courses
    };

    this.schoolService.updateSchool(this.updateSchool).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('School updated successfully');
      }
    });

    this.dialogRef.close();
  }
}