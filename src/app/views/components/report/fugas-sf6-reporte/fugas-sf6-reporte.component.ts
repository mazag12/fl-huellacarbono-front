import { Component } from '@angular/core';
import { Workbook, Worksheet } from 'exceljs';
import { SF6Agrupada } from 'src/app/views/interfaces/fugas_sf6/fugas_agrub.interface';
import { ApiService } from 'src/app/views/services/api.service';
import { ExportExcelService } from 'src/app/views/services/export-excel.service';

@Component({
  selector: 'app-fugas-sf6-reporte',
  templateUrl: './fugas-sf6-reporte.component.html',
  styleUrls: ['./fugas-sf6-reporte.component.scss']
})
export class FugasSf6ReporteComponent{

  constructor( private apiService: ApiService, private exportExcelService: ExportExcelService ) {}

  public sf6Array: SF6Agrupada[] = [];

  public cabecera: string[] =
  ['Tipo de combustible',
  'Unidad',
  'Consumo (masa, volumen o energía)',
  'Valor calórico neto [TJ / unidad]',
  'Consumo [TJ]',
  'Factor de emisión de CO2 [Kg CO2/TJ]',
  'Emisiones de CO2 [t CO2]',
  'Factor de emisión de CH4 [Kg CH4/TJ]',
  'Emisiones de CH4 [t CH4] ',
  'Factor de emisión de N2O [Kg N2O / TJ] ',
  'Emisiones de N2O [t N2O]',
  'Total emisiones de GEI [tCO2e]'
  ];

  public fna: string = "Estimación de GEI de gases refrigerantes";

  public alcance: any[] = [
    {b :'Alcance', c: 'Alcance 1'},
    {b :'Fuente', c: 'Fugas de SF6'},
    {b : 'Código de categoría', c: 'A1_7'},
    {b : 'Hoja', c: 'SF6 para perdida de gas SF6 en equipos'}];

  private _workbook!: Workbook;

  ngOnInit(): void{

    //LISTA DE LOS FUGAS F6
    this.apiService.obtenerFugasf6()
    .subscribe( fugas =>  {
      fugas.forEach(fuga => {

        if (this.sf6Array.length === 0) {
          this.sf6Array.push({
            tipo_gas: fuga.tipo_fuga_sf6_id.nombre,
            ensamble: fuga.cantidad * fuga.capacidad_carga * fuga.fuga_instalacion,
            operacion: fuga.cantidad * fuga.capacidad_carga * fuga.tiempo_uso * fuga.fuga_instalacion,
            disposicion: fuga.cantidad * fuga.capacidad_carga * fuga.fraccion_disposicion * fuga.fraccion_recuperado,
            perdida: ((fuga.cantidad * fuga.capacidad_carga * fuga.fuga_instalacion) +(fuga.cantidad * fuga.capacidad_carga * fuga.tiempo_uso * fuga.fuga_instalacion)+(fuga.cantidad * fuga.capacidad_carga * fuga.fraccion_disposicion * fuga.fraccion_recuperado))/1000,
            emision: ((fuga.cantidad * fuga.capacidad_carga * fuga.fuga_instalacion) +(fuga.cantidad * fuga.capacidad_carga * fuga.tiempo_uso * fuga.fuga_instalacion)+(fuga.cantidad * fuga.capacidad_carga * fuga.fraccion_disposicion * fuga.fraccion_recuperado))*23500,
          });
        } else {
          this.sf6Array[0].ensamble += fuga.cantidad * fuga.capacidad_carga * fuga.fuga_instalacion,
          this.sf6Array[0].operacion += fuga.cantidad * fuga.capacidad_carga * fuga.tiempo_uso * fuga.fuga_instalacion;
          this.sf6Array[0].disposicion += fuga.cantidad * fuga.capacidad_carga * fuga.fraccion_disposicion * fuga.fraccion_recuperado;
          this.sf6Array[0].perdida = (this.sf6Array[0].ensamble + this.sf6Array[0].operacion  + this.sf6Array[0].disposicion)/1000;
          this.sf6Array[0].emision = this.sf6Array[0].perdida * 23500;
        }
      });
    });
  }


  exportExcel(data: SF6Agrupada[], filename: string): void {
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

  private _createtable(data: SF6Agrupada[], sheet:Worksheet ): void{
    //DISEÑO DE LOS DATOS PARA EL REPORTE--------------------------------------------
    sheet.addConditionalFormatting({
      ref: 'B9:I10',
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

    let cabecera1 = ['B','C','D','E','F','G','H','I'];

    for (let index of cabecera1) {
      if(index === "B" || index === "I"){
        sheet.getColumn(index).width = 25;
      }else{
        sheet.getColumn(index).width = 15;
      }
    }

    sheet.getCell('B9').value = "Nivel 1 de cálculo, basado en la cantidad de combustible";

    let cabecera1_nombre = [
      {cell: 'B9', value : 'Tipo de Gas'},
      {cell: 'C9', value : 'Ensamble e instalación [kg HFCs/año]'},
      {cell: 'D9', value : 'Operación [kg HFCs/año]'},
      {cell: 'E9', value : 'Disposición final de equipos [kg HFCs/año]'},
      {cell: 'F9', value : 'Perdida total del gas [tHFC/año]'},
      {cell: 'G9', value : 'Emisiones GEI [tCO2e]'},
      {cell: 'C10', value : 'A'},
      {cell: 'D10', value : 'B'},
      {cell: 'E10', value : 'C'},
      {cell: 'F10', value : 'D=A+B+C'},
      {cell: 'G10', value : 'E=(A•GWPA + B•GWPB + C•GWPC)÷ 1000'},

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
    for (let index = 11; index < (this.sf6Array.length + 11); index++) {
      sheet.getCell(cabecera1[0]+index).value = data[count].tipo_gas;
      sheet.getCell(cabecera1[1]+index).value = parseFloat(data[count].ensamble.toFixed(5));
      sheet.getCell(cabecera1[3]+index).value = parseFloat(data[count].operacion.toFixed(2));
      sheet.getCell(cabecera1[5]+index).value = parseFloat(data[count].disposicion.toFixed(2));
      sheet.getCell(cabecera1[6]+index).value = parseFloat(data[count].perdida.toFixed(4));
      sheet.getCell(cabecera1[7]+index).value = parseFloat(data[count].emision.toFixed(4));
      count++;
    }

    //lineas delas tablas
    for (let index = 9; index < (this.sf6Array.length + 9); index++) {
      cabecera1.forEach(element => {
        sheet.getCell(element + index).border = {
          top: {style:'thin', color: {argb:'000000'}},
          left: {style:'thin', color: {argb:'000000'}},
          bottom: {style:'thin', color: {argb:'000000'}},
          right: {style:'medium', color: {argb:'000000'}}
        }
      });
    }

  /////--------------------------------------------------------
    //altura
    sheet.getRow(9).height = 60;

    //ancho
    sheet.getColumn('B').width = 18;

    //combinar celda
    sheet.mergeCells('B9:B10');
    sheet.mergeCells('D9:D10');
    sheet.mergeCells('F9:F10');
  }

  exportToExcel(): void {
    this.exportExcel( this.sf6Array, 'Resfrigerantes' );
  }

}

