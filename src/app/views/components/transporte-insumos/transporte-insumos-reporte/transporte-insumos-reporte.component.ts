import { Component } from '@angular/core';
import { Workbook, Worksheet } from 'exceljs';
import { TransporteInsumosGrub } from 'src/app/views/interfaces';
import { ApiService } from 'src/app/views/services/api.service';
import { ExportExcelService } from 'src/app/views/services/export-excel.service';

@Component({
  selector: 'app-transporte-insumos-reporte',
  templateUrl: './transporte-insumos-reporte.component.html',
  styleUrls: ['./transporte-insumos-reporte.component.scss']
})
export class TransporteInsumosReporteComponent {
  constructor( private apiService: ApiService, private exportExcelService: ExportExcelService) {}

  public transporteinsumosArray: TransporteInsumosGrub[] = [];


  public fna: string = "Estimación de GEI de Agua potable";

  public alcance: any[] = [
    {b :'Alcance', c: 'Alcance 3'},
    {b :'Fuente', c: 'Consumo de agua potable de la red pública (en m3)'},
    {b : 'Código de categoría', c: 'A3_5'},
    {b : 'Hoja', c: '1 de 1 (CO2, para consumo de agua potable)'}];


  private _workbook!: Workbook;

  // ngOnInit(): void{
  //   this.apiService.obtenerTransporteInsumo()
  //   .subscribe( transporteinsumos =>  {
  //     transporteinsumos.forEach(transporteinsumo => {
  //       //LISTA DE LOS DATOS DE transporteinsumo
  //       let encontrado = false;
  //         for (let i = 0; i < this.transporteinsumosArray.length; i++) {
  //           if (this.transporteinsumosArray[i].Descripcion === transporteinsumo.area) {
  //             this.transporteinsumosArray[i].consumo += transporteinsumo.cantidad;
  //             this.transporteinsumosArray[i].factor = 0.34;
  //             this.transporteinsumosArray[i].emision = (this.transporteinsumosArray[i].consumo * 0.34)/100;
  //             encontrado = true;
  //             break;
  //           }
  //         }
  //       if(encontrado ===  false){
  //         this.transporteinsumosArray.push({
  //           Descripcion: transporteinsumo.area,
  //           consumo: transporteinsumo.cantidad,
  //           factor: 0.34,
  //           emision: (transporteinsumo.cantidad * 0.34)/100
  //         });
  //       }
  //     });
  //   });
  // }

  // calcularEmision(): number {
  //   let suma = 0;
  //   for (let datos of this.transporteinsumosArray) {
  //     suma += datos.emision;
  //   }
  //   return suma;
  // }

  // exportExcel(data: TransporteInsumosGrub[], filename: string): void {
  //   //iniciacion de la creacion del excel
  //   this._workbook = new Workbook();

  //   //nombre del creador
  //   this._workbook.creator = "Footloose";

  //   //nombre de la hoja y el color
  //   const sheet  = this._workbook.addWorksheet(filename,  {properties:{tabColor:{argb:'FF00FF00'}}});

  //   //estructura de los datos en excel
  //   this._createtable(data, sheet);



  //   //se envia para crear el excecel
  //   this.exportExcelService.generateExcel(this._workbook, sheet, filename, this.fna, this.alcance);
  // }

  // private _createtable(data: TransporteInsumosGrub[], sheet:Worksheet ): void{

  //   //DISEÑO DE LOS DATOS PARA EL REPORTE--------------------------------------------

  //   sheet.addConditionalFormatting({
  //     ref: 'B10:G11',
  //     rules: [
  //       {
  //         type: 'expression',
  //         priority: 1,
  //         formulae: ['MOD(ROW()+COLUMN(),1)=0'],
  //         style: {
  //           fill: {
  //             type: 'pattern' ,
  //             pattern: 'solid',
  //             bgColor: {argb: 'B0DAF7'}
  //           }
  //         },
  //       }
  //     ]
  //   });

  //   let cabecera1 = ['B','C','D','E','F','G'];

  //   for (let index of cabecera1) {
  //     if(index === "B" || index === "G"){
  //       sheet.getColumn(index).width = 25;
  //     }else{
  //       sheet.getColumn(index).width = 15;
  //     }
  //   }

  //   sheet.getCell('B9').value = "Consumo de agua potable de la red pública (en m3)";

  //   let cabecera1_nombre = [
  //     {cell: 'B10', value : 'Descripción'},
  //     {cell: 'E10', value : 'Consumo (volumen ) [m3]'},
  //     {cell: 'F10', value : 'Factor de emisión de CO2 [KgCO2/m3]'},
  //     {cell: 'G10', value : 'Emisiones GEI [tCO2e]'},
  //     {cell: 'E11', value : 'A'},
  //     {cell: 'F11', value : 'B'},
  //     {cell: 'G11', value : 'C=A•B÷103'},
  //   ]

  //   cabecera1_nombre.forEach(element => {
  //     let  cell = sheet.getCell(element.cell);
  //     cell.value = element.value;
  //     cell.alignment = {
  //       wrapText: true,
  //       horizontal: 'center',
  //       vertical: 'middle'
  //     };

  //   });

  //   let count = 0;
  //   for (let index = 12; index < this.transporteinsumosArray.length + 13; index++) {
  //     sheet.getCell(cabecera1[0]+index).value = data[count].Descripcion;
  //     sheet.getCell(cabecera1[1]+index).value = parseFloat(data[count].consumo.toFixed(2));
  //     sheet.getCell(cabecera1[2]+index).value = parseFloat(data[count].factor.toFixed(2));
  //     sheet.getCell(cabecera1[3]+index).value = parseFloat(data[count].emision.toFixed(2));
  //     count++;
  //   }

  //   //lineas delas tablas
  //   for (let index = 12; index < this.transporteinsumosArray.length + 14; index++) {
  //     cabecera1.forEach(element => {
  //       sheet.getCell(element + index).border = {
  //         top: {style:'thin', color: {argb:'000000'}},
  //         left: {style:'thin', color: {argb:'000000'}},
  //         bottom: {style:'thin', color: {argb:'000000'}},
  //         right: {style:'medium', color: {argb:'000000'}}
  //       }
  //     });
  //   }

  //   sheet.getCell('B'+ this.transporteinsumosArray.length + 14 ).value = "Total";

  //   sheet.getCell('G'+ this.transporteinsumosArray.length + 14).value = this.calcularEmision();

  //   sheet.getCell('F'+ this.transporteinsumosArray.length + 14).fill = {
  //     type: 'pattern',
  //     pattern:'solid',
  //     fgColor:{argb:'B0DAF7'},
  //   };

  // /////--------------------------------------------------------
  //   //altura
  //   sheet.getRow(10).height = 31;
  //   sheet.getRow(2).height = 33;

  //   //combinar celda
  //   sheet.mergeCells('B10:D11');

  // }

  // exportToExcel(): void {
  //   this.exportExcel( this.transporteinsumosArray, 'Consumo_Papel' );
  // }

}
