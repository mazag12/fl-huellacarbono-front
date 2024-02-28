import { Component } from '@angular/core';
import { Workbook, Worksheet } from 'exceljs';
import { ConsumoSeinAgrupada } from 'src/app/views/interfaces';
import { ApiService } from 'src/app/views/services/api.service';
import { ExportExcelService } from 'src/app/views/services/export-excel.service';

@Component({
  selector: 'app-consumo-sein-reporte',
  templateUrl: './consumo-sein-reporte.component.html',
  styleUrls: ['./consumo-sein-reporte.component.scss']
})
export class ConsumoSeinReporteComponent {
  constructor( private apiService: ApiService, private exportExcelService: ExportExcelService ) {}

  public consumoSeinArray: ConsumoSeinAgrupada[] = [];

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

  public fna: string = "Estimación de GEI de energía electrica";

  public alcance: any[] = [
    {b :'Alcance', c: 'Alcance 2'},
    {b :'Fuente', c: 'Consumo de electricidad del SEIN (en KWh)'},
    {b : 'Código de categoría', c: 'A2_1'},
    {b : 'Hoja', c: 'CO2, CH4 y N2O para consumo de energía eléctrica'}];

  private _workbook!: Workbook;

  ngOnInit(): void{

    //LISTA DE LOS COMBUSTIBLES
    this.apiService.obtenerConsumoSein()
    .subscribe( consumoseins =>  {
      consumoseins.forEach(consumosein => {
        //LISTA DE LOS DATOS DE ELECTRICIDAD
        const area = consumosein.tipo_consumo_sein_id.nombre;
        const fechaIngreso = consumosein.fecha_ingreso;
        let areaExistente = false;
        this.consumoSeinArray.forEach(item => {
          if (item.area === area ) {
            // Si ya existe, acumular la cantidad
            item.area = consumosein.tipo_consumo_sein_id.nombre;
            item.unidad = consumosein.tipo_consumo_sein_id.unidad;
            item.cantidad += consumosein.cantidad;
            item.factor =  consumosein.tipo_consumo_sein_id.factor
            item.c =  item.cantidad * consumosein.tipo_consumo_sein_id.factor;
            item.co2 = consumosein.tipo_consumo_sein_id.co2;
            item.e =  (item.cantidad * consumosein.tipo_consumo_sein_id.co2)/1000;
            item.ch4 =  consumosein.tipo_consumo_sein_id.ch4*1000;
            item.g =  ((consumosein.tipo_consumo_sein_id.ch4*1000)* item.cantidad) /1000000;
            item.n2o = consumosein.tipo_consumo_sein_id.n2o;
            item.i =  ((consumosein.tipo_consumo_sein_id.n2o*1000)* item.cantidad) /1000000;
            item.j =  ((item.cantidad * consumosein.tipo_consumo_sein_id.co2)/1000)+ ((((consumosein.tipo_consumo_sein_id.ch4*1000)* consumosein.cantidad) /1000000) *30 ) + ((((consumosein.tipo_consumo_sein_id.n2o*1000)* consumosein.cantidad) /1000000) * 265);
            areaExistente = true;
          }
        });
        if (!areaExistente) {
          this.consumoSeinArray.push({
            area: consumosein.tipo_consumo_sein_id.nombre,
            unidad: consumosein.tipo_consumo_sein_id.unidad,
            cantidad: consumosein.cantidad,
            factor: consumosein.tipo_consumo_sein_id.factor,
            c: consumosein.cantidad * consumosein.tipo_consumo_sein_id.factor,
            co2:  consumosein.tipo_consumo_sein_id.co2,
            e: (consumosein.cantidad * consumosein.tipo_consumo_sein_id.co2)/1000,
            ch4: consumosein.tipo_consumo_sein_id.ch4*1000,
            g: ((consumosein.tipo_consumo_sein_id.ch4*1000)* consumosein.cantidad) /1000000,
            n2o: consumosein.tipo_consumo_sein_id.n2o,
            i: ((consumosein.tipo_consumo_sein_id.n2o*1000)* consumosein.cantidad) /1000000,
            j:((consumosein.cantidad * consumosein.tipo_consumo_sein_id.co2)/1000)+ ((((consumosein.tipo_consumo_sein_id.ch4*1000)* consumosein.cantidad) /1000000) *30 ) + ((((consumosein.tipo_consumo_sein_id.n2o*1000)* consumosein.cantidad) /1000000) * 265),
          });
        }
      });
    });
  }


  exportExcel(data: ConsumoSeinAgrupada[], filename: string): void {
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

  private _createtable(data: ConsumoSeinAgrupada[], sheet:Worksheet ): void{
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
    for (let index = 11; index < (this.consumoSeinArray.length + 11); index++) {
      sheet.getCell(cabecera1[0]+index).value = data[count].area;
      sheet.getCell(cabecera1[1]+index).value = data[count].unidad;
      sheet.getCell(cabecera1[2]+index).value = parseFloat(data[count].cantidad.toFixed(5));
      sheet.getCell(cabecera1[3]+index).value = parseFloat(data[count].factor.toFixed(2));
      sheet.getCell(cabecera1[4]+index).value = parseFloat(data[count].c.toFixed(2));
      sheet.getCell(cabecera1[5]+index).value = parseFloat(data[count].co2.toFixed(2));
      sheet.getCell(cabecera1[6]+index).value = parseFloat(data[count].e.toFixed(2));
      sheet.getCell(cabecera1[7]+index).value = parseFloat(data[count].ch4.toFixed(4));
      sheet.getCell(cabecera1[8]+index).value = parseFloat(data[count].g.toFixed(2));
      sheet.getCell(cabecera1[9]+index).value = parseFloat(data[count].n2o.toFixed(4));
      sheet.getCell(cabecera1[10]+index).value = parseFloat(data[count].i.toFixed(2));
      sheet.getCell(cabecera1[11]+index).value = parseFloat(data[count].j.toFixed(2));
      count++;
    }

    //lineas delas tablas
    for (let index = 9; index < (this.consumoSeinArray.length + 11); index++) {
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
    this.exportExcel( this.consumoSeinArray, 'Resfrigerantes' );
  }

}
