import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Filtro } from '../generacion-electricidad/generacion-electricidad.component';

@Component({
  selector: 'app-dialog-filter',
  templateUrl: './dialog-filter.component.html',
  styleUrls: ['./dialog-filter.component.scss']
})
export class DialogFilterComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Filtro,
  ) {}

  public  model: string= '';

  emojis = ['🐼', '💪', '🐷', '🤖', '👽', '🐥'];

  onNoClick(): void {
    this.dialogRef.close();
  }

  oka(): void {
    this.dialogRef.close();
  }

}
