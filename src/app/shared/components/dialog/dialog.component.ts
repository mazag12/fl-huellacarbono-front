import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Filtro } from '../../interface/filtro';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Filtro,
  ) {}

  selectTipo: number = 0;
  selectUnidad: number = 0;
  fecha: string = '';
  texto: string= '';

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  oka(): void {
    const valores = {
      input: this.texto,
      fecha: this.fecha,
      tipo: this.selectTipo,
      unidad: this.selectUnidad
    }
    this.dialogRef.close(valores);
  }
}
