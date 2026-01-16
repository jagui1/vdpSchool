import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialog-data';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  updateForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    const controls: Record<string, FormControl> = {};

    this.data.fields.forEach(field => {
      controls[field.label] = new FormControl({
        value: field.value,
        disabled: false
      });
    });

    this.updateForm = new FormGroup(controls);
  }

  onSubmit() {
    this.dialogRef.close(this.updateForm.value);
  }
}