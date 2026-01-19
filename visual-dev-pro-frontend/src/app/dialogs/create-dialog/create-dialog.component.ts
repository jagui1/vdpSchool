import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialog-data';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  createForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {  }

  ngOnInit() {
    const controls: Record<string, FormControl> = {};

    this.data.fields.forEach(field => {
      let validators: ValidatorFn[] = [Validators.required];

      if(field.type == 'number'){
        validators.push(Validators.pattern('^[0-9]*$'));
      }

      controls[field.label] = new FormControl(
        { value: field.value, disabled: false },
        validators
      );
    });

    this.createForm = new FormGroup(controls);
  }

  onSubmit() {
    this.dialogRef.close(this.createForm.value);
  }
}