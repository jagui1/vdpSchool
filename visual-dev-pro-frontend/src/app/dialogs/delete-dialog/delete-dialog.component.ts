import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialog-data';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  deleteForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    const controls: Record<string, FormControl> = {};

    this.data.fields.forEach(field => {
      controls[field.label] = new FormControl({
        value: field.value,
        disabled: true
      });
    });

    this.deleteForm = new FormGroup(controls);
  }

  onSubmit() {
    this.dialogRef.close(true);
  }

}