import {Component} from '@angular/core';
import { Workbook, Worksheet } from 'exceljs';
import { TransporteCasaTrabajoGrub } from 'src/app/views/interfaces';
import { ApiService } from 'src/app/views/services/api.service';
import { ExportExcelService } from 'src/app/views/services/export-excel.service';


@Component({
  selector: 'app-transporte-casa-trabajo-reporte',
  templateUrl: './transporte-casa-trabajo-reporte.component.html',
  styleUrls: ['./transporte-casa-trabajo-reporte.component.scss']
})
export class TransporteCasaTrabajoReporteComponent{

  constructor( private apiService: ApiService, private exportExcelService: ExportExcelService ) {}

  public transporteCasaTrabajoArray: TransporteCasaTrabajoGrub[] = [];

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

  public fna: string = "Estimación de GEI de Transporte de Personal";

  public alcance: any[] = [
    {b :'Alcance', c: 'Alcance 3'},
    {b :'Fuente', c: 'Transporte casa-trabajo'},
    {b : 'Código de categoría', c: 'A3_1'},
    {b : 'Hoja', c: '1 de 1 (CO2, CH4 y N2O para emisiones de transporte de personas)'}];

  private _workbook!: Workbook;

  ngOnInit(): void{

    this.apiService.obtenerTipoTransporteCasaTrabajo()
    .subscribe( tipo =>  {
      tipo.forEach(tipos => {
        //LISTA DE LOS COMBUSTIBLES
        this.transporteCasaTrabajoArray.push({
          tipo_transporte: tipos.nombre,
          cantidad: 0,
          distancia: 0,
          total_recorrido: tipos.neto,
          co2: 0,
          ch4: tipos.co2,
          n2o: 0,
          dioxido_carbono: tipos.ch4,
          metano: 0,
          oxido: tipos.n2o,
          emision: 0,
        });
        this.apiService.obtenerTransporteCasaTrabajo()
        .subscribe( transportes =>  {
          transportes.forEach(trabajo => {
           // LISTA DE LOS DATOS DE ELECTRICIDAD
            const tipotransporte = trabajo.tipo_transporte.nombre;
            let encontrado = false;
            if(tipotransporte === tipos.nombre){
              for (let i = 0; i < this.transporteCasaTrabajoArray.length; i++) {
                if (this.transporteCasaTrabajoArray[i].tipo_transporte === tipotransporte) {
                  this.transporteCasaTrabajoArray[i].cantidad += trabajo.numero_trabajadores;
                  this.transporteCasaTrabajoArray[i].distancia += (trabajo.viajes_semana * trabajo.dias_laborables * trabajo.distancia_primedio * 0.2);
                  this.transporteCasaTrabajoArray[i].total_recorrido = (trabajo.numero_trabajadores * trabajo.viajes_semana * trabajo.dias_laborables * trabajo.distancia_primedio * 0.2);
                  this.transporteCasaTrabajoArray[i].co2 = trabajo.tipo_transporte.co2;
                  this.transporteCasaTrabajoArray[i].ch4 = trabajo.tipo_transporte.ch4;
                  this.transporteCasaTrabajoArray[i].n2o = trabajo.tipo_transporte.n2o;
                  this.transporteCasaTrabajoArray[i].dioxido_carbono = this.transporteCasaTrabajoArray[i].total_recorrido * trabajo.tipo_transporte.co2;
                  this.transporteCasaTrabajoArray[i].metano = this.transporteCasaTrabajoArray[i].total_recorrido * trabajo.tipo_transporte.ch4;
                  this.transporteCasaTrabajoArray[i].oxido = this.transporteCasaTrabajoArray[i].total_recorrido * trabajo.tipo_transporte.n2o;
                  this.transporteCasaTrabajoArray[i].emision = this.transporteCasaTrabajoArray[i].dioxido_carbono + (this.transporteCasaTrabajoArray[i].metano * 30) + (this.transporteCasaTrabajoArray[i].emision * 265);
                  encontrado = true;
                  break;
                }
              }
            }
          });
        });
      })
    });
  }


  calcularSumaDatosCo2kg(): number {
    let suma = 0;
    for (let datos of this.transporteCasaTrabajoArray) {
      suma += datos.co2;
    }
    return suma;
  }

  calcularSumaDatosCo2t(): number {
    return this.calcularSumaDatosCo2kg() * 1000;
  }

