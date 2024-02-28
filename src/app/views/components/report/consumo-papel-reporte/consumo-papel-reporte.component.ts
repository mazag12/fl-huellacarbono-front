import { Component } from '@angular/core';
import { Workbook, Worksheet } from 'exceljs';
import { ConsumoPapelGrub } from 'src/app/views/interfaces';
import { ApiService } from 'src/app/views/services/api.service';
import { ExportExcelService } from 'src/app/views/services/export-excel.service';

@Component({
  selector: 'app-consumo-papel-reporte',
  templateUrl: './consumo-papel-reporte.component.html',
  styleUrls: ['./consumo-papel-reporte.component.scss']
})
export class ConsumoPapelReporteComponent {
  constructor( private apiService: ApiService, private exportExcelService: ExportExcelService) {}

  public tipopapelArray: ConsumoPapelGrub[] = [];


  public fna: string = "Estimación de GEI de Transporte de Personal";

  public alcance: any[] = [
    {b :'Alcance', c: 'Alcance 3'},
    {b :'Fuente', c: 'Consumo de papel'},
    {b : 'Código de categoría', c: 'A3_4'},
    {b : 'Hoja', c: 'CO2e para consumo de papel'}];


  private _workbook!: Workbook;

  ngOnInit(): void{

    this.apiService.obtenerTipoConsumoPapel()
    .subscribe( tipo =>  {
      tipo.forEach(tipos => {
        //LISTA DE LOS tipoS
        this.tipopapelArray.push({
          tipo_papel: tipos.nombre,
          unidad: tipos.unidad,
          cantidad: 0,
          certificado1: 0,
          densidad: tipos.co2,
          cantidad_utilizada: 0,
          certificado2: tipos.co2,
          papel_virgen: 0.96,
          emision: 0
        });
        this.apiService.obtenerConsumoPapel()
        .subscribe( transporteterrestrees =>  {
          transporteterrestrees.forEach(transporteterrestre => {
            //LISTA DE LOS DATOS DE transporteterrestre
            const tipotipo = transporteterrestre.tipo_papel_id.nombre;
            let encontrado = false;
            if(tipotipo === tipos.nombre){
              for (let i = 0; i < this.tipopapelArray.length; i++) {
                if (this.tipopapelArray[i].tipo_papel === tipotipo) {
                  this.tipopapelArray[i].cantidad += transporteterrestre.cantidad;
                  this.tipopapelArray[i].certificado1 = transporteterrestre.reciclado;
                  this.tipopapelArray[i].densidad = transporteterrestre.densida;
                  this.tipopapelArray[i].cantidad_utilizada = this.tipopapelArray[i].cantidad  * this.tipopapelArray[i].densidad*(118.9*84.1/10000);
                  this.tipopapelArray[i].certificado2 = transporteterrestre.tipo_papel_id.co2;
                  this.tipopapelArray[i].papel_virgen = 0.96;
                  this.tipopapelArray[i].emision = (this.tipopapelArray[i].cantidad_utilizada * transporteterrestre.tipo_papel_id.co2/1000 * this.tipopapelArray[i].certificado1)+(this.tipopapelArray[i].cantidad_utilizada * 0.96/1000*(100%-this.tipopapelArray[i].certificado1));
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

  calcularCantidad(): number {
    let suma = 0;
    for (let datos of this.tipopapelArray) {
      suma += datos.cantidad;
    }
    return suma;
  }

  calcularCantidadUtilizada(): number {
    let suma = 0;
    for (let datos of this.tipopapelArray) {
      suma += datos.cantidad_utilizada;
    }
    return suma;
  }

  calcularEmision(): number {
    let suma = 0;
    for (let datos of this.tipopapelArray) {
      suma += datos.emision;
    }
    return suma;
  }

  exportExcel(data: ConsumoPapelGrub[], filename: string): void {
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

  private _createtable(data: ConsumoPapelGrub[], sheet:Worksheet ): void{

    //DISEÑO DE LOS DATOS PARA EL REPORTE--------------------------------------------

    sheet.addConditionalFormatting({
      ref: 'B9:L11',
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
      ref: 'G26:H26',
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

    sheet.getCell('B10').value = "Transporte de Personal: Pagado por la empresa";

    sheet.getCell('B26').value = "Total";

    sheet.getCell('B26').value = this.calcularCantidad();

    sheet.getCell('I26').value = this.calcularCantidadUtilizada();

    sheet.getCell('L26').value = this.calcularEmision();

    sheet.getCell('E26').fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'B0DAF7'},
    };

    sheet.getCell('K26').fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'B0DAF7'},
    };

    let cabecera1_nombre = [
      {cell: 'B9', value : 'Tipo de Papel'},
      {cell: 'E9', value : 'Consumo de papel'},
      {cell: 'J9', value : 'Factor de emisión de CO2'},
      {cell: 'L9', value : 'Emisiones GEI [tCO2e]'},
      {cell: 'E10', value : 'Unidad'},
      {cell: 'F10', value : 'Cantidad total [unid/año]'},
      {cell: 'G10', value : 'Porcentaje de reciclaje o certificado de bosques protejidos [%]'},
      {cell: 'H10', value : 'Densidad del papel [g/m2] '},
      {cell: 'I10', value : 'Cantidad utilizada [Kg/año] '},
      {cell: 'J10', value : 'Papel reciclado o bosques certificados [KgCO2/Kgpapel]'},
      {cell: 'K10', value : 'Papel virgen [KgCO2/Kgpapel]'},
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
    for (let index = 12; index < 26; index++) {

      sheet.getCell(cabecera1[0]+index).value = data[count].tipo_papel;
      sheet.getCell(cabecera1[1]+index).value = data[count].unidad;
      sheet.getCell(cabecera1[2]+index).value = parseFloat(data[count].cantidad.toFixed(2));
      sheet.getCell(cabecera1[3]+index).value = parseFloat(data[count].certificado1.toFixed(2));
      sheet.getCell(cabecera1[4]+index).value = parseFloat(data[count].densidad.toFixed(4));
      sheet.getCell(cabecera1[5]+index).value = parseFloat(data[count].cantidad_utilizada.toFixed(4));
      sheet.getCell(cabecera1[6]+index).value = parseFloat(data[count].certificado2.toFixed(4));
      sheet.getCell(cabecera1[7]+index).value = parseFloat(data[count].papel_virgen.toFixed(4));
      sheet.getCell(cabecera1[8]+index).value = parseFloat(data[count].emision.toFixed(4));
      count++;
    }

    //lineas delas tablas
    for (let index = 12; index < 27; index++) {
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
    sheet.getRow(11).height = 60;
    sheet.getRow(2).height = 33;

    //combinar celda
    sheet.mergeCells('B9:C11');
    sheet.mergeCells('E9:I9');
    sheet.mergeCells('J9:K9');
    sheet.mergeCells('L9:L11');

    sheet.mergeCells('E10:E11');
    sheet.mergeCells('F10:F11');
    sheet.mergeCells('G10:G11');
    sheet.mergeCells('H10:H11');
    sheet.mergeCells('I10:I11');
    sheet.mergeCells('J10:J11');
    sheet.mergeCells('K10:K11');


  }

  exportToExcel(): void {
    this.exportExcel( this.tipopapelArray, 'Consumo_Papel' );
  }
}
