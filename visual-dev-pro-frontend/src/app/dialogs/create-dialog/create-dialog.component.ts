import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { School } from '../../interfaces/school';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  schoolToCreate!: School;

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  constructor(public dialogRef: MatDialogRef<CreateDialogComponent>, private schoolService: SchoolService) {  }

  ngOnInit() {
    this.createForm.controls['name'];
    this.createForm.controls['address'];
    console.log(this.schoolToCreate);
  }

  onSubmit() {
    this.schoolToCreate = {
      name: this.createForm.controls['name'].value as string,
      address: this.createForm.controls['address'].value as string,
      students: [],
      teachers: [],
      courses: []
    };

    this.schoolService.createSchool(this.schoolToCreate).subscribe({
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