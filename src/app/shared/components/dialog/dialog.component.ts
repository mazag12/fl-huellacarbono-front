import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Filtro } from '../../interface/filtro';
declare var jQuery: any;

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

  ngOnInit(): void {
    jQuery('.calendar').calendar();
  }

  selected!: Date | null;


  foods = [
    {value: 'Tipo 1', viewValue: 'Combustible 98'},
    {value: 'Tipo 2', viewValue: 'Gasolina'},
    {value: 'Tipo 3', viewValue: 'Aceite'},
  ];

  onNoClick(): void {
    this.dialogRef.close();
  }

  oka(): void {
    this.dialogRef.close();
  }
}
