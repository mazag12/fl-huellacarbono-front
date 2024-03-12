import { Component } from '@angular/core';
import { ElectricidadAgrupada } from 'src/app/views/interfaces';
import { ElectricidadService } from 'src/app/views/services/electricidad.service';
import { Workbook, Worksheet } from 'exceljs';
import { ExportExcelService } from 'src/app/views/services/export-excel.service';

@Component({
  selector: 'app-electricidad-reporte',
  templateUrl: './electricidad-reporte.component.html',
  styleUrls: ['./electricidad-reporte.component.scss']
})
export class ElectricidadReporteComponent {
  constructor(private service: ElectricidadService, ) {}



}
