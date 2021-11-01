import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  franja: string,
  cantFemeninoActual: string,
  medFemeninoActual: string,
  cantMasculinoActual: string,
  medMasculinoActual: string,
  cantFemeninoNuevo: string,
  medFemeninoNuevo: string,
  cantMasculinoNuevo: string,
  medMasculinoNuevo: string,
}

@Component({
  selector: 'overwrite-dialog',
  templateUrl: './overwrite-dialog.component.html',
})
export class OverwriteDialog {
  constructor(
    public dialogRef: MatDialogRef<OverwriteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
