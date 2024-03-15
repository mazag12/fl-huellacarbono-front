import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Filter } from '../../interface/filtro';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Filter,
  ) {}

  selectTipo: number = 0;
  fecha: string = '';
  texto: string= '';

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  oka(): void {
    const valores = {
      factura: this.texto,
      fecha: this.fecha,
      tipo: this.selectTipo,
    }
    this.dialogRef.close(valores);
  }
}
