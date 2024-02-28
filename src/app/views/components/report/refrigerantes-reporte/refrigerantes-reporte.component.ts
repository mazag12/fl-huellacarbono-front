import { Component} from '@angular/core';
import { ApiService } from 'src/app/views/services/api.service';
import { RefrigeranteAgrupada } from 'src/app/views/interfaces';
import { Workbook, Worksheet } from 'exceljs';
import { ExportExcelService } from '../../../services/export-excel.service';


@Component({
  selector: 'app-refrigerantes-reporte',
  templateUrl: './refrigerantes-reporte.component.html',
  styleUrls: ['./refrigerantes-reporte.component.scss']
})
export class RefrigerantesReporteComponent{
  constructor( private apiService: ApiService, private exportExcelService: ExportExcelService ) {}

  public refrigeranteArray: RefrigeranteAgrupada[] = [];

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
    {b :'Fuente', c: 'Refrigerantes'},
    {b : 'Código de categoría', c: 'A1_4'},
    {b : 'Hoja', c: 'HFC para Refrigerantes'}];

  private _workbook!: Workbook;

  ngOnInit(): void{

    //LISTA DE LOS COMBUSTIBLES
    this.apiService.obtenerRefrigerante()
    .subscribe( refrigerantes =>  {
      refrigerantes.forEach(refrigerante => {
        //LISTA DE LOS DATOS DE ELECTRICIDAD
        this.refrigeranteArray.push({
          tipogas1: refrigerante.tipo_refrigerante.nombre,
          ensamble: refrigerante.cantidad * refrigerante.capacidad_carga * refrigerante.fuga_instalacion,
          tipogas2: refrigerante.tipo_refrigerante.nombre,
          operacion: refrigerante.cantidad * refrigerante.capacidad_carga * refrigerante.tiempo_uso * refrigerante.porcentaje_fuga,
          tipogas3: refrigerante.tipo_refrigerante.nombre,
          disposicion: refrigerante.cantidad * refrigerante.capacidad_carga * refrigerante.fraccion_disposicion * refrigerante.fraccion_recuperacion,
          perdida: refrigerante.tipo_refrigerante.nombre.startsWith("HCFC") === true ? 0: ((refrigerante.cantidad * refrigerante.capacidad_carga * refrigerante.fuga_instalacion) +(refrigerante.cantidad * refrigerante.capacidad_carga * refrigerante.tiempo_uso * refrigerante.porcentaje_fuga)+(refrigerante.cantidad * refrigerante.capacidad_carga * refrigerante.fraccion_disposicion * refrigerante.fraccion_recuperacion))/1000,
          emision: refrigerante.tipo_refrigerante.nombre.startsWith("HCFC") === true ? 0: ((refrigerante.cantidad * refrigerante.capacidad_carga * refrigerante.fuga_instalacion) +(refrigerante.cantidad * refrigerante.capacidad_carga * refrigerante.tiempo_uso * refrigerante.porcentaje_fuga)+(refrigerante.cantidad * refrigerante.capacidad_carga * refrigerante.fraccion_disposicion * refrigerante.fraccion_recuperacion))/1000,
        });
      });
    });
  }


  exportExcel(data: RefrigeranteAgrupada[], filename: string): void {
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

  private _createtable(data: RefrigeranteAgrupada[], sheet:Worksheet ): void{
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
      {cell: 'D9', value : 'Tipo de Gas'},
      {cell: 'E9', value : 'Operación [kg HFCs/año]'},
      {cell: 'F9', value : 'Tipo de Gas'},
      {cell: 'G9', value : 'Disposición final de equipos [kg HFCs/año]'},
      {cell: 'H9', value : 'Perdida total del gas [tHFC/año]'},
      {cell: 'I9', value : 'Emisiones GEI [tCO2e]'},
      {cell: 'C10', value : 'A'},
      {cell: 'E10', value : 'B'},
      {cell: 'G10', value : 'C'},
      {cell: 'H10', value : 'D=A+B+C'},
      {cell: 'I10', value : 'E=(A•GWPA + B•GWPB + C•GWPC)÷ 1000'},

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
    for (let index = 11; index < (this.refrigeranteArray.length + 11); index++) {
      sheet.getCell(cabecera1[0]+index).value = data[count].tipogas1;
      sheet.getCell(cabecera1[1]+index).value = parseFloat(data[count].ensamble.toFixed(5));
      sheet.getCell(cabecera1[2]+index).value = data[count].tipogas2;
      sheet.getCell(cabecera1[3]+index).value = parseFloat(data[count].operacion.toFixed(2));
      sheet.getCell(cabecera1[4]+index).value = data[count].tipogas3;
      sheet.getCell(cabecera1[5]+index).value = parseFloat(data[count].disposicion.toFixed(2));
      sheet.getCell(cabecera1[6]+index).value = parseFloat(data[count].perdida.toFixed(4));
      sheet.getCell(cabecera1[7]+index).value = parseFloat(data[count].emision.toFixed(4));
      count++;
    }

    //lineas delas tablas
    for (let index = 9; index < (this.refrigeranteArray.length + 11); index++) {
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
    this.exportExcel( this.refrigeranteArray, 'Resfrigerantes' );
  }
}
