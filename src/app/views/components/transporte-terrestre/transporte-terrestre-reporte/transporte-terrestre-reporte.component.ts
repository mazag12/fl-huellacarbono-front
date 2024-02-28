import { Component } from '@angular/core';
import { Workbook, Worksheet } from 'exceljs';
import { TransporteTerrestreGrub } from 'src/app/views/interfaces';
import { ApiService } from 'src/app/views/services/api.service';
import { ExportExcelService } from 'src/app/views/services/export-excel.service';

@Component({
  selector: 'app-transporte-terrestre-reporte',
  templateUrl: './transporte-terrestre-reporte.component.html',
  styleUrls: ['./transporte-terrestre-reporte.component.scss']
})
export class TransporteTerrestreReporteComponent {
  constructor( private apiService: ApiService, private exportExcelService: ExportExcelService) {}

  public tipoVehiculoArray: TransporteTerrestreGrub[] = [];


  public fna: string = "Estimación de GEI de Transporte de Personal";

  public alcance: any[] = [
    {b :'Alcance', c: 'Alcance 3'},
    {b :'Fuente', c: 'Transporte terrestre'},
    {b : 'Código de categoría', c: 'A3_3'},
    {b : 'Hoja', c: '1 de 1 (CO2, CH4 y N2O para emisiones de transporte de personas)'}];


  private _workbook!: Workbook;

  ngOnInit(): void{

    this.apiService.obtenerTipoTransporteTerrestre()
    .subscribe( tipo =>  {
      tipo.forEach(tipos => {
        //LISTA DE LOS tipoS
        this.tipoVehiculoArray.push({
          tipo_transporte: tipos.nombre,
          personas: 0,
          distancia_recorrido: 0,
          total_recorrido: 0,
          co2: tipos.co2,
          emision_co2: 0,
          ch4: tipos.ch4,
          emision_ch4: 0,
          n2o: tipos.n2o,
          emision_n2o: 0,
          emision_gei: 0
        });
        this.apiService.obtenerTransporteTerrestre()
        .subscribe( transporteterrestrees =>  {
          transporteterrestrees.forEach(transporteterrestre => {
            //LISTA DE LOS DATOS DE transporteterrestre
            const tipotipo = transporteterrestre.tipo_transporte_id.nombre;
            let encontrado = false;
            if(tipotipo === tipos.nombre){
              for (let i = 0; i < this.tipoVehiculoArray.length; i++) {
                if (this.tipoVehiculoArray[i].tipo_transporte === tipotipo) {
                  this.tipoVehiculoArray[i].personas = transporteterrestre.numero_persona;
                  this.tipoVehiculoArray[i].distancia_recorrido += transporteterrestre.distancia;
                  this.tipoVehiculoArray[i].total_recorrido = this.tipoVehiculoArray[i].personas * this.tipoVehiculoArray[i].distancia_recorrido;
                  this.tipoVehiculoArray[i].co2 = transporteterrestre.tipo_transporte_id.co2;
                  this.tipoVehiculoArray[i].emision_co2 = this.tipoVehiculoArray[i].total_recorrido * transporteterrestre.tipo_transporte_id.co2;
                  this.tipoVehiculoArray[i].ch4 = transporteterrestre.tipo_transporte_id.ch4;
                  this.tipoVehiculoArray[i].emision_ch4 = this.tipoVehiculoArray[i].total_recorrido * transporteterrestre.tipo_transporte_id.ch4;
                  this.tipoVehiculoArray[i].n2o = transporteterrestre.tipo_transporte_id.n2o;
                  this.tipoVehiculoArray[i].emision_n2o = this.tipoVehiculoArray[i].total_recorrido * transporteterrestre.tipo_transporte_id.n2o;
                  this.tipoVehiculoArray[i].emision_gei = (this.tipoVehiculoArray[i].emision_co2/1000) + ((this.tipoVehiculoArray[i].emision_ch4 * 30 )/1000) + ((this.tipoVehiculoArray[i].emision_n2o * 256)/1000);
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

  exportExcel(data: TransporteTerrestreGrub[], filename: string): void {
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

  private _createtable(data: TransporteTerrestreGrub[], sheet:Worksheet ): void{

    //DISEÑO DE LOS DATOS PARA EL REPORTE--------------------------------------------
    sheet.addConditionalFormatting({
      ref: 'B10:H10',
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
      ref: 'B13:L14',
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

    let cabecera1_nombre = [
      {cell: 'B13', value : 'Tipo de transporte'},
      {cell: 'C13', value : 'Personas [personas/modo]'},
      {cell: 'D13', value : 'Distancia recorrida [Km/año]'},
      {cell: 'E13', value : 'Total recorrido [Km•personas/año]'},
      {cell: 'F13', value : 'Factor de emisón [KgCO2/Km•persona]'},
      {cell: 'G13', value : 'Emisiones GEI [KgCO2]'},
      {cell: 'H13', value : 'Factor de emisón [KgCH4/Km•persona]'},
      {cell: 'I13', value : 'Emisiones GEI [KgCH4]'},
      {cell: 'J13', value : 'Factor de emisón [KgN2O/Km•persona]'},
      {cell: 'K13', value : 'Emisiones GEI [KgN2O]'},
      {cell: 'L13', value : 'Emisiones GEI [tCO2e]'},
      {cell: 'C14', value : 'A'},
      {cell: 'D14', value : 'B'},
      {cell: 'E14', value : 'C=Σi(Ai•Bi)'},
      {cell: 'F14', value : 'D'},
      {cell: 'G14', value : 'E=D•C'},
      {cell: 'H14', value : 'F'},
      {cell: 'I14', value : 'F=G•C'},
      {cell: 'J14', value : 'H'},
      {cell: 'K14', value : 'I=H•C'},
      {cell: 'L14', value : 'J=E+F+I'}
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
    for (let index = 15; index < 23; index++) {

      sheet.getCell(cabecera1[0]+index).value = data[count].tipo_transporte;
      sheet.getCell(cabecera1[1]+index).value = parseFloat(data[count].personas.toFixed(0));
      sheet.getCell(cabecera1[2]+index).value = parseFloat(data[count].distancia_recorrido.toFixed(2));
      sheet.getCell(cabecera1[3]+index).value = parseFloat(data[count].total_recorrido.toFixed(2));
      sheet.getCell(cabecera1[4]+index).value = parseFloat(data[count].co2.toFixed(4));
      sheet.getCell(cabecera1[5]+index).value = parseFloat(data[count].emision_co2.toFixed(4));
      sheet.getCell(cabecera1[6]+index).value = parseFloat(data[count].ch4.toFixed(4));
      sheet.getCell(cabecera1[7]+index).value = parseFloat(data[count].emision_ch4.toFixed(4));
      sheet.getCell(cabecera1[8]+index).value = parseFloat(data[count].n2o.toFixed(4));
      sheet.getCell(cabecera1[9]+index).value = parseFloat(data[count].emision_n2o.toFixed(4));
      sheet.getCell(cabecera1[10]+index).value = parseFloat(data[count].emision_gei.toFixed(2));
      count++;
    }

    //lineas delas tablas
    for (let index = 13; index < 23; index++) {
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

    //ancho
    sheet.getColumn('B').width = 18;

    //combinar celda
    sheet.mergeCells('B10:B11');

  }

  exportToExcel(): void {
    this.exportExcel( this.tipoVehiculoArray, 'transporteterrestre' );
  }
}
