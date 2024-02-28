import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Workbook, Worksheet } from 'exceljs';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }

  generateExcel(_workbook: Workbook,sheet: Worksheet, fileName: string, fna: string , alcance: any[]): void {

    sheet.getCell('B2').value = fna ;

    let datos = 0;

    sheet.addConditionalFormatting({
      ref: 'A2:M2',
      rules: [
        {
          type: 'expression',
          priority: 1,
          formulae: ['MOD(ROW()+COLUMN(),1)=0'],
          style: {fill: {type: 'pattern' ,pattern: 'solid', bgColor: {argb: 'E4DFEC'}}},
        }
      ]
    });

    sheet.addConditionalFormatting({
      ref: 'B29:G29',
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
      ref: 'B4:B7',
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


    for (let index = 4; index < 8; index++) {
      let columna_b =  sheet.getCell('B' + index);
      columna_b.border = {
        top: {style:'thin', color: {argb:'0070C0'}},
        left: {style:'thin', color: {argb:'0070C0'}},
        bottom: {style:'thin', color: {argb:'0070C0'}},
        right: {style:'medium', color: {argb:'0070C0'}}
      }

      columna_b.value = alcance[datos].b;

      let columna_c = sheet.getCell('C'+ index);
      let columna_d = sheet.getCell('D'+ index);
      let columna_e = sheet.getCell('E'+ index);
      let columna_f = sheet.getCell('F'+ index);
      let columna_g = sheet.getCell('G'+ index);

      columna_c.value = alcance[datos].c;

      if (index === 4){
        columna_c.border = {
          top: {style:'thin', color: {argb:'000000'}},
          left: { style: 'thin' , color: {argb:'FFFFFF'}},
          bottom: { style: 'thin' , color: {argb:'FFFFFF'}},
          right: { style: 'thin' , color: {argb:'FFFFFF'}}
        };
        columna_d.border = {
          top: {style:'thin', color: {argb:'000000'}},
          left: { style: 'thin' , color: {argb:'FFFFFF'}},
          bottom: { style: 'thin' , color: {argb:'FFFFFF'}},
          right: { style: 'thin' , color: {argb:'FFFFFF'}}
        };
        columna_e.border = {
          top: {style:'thin', color: {argb:'000000'}},
          left: { style: 'thin' , color: {argb:'FFFFFF'}},
          bottom: { style: 'thin' , color: {argb:'FFFFFF'}},
          right: { style: 'thin' , color: {argb:'FFFFFF'}}
        };
        columna_f.border = {
          top: {style:'thin', color: {argb:'000000'}},
          left: { style: 'thin' , color: {argb:'FFFFFF'}},
          bottom: { style: 'thin' , color: {argb:'FFFFFF'}},
          right: { style: 'thin' , color: {argb:'FFFFFF'}}
        };
        columna_g.border = {
          top: {style:'thin', color: {argb:'000000'}},
          left: { style: 'thin' , color: {argb:'FFFFFF'}},
          bottom: { style: 'thin' , color: {argb:'FFFFFF'}},
          right: { style: 'thin' , color: {argb:'000000'}}
        };
      }else if(index === 7){
        columna_c.border = {
          top: {style:'thin', color: {argb:'FFFFFF'}},
          left: { style: 'thin' , color: {argb:'FFFFFF'}},
          bottom: { style: 'thin' , color: {argb:'000000'}},
          right: { style: 'thin' , color: {argb:'FFFFFF'}}
        };
        columna_d.border = {
          top: {style:'thin', color: {argb:'FFFFFF'}},
          left: { style: 'thin' , color: {argb:'FFFFFF'}},
          bottom: { style: 'thin' , color: {argb:'000000'}},
          right: { style: 'thin' , color: {argb:'FFFFFF'}}
        };
        columna_e.border = {
          top: {style:'thin', color: {argb:'FFFFFF'}},
          left: { style: 'thin' , color: {argb:'FFFFFF'}},
          bottom: { style: 'thin' , color: {argb:'000000'}},
          right: { style: 'thin' , color: {argb:'FFFFFF'}}
        };
        columna_f.border = {
          top: {style:'thin', color: {argb:'FFFFFF'}},
          left: { style: 'thin' , color: {argb:'FFFFFF'}},
          bottom: { style: 'thin' , color: {argb:'000000'}},
          right: { style: 'thin' , color: {argb:'FFFFFF'}}
        };
        columna_g.border = {
          top: {style:'thin', color: {argb:'FFFFFF'}},
          left: { style: 'thin' , color: {argb:'FFFFFF'}},
          bottom: { style: 'thin' , color: {argb:'000000'}},
          right: { style: 'thin' , color: {argb:'000000'}}
        };
      }else{
        columna_c.border = {
          top: {style:'thin', color: {argb:'FFFFFF'}},
          left: { style: 'thin' , color: {argb:'FFFFFF'}},
          bottom: { style: 'thin' , color: {argb:'FFFFFF'}},
          right: { style: 'thin' , color: {argb:'FFFFFF'}}
        };
        columna_d.border = {
          top: {style:'thin', color: {argb:'FFFFFF'}},
          left: { style: 'thin' , color: {argb:'FFFFFF'}},
          bottom: { style: 'thin' , color: {argb:'FFFFFF'}},
          right: { style: 'thin' , color: {argb:'FFFFFF'}}
        };
        columna_e.border = {
          top: {style:'thin', color: {argb:'FFFFFF'}},
          left: { style: 'thin' , color: {argb:'FFFFFF'}},
          bottom: { style: 'thin' , color: {argb:'FFFFFF'}},
          right: { style: 'thin' , color: {argb:'FFFFFF'}}
        };
        columna_f.border = {
          top: {style:'thin', color: {argb:'FFFFFF'}},
          left: { style: 'thin' , color: {argb:'FFFFFF'}},
          bottom: { style: 'thin' , color: {argb:'FFFFFF'}},
          right: { style: 'thin' , color: {argb:'FFFFFF'}}
        };
        columna_g.border = {
          top: {style:'thin', color: {argb:'FFFFFF'}},
          left: { style: 'thin' , color: {argb:'FFFFFF'}},
          bottom: { style: 'thin' , color: {argb:'FFFFFF'}},
          right: { style: 'thin' , color: {argb:'000000'}}
        };
      }
      datos++;
    }

    sheet.getRow(2).height = 33;

    _workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, fileName +'.xlsx');
    });

  }

}
