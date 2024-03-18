import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { ElectricidadService } from 'src/app/views/services/electricidad.service';
import { cabecera, tablafna } from 'src/app/views/utils/constans';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit{

  constructor(
    private service: ElectricidadService) {}

  public Cabecera: any[] = cabecera;

  public fna: any[] = tablafna;

  public fechaActual = new Date();

  public numeroMes = this.fechaActual.getMonth() + 1;

  public CO2 = new Array(15).fill(0);

  public CH4 = new Array(15).fill(0);

  public N2O = new Array(15).fill(0);

  public GEI = new Array(15).fill(0);

  public mesesHastaActual: string[] = [];

  ngOnInit(): void {
    const requests = [];

    for (let mes = 1; mes < this.numeroMes + 1; mes++) {
      const request = this.service.reporte('MONTH', mes.toString());
      requests.push(request);
    }

    //Electricidad

    forkJoin(requests).subscribe(reportsArray => {
      reportsArray.forEach((reporte) => {
        if (reporte && reporte.data) {
          reporte.data.forEach(reportes => {
            this.CO2[1] += ((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.co2) / 1000);
            this.CH4[1] += ((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.ch4) / 1000);
            this.N2O[1] += ((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.n2o) / 1000);
            this.GEI[1] += ((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.co2) / 1000) +
            (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.ch4) / 1000) * 30) +
            (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.n2o) / 1000) * 265);
          });
        }
      });
    });
  }
}