  exportExcel(data: TransporteCasaTrabajoGrub[], filename: string): void {
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

  private _createtable(data: TransporteCasaTrabajoGrub[], sheet:Worksheet ): void{

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
              bgColor: {argb: 'B0DAF7'}
            }
          },
        }
      ]
    });

    sheet.addConditionalFormatting({
      ref: 'B16:L18',
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

    sheet.getCell('B9').value = 'Resumen';

    sheet.addConditionalFormatting({
      ref: 'B10:D11',
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

    let cabecera1 = ['B','C','D','E','F','G','H','I','J','K','L'];

    for (let index of cabecera1) {
      if(index === "B" || index === "L"){
        sheet.getColumn(index).width = 25;
      }else{
        sheet.getColumn(index).width = 15;
      }
    }

    sheet.getCell('B9').value = "Nivel 1 de cálculo, basado en la cantidad de combustible";

    sheet.getCell('B10').value = "Tipo de transporte";
    sheet.getCell('C10').value = "Emisiones GEI [kgCO2e]";
    sheet.getCell('D10').value = "Emisiones GEI [tCO2e]";
    sheet.getCell('B11').value = "Transporte de Personal: Casa - Trabajo";

    sheet.getCell('C11').value = this.calcularSumaDatosCo2kg();
    sheet.getCell('D11').value = this.calcularSumaDatosCo2t();

    let cabecera1_nombre = [
      {cell: 'B16', value : 'Tipo de Gas'},
      {cell: 'C16', value : 'Personas [personas/modo]'},
      {cell: 'D16', value : 'Distancia recorrida [Km/año]'},
      {cell: 'E16', value : 'Total recorrido [Km•personas/año]'},
      {cell: 'F16', value : 'Factor de emisón [KgCO2/Km•persona]'},
      {cell: 'G16', value : 'Factor de emisón [KgCH4/Km•persona]'},
      {cell: 'H16', value : 'Factor de emisón [KgN2O/Km•persona]'},
      {cell: 'I16', value : 'Emisiones GEI'},
      {cell: 'I17', value : 'Dióxido de carbono [KgCO2]'},
      {cell: 'J17', value : 'Metano [KgCH4]'},
      {cell: 'K17', value : 'Oxido Nitróso [KgN2O]'},
      {cell: 'L17', value : 'Emisiones GEI [Kg CO2e]'},
      {cell: 'C18', value : 'A'},
      {cell: 'D18', value : 'B'},
      {cell: 'E18', value : 'C=Σi(Ai•Bi)'},
      {cell: 'F18', value : 'D'},
      {cell: 'G18', value : 'E'},
      {cell: 'H18', value : 'F'},
      {cell: 'I18', value : 'G=D•C'},
      {cell: 'J18', value : 'H=E•C'},
      {cell: 'K18', value : 'I=F•C'},
      {cell: 'L18', value : 'F=G+H+I'},
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
    for (let index = 19; index < (this.transporteCasaTrabajoArray.length + 19); index++) {
      sheet.getCell(cabecera1[0]+index).value = data[count].tipo_transporte;
      sheet.getCell(cabecera1[1]+index).value = data[count].cantidad;
      sheet.getCell(cabecera1[2]+index).value = parseFloat(data[count].distancia.toFixed(5));
      sheet.getCell(cabecera1[3]+index).value = parseFloat(data[count].total_recorrido.toFixed(2));
      sheet.getCell(cabecera1[4]+index).value = parseFloat(data[count].co2.toFixed(2));
      sheet.getCell(cabecera1[5]+index).value = parseFloat(data[count].ch4.toFixed(2));
      sheet.getCell(cabecera1[6]+index).value = parseFloat(data[count].n2o.toFixed(2));
      sheet.getCell(cabecera1[7]+index).value = parseFloat(data[count].dioxido_carbono.toFixed(4));
      sheet.getCell(cabecera1[8]+index).value = parseFloat(data[count].metano.toFixed(2));
      sheet.getCell(cabecera1[9]+index).value = parseFloat(data[count].oxido.toFixed(4));
      sheet.getCell(cabecera1[10]+index).value = parseFloat(data[count].emision.toFixed(2));
      count++;
    }

    //lineas delas tablas
    for (let index = 16; index < (this.transporteCasaTrabajoArray.length + 16); index++) {
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
    sheet.getRow(9).height = 14;
    sheet.getRow(14).height = 45;
    sheet.getRow(9).height = 14;

    //ancho
    sheet.getColumn('B').width = 18;

    //combinar celda
    sheet.mergeCells('B16:B18');
    sheet.mergeCells('C16:C17');
    sheet.mergeCells('D16:D17');
    sheet.mergeCells('E16:E17');
    sheet.mergeCells('F16:F17');
    sheet.mergeCells('G16:G17');
    sheet.mergeCells('H16:H17');
  }

  exportToExcel(): void {
    this.exportExcel( this.transporteCasaTrabajoArray, 'Trnasporte_Casa_Trabajo' );
  }

}
