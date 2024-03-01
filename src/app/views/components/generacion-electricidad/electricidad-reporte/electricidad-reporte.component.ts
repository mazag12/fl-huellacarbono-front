import {Component, ElementRef, ViewChild} from '@angular/core';
import { ElectricidadAgrupada } from 'src/app/views/interfaces';
import { ElectricidadService } from 'src/app/views/services/electricidad.service';
import * as FileSaver from 'file-saver';
import { Workbook, Worksheet } from 'exceljs';
import { ExportExcelService } from 'src/app/views/services/export-excel.service';

@Component({
  selector: 'app-electricidad-reporte',
  templateUrl: './electricidad-reporte.component.html',
  styleUrls: ['./electricidad-reporte.component.scss']
})
export class ElectricidadReporteComponent {
  constructor(private service: ElectricidadService, private exportExcelService: ExportExcelService) {}

  public array: ElectricidadAgrupada[] = [];

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

    this.service.tipo()
    .subscribe( tipo =>  {
      tipo.data.forEach(tipos => {
        //LISTA DE LOS COMBUSTIBLES
        if(tipos.flag_activo = true){
          this.array.push({
            id: tipos.id,
            nombre: tipos.nombre,
            unidad: tipos.unidad,
            cantidad: 0,
            a: 0,
            neto: tipos.valor_neto,
            c: 0,
            co2: tipos.co2,
            e: 0,
            ch4: tipos.ch4,
            g: 0,
            n2o: tipos.n2o,
            i: 0,
            j: 0,
          });
        }
        this.service.reporte('YEAR', '2024')
        .subscribe( reporte =>  {
          reporte.data.forEach(reportes => {
            //LISTA DE LOS DATOS DE ELECTRICIDAD
            let encontrado = false;
            if(reportes.id === tipos.id){
              for (let i = 0; i < this.array.length; i++) {
                if (this.array[i].id === tipos.id) {
                  this.array[i].unidad = reportes.unidad;
                  this.array[i].cantidad += reportes.cantidad;
                  this.array[i].a = reportes.factor === 0 ? this.array[i].cantidad : (this.array[i].cantidad * reportes.factor);
                  this.array[i].neto = reportes.valor_neto;
                  this.array[i].c = (this.array[i].a *  reportes.valor_neto);
                  this.array[i].co2 = reportes.co2;
                  this.array[i].e = (this.array[i].c * reportes.co2)/1000;
                  this.array[i].ch4 = reportes.ch4;
                  this.array[i].g = (this.array[i].c * reportes.ch4)/1000;
                  this.array[i].n2o = reportes.n2o;
                  this.array[i].i = (this.array[i].c * reportes.n2o)/1000;
                  this.array[i].j = this.array[i].e + this.array[i].g  * 30 + this.array[i].i * 265;
                  encontrado = true;
                  break;
                }
              }
            }
          });
        });
      })
      console.log(this.array);
    });
  }

  exportToExcel(): void {
    this.exportExcel( this.array, 'Electricidad' );
  }

  exportExcel(data: ElectricidadAgrupada[], filename: string): void {
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

  private _createtable(data: ElectricidadAgrupada[], sheet:Worksheet ): void{

    //DISEÑO DE LOS DATOS PARA EL REPORTE--------------------------------------------

    console.log(data.length);

    sheet.addConditionalFormatting({
      ref: 'B10:M12',
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

    let cabecera1 = ['B','C','D','E','F','G','H','I','J','K','L','M'];

    for (let index of cabecera1) {
      if(index === "B" || index === "M"){
        sheet.getColumn(index).width = 25;
      }else{
        sheet.getColumn(index).width = 15;
      }
    }

    sheet.getCell('B9').value = "Nivel 1 de cálculo, basado en la cantidad de combustible";

    let cabecera1_nombre = [
      {cell: 'B10', value : 'Tipo de combustible'},
      {cell: 'C10', value : 'Consumo de energía'},
      {cell: 'G10', value : 'CO2'},
      {cell: 'I10', value : 'CH4'},
      {cell: 'K10', value : 'N2O'},
      {cell: 'M10', value : 'J Total emisiones de GEI [tCO2e]'},
      {cell: 'C11', value : 'Unidad'},
      {cell: 'D11', value : 'A Consumo (masa, volumen o energía) (sumar la cantidad)'},
      {cell: 'E11', value : 'B Valor calórico neto [TJ / unidad]'},
      {cell: 'F11', value : 'C Consumo [TJ] '},
      {cell: 'G11', value : 'D Factor de emisión de CO2 [Kg CO2/TJ]'},
      {cell: 'H11', value : 'E Emisiones de CO2 [t CO2]'},
      {cell: 'I11', value : 'F Factor de emisión de CH4 [Kg CH4/TJ]'},
      {cell: 'J11', value : 'G Emisiones de CH4 [t CH4] '},
      {cell: 'K11', value : 'H Factor de emisión de N2O [Kg N2O / TJ] '},
      {cell: 'L11', value : 'I Emisiones de N2O [t N2O]'},
      {cell: 'F12', value : 'C = A x B'},
      {cell: 'H12', value : 'E = C x D/103'},
      {cell: 'J12', value : 'G = C x F/103'},
      {cell: 'L12', value : 'I = Cx H/103'},
      {cell: 'M12', value : 'J = E + G•GWPCH4 + I•GWPN2O'},
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
    for (let index = 13; index < (13 + data.length); index++) {

      sheet.getCell(cabecera1[0]+index).value = data[count].nombre;
      sheet.getCell(cabecera1[1]+index).value = data[count].unidad;
      sheet.getCell(cabecera1[2]+index).value = parseFloat(data[count].a.toFixed(4));
      sheet.getCell(cabecera1[3]+index).value = parseFloat(data[count].neto.toFixed(4));
      sheet.getCell(cabecera1[4]+index).value = parseFloat(data[count].c.toFixed(2));
      sheet.getCell(cabecera1[5]+index).value = parseFloat(data[count].co2.toFixed(3));
      sheet.getCell(cabecera1[6]+index).value = parseFloat(data[count].e.toFixed(2));
      sheet.getCell(cabecera1[7]+index).value = parseFloat(data[count].ch4.toFixed(2));
      sheet.getCell(cabecera1[8]+index).value = parseFloat(data[count].g.toFixed(4));
      sheet.getCell(cabecera1[9]+index).value = parseFloat(data[count].n2o.toFixed(2));
      sheet.getCell(cabecera1[10]+index).value = parseFloat(data[count].i.toFixed(4));
      sheet.getCell(cabecera1[11]+index).value = parseFloat(data[count].j.toFixed(2));

      count++;
    }

    //lineas delas tablas
    for (let index = 10; index < 30; index++) {
      cabecera1.forEach(element => {
        sheet.getCell(element + index).border = {
          top: {style:'thin', color: {argb:'000000'}},
          left: {style:'thin', color: {argb:'000000'}},
          bottom: {style:'thin', color: {argb:'000000'}},
          right: {style:'medium', color: {argb:'000000'}}
        }
      });
    }

    sheet.getCell('G29').value = "Total";
    sheet.getCell('G29').alignment = {
      wrapText: true,
      horizontal: 'center',
      vertical: 'middle'
    };
    sheet.getCell('H29').value = parseFloat(this.calcularSumaDatosco2().toFixed(2));
    sheet.getCell('I29').value = "Total";
    sheet.getCell('I29').alignment = {
      wrapText: true,
      horizontal: 'center',
      vertical: 'middle'
    };
    sheet.getCell('I29').fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'B0DAF7'}
    };

    sheet.getCell('J29').value = parseFloat(this.calcularSumaDatosch4().toFixed(2));
    sheet.getCell('K29').value = "Total";
    sheet.getCell('K29').alignment = {
      wrapText: true,
      horizontal: 'center',
      vertical: 'middle'
    };
    sheet.getCell('K29').fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'B0DAF7'}
    };
    sheet.getCell('L29').value = parseFloat(this.calcularSumaDatosn2o().toFixed(2));
    sheet.getCell('M29').value = parseFloat(this.calcularSumaDatostotal().toFixed(4));

  /////--------------------------------------------------------
    //altura
    sheet.getRow(11).height = 60;
    sheet.getRow(2).height = 33;

    //ancho
    sheet.getColumn('B').width = 18;

    //combinar celda
    sheet.mergeCells('B10:B11');
    sheet.mergeCells('C10:F10');
    sheet.mergeCells('G10:H10');
    sheet.mergeCells('I10:J10');
    sheet.mergeCells('K10:L10');
    sheet.mergeCells('M10:M11');
  }

  calcularSumaDatosco2(): number {
    let suma = 0;
    for (let datos of this.array) {
      suma += datos.e;
    }
    return suma;
  }

  calcularSumaDatosch4(): number {
    let suma = 0;
    for (let datos of this.array) {
      suma += datos.g;
    }
    return suma;
  }

  calcularSumaDatosn2o(): number {
    let suma = 0;
    for (let datos of this.array) {
      suma += datos.i;
    }
    return suma;
  }

  calcularSumaDatostotal(): number {
    let co2 = 0;
    let ch4 = 0;
    let n2o = 0;
    for (let datos of this.array) {
      co2 += datos.e;
      ch4 += datos.g;
      n2o += datos.i;
    }
    return co2 + ch4 * 30 + n2o * 265;
  }

}
