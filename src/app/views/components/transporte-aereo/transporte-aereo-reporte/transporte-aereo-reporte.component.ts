import {Component } from '@angular/core';
import { Workbook, Worksheet } from 'exceljs';
import { TransporteAereoGrub } from 'src/app/views/interfaces';
import { ApiService } from 'src/app/views/services/api.service';
import { ExportExcelService } from 'src/app/views/services/export-excel.service';

@Component({
  selector: 'app-transporte-aereo-reporte',
  templateUrl: './transporte-aereo-reporte.component.html',
  styleUrls: ['./transporte-aereo-reporte.component.scss']
})
export class TransporteAereoReporteComponent{
  constructor( private apiService: ApiService, private exportExcelService: ExportExcelService ) {}

  public TransporteAereoArray: TransporteAereoGrub[] = [];

  public fna: string = "Estimación de GEI de Transporte de Personal";

  public alcance: any[] = [
    {b :'Alcance', c: 'Alcance 3'},
    {b :'Fuente', c: 'Transporte aéreo'},
    {b : 'Código de categoría', c: 'A3_2'},
    {b : 'Hoja', c: '1 de 1 (CO2, CH4 y N2O para emisione de transporte de persona)'}];

  private _workbook!: Workbook;

  ngOnInit(): void{

    let comparacion = 0;

    this.apiService.obtenerTipoTransporteAereo()
    .subscribe( tipo =>  {
      tipo.forEach(tipos => {
        //LISTA DE LOS COMBUSTIBLES
        this.TransporteAereoArray.push({
          viaje_distinta: tipos.nombre,
          valor: tipos.valor,
          personas: 0,
          distancia_recorrido: 0,
          total_recorrido: 0,
          factor: tipos.co2,
          emision: 0,
          total: 0,
        });
        this.apiService.obtenerTransporteAereo()
        .subscribe( transportes =>  {
          transportes.forEach(trabajo => {
           // LISTA DE LOS DATOS DE ELECTRICIDAD
            if(comparacion === 1 && 1600 >= trabajo.distancia){
              this.TransporteAereoArray[0].personas += trabajo.numero_personas;
              this.TransporteAereoArray[0].distancia_recorrido += trabajo.distancia;
              this.TransporteAereoArray[0].total_recorrido +=  trabajo.numero_personas * trabajo.distancia;
              this.TransporteAereoArray[0].emision = this.TransporteAereoArray[0].total_recorrido * this.TransporteAereoArray[0].factor;
              this.TransporteAereoArray[0].total = this.TransporteAereoArray[0].emision/1000;
            }else if(comparacion === 2 && 1600 < trabajo.distancia && 3700 >= trabajo.distancia){
              this.TransporteAereoArray[1].personas += trabajo.numero_personas;
              this.TransporteAereoArray[1].distancia_recorrido += trabajo.distancia;
              this.TransporteAereoArray[1].total_recorrido +=  trabajo.numero_personas * trabajo.distancia;
              this.TransporteAereoArray[1].emision = this.TransporteAereoArray[0].total_recorrido * this.TransporteAereoArray[0].factor;
              this.TransporteAereoArray[1].total = this.TransporteAereoArray[0].emision/1000;
            }else if(comparacion === 3 && 3700 < trabajo.distancia){
              this.TransporteAereoArray[2].personas += trabajo.numero_personas;
              this.TransporteAereoArray[2].distancia_recorrido += trabajo.distancia;
              this.TransporteAereoArray[2].total_recorrido +=  trabajo.numero_personas * trabajo.distancia;
              this.TransporteAereoArray[2].emision = this.TransporteAereoArray[0].total_recorrido * this.TransporteAereoArray[0].factor;
              this.TransporteAereoArray[2].total = this.TransporteAereoArray[0].emision/1000;
            }
          });
        });
        comparacion++;
      })
    });
  }

  exportExcel(data: TransporteAereoGrub[], filename: string): void {
    //iniciacion de la creacion del excel
    this._workbook = new Workbook();

    //nombre del creador
    this._workbook.creator = "Footloose";

    //nombre de la hoja y el color
    const sheet  = this._workbook.addWorksheet(filename,  {properties:{tabColor:{argb:'FF00FF00'}}});

    //estructura de los datos en excel
    this._createtable(data, sheet);

    //se envia para crear el excecel
    this.exportExcelService.generateExcel(this._workbook, sheet, filename, this.fna, this.alcance);

  }

  private _createtable(data: TransporteAereoGrub[], sheet:Worksheet ): void{

    //DISEÑO DE LOS DATOS PARA EL REPORTE--------------------------------------------
    sheet.addConditionalFormatting({
      ref: 'A9:H9',
      rules: [
        {
          type: 'expression',
          priority: 1,
          formulae: ['MOD(ROW()+COLUMN(),1)=0'],
          style: {
            fill: {
              type: 'pattern' ,
              pattern: 'solid',
              bgColor: {argb: 'FFFABB'}
            }
          },
        }
      ]
    });

    sheet.addConditionalFormatting({
      ref: 'B14:B16',
      rules: [
        {
          type: 'expression',
          priority: 1,
          formulae: ['MOD(ROW()+COLUMN(),1)=0'],
          style: {
            fill: {
              type: 'pattern' ,
              pattern: 'solid',
              bgColor: {argb: 'DCE6F1'}
            }
          },
        }
      ]
    });

    sheet.addConditionalFormatting({
      ref: 'B12:H13',
      rules: [
        {
          type: 'expression',
          priority: 1,
          formulae: ['MOD(ROW()+COLUMN(),1)=0'],
          style: {
            fill: {
              type: 'pattern' ,
              pattern: 'solid',
              bgColor: {argb: 'B0DAF7'}
            }
          },
        }
      ]
    });

    let cabecera1 = ['B','C','D','E','F','G','H'];

    for (let index of cabecera1) {
      if(index === "B" || index === "H"){
        sheet.getColumn(index).width = 29;
      }else{
        sheet.getColumn(index).width = 15;
      }
    }

    sheet.getCell('B9').value = "Transporte de Personal: Pagado por la empresa";

    let cabecera1_nombre = [
      {cell: 'B12', value : 'Tipo de Gas'},
      {cell: 'C12', value : 'Personas [personas/modo]'},
      {cell: 'D12', value : 'Distancia recorrida [Km/año]'},
      {cell: 'E12', value : 'Total recorrido [Km•personas/año]'},
      {cell: 'F12', value : 'Factor de emisón [KgCO2/Km•persona]'},
      {cell: 'G12', value : 'Emisiones GEI [KgCO2]'},
      {cell: 'H12', value : 'Emisiones GEI [tCO2e]'},
      {cell: 'C13', value : 'A'},
      {cell: 'D13', value : 'B'},
      {cell: 'E13', value : 'C=Σi(Ai•Bi)'},
      {cell: 'F13', value : 'D'},
      {cell: 'G13', value : 'E=D•C'},
      {cell: 'H13', value : 'F=E•103'}
    ]

    cabecera1_nombre.forEach(element => {
      let  cell = sheet.getCell(element.cell);
      cell.value = element.value;
      cell.alignment = {
        wrapText: true,
        horizontal: 'center',
        vertical: 'middle'
      };

    });

    let count = 0;
    for (let index = 14; index < (this.TransporteAereoArray.length + 14); index++) {
      sheet.getCell(cabecera1[0]+index).value = data[count].viaje_distinta;
      sheet.getCell(cabecera1[1]+index).value = parseFloat(data[count].personas.toFixed(0));
      sheet.getCell(cabecera1[2]+index).value = parseFloat(data[count].distancia_recorrido.toFixed(5));
      sheet.getCell(cabecera1[3]+index).value = parseFloat(data[count].total_recorrido.toFixed(2));
      sheet.getCell(cabecera1[4]+index).value = parseFloat(data[count].factor.toFixed(2));
      sheet.getCell(cabecera1[5]+index).value = parseFloat(data[count].emision.toFixed(2));
      sheet.getCell(cabecera1[6]+index).value = parseFloat(data[count].total.toFixed(2));
      count++;
    }

    //lineas delas tablas
    for (let index = 14; index < (this.TransporteAereoArray.length + 14); index++) {
      cabecera1.forEach(element => {
        sheet.getCell(element + index).border = {
          top: {style:'thin', color: {argb:'000000'}},
          left: {style:'thin', color: {argb:'000000'}},
          bottom: {style:'thin', color: {argb:'000000'}},
          right: {style:'medium', color: {argb:'000000'}}
        }
      });
    }

  ///--------------------------------------------------------
    //altura
    sheet.getRow(9).height = 45;
    sheet.getRow(12).height = 29;

    //combinar celda
    sheet.mergeCells('B12:B13');
  }

  exportToExcel(): void {
    this.exportExcel( this.TransporteAereoArray, 'Trnasporte_Aereo' );
  }
}
