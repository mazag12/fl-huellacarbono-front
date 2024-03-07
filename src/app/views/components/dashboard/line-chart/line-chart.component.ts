import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { ElectricidadService } from 'src/app/views/services/electricidad.service';
import { forkJoin } from 'rxjs';
import { meses } from 'src/app/views/utils/constans';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor(
    private service: ElectricidadService) {}

  public chart: Chart | undefined;

  public fechaActual = new Date();

  public numeroMes = this.fechaActual.getMonth() + 1;

  public sumasJPorMes = new Array(this.numeroMes).fill(0);

  public mesesHastaActual: string[] = [];

  ngOnInit(): void {

    const requests = [];

    for (let mes = 1; mes < this.numeroMes + 1; mes++) {
      const request = this.service.reporte('MONTH', mes.toString());
      requests.push(request);
    }

    forkJoin(requests).subscribe(reportsArray => {
      reportsArray.forEach((reporte, index) => {
        reporte.data.forEach(reportes => {
          this.sumasJPorMes[index] += ((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.co2) / 1000) +
          (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.ch4) / 1000) * 30) +
          (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.n2o) / 1000) * 265);
        });
      });

      this.grafico(this.sumasJPorMes);
    });
  }


  obtenerMesesHastaActual(): string[] {
    const mesActual = new Date().getMonth();
    return meses.slice(0, mesActual + 1);
  }

  grafico(data_electricidad: any){

    this.mesesHastaActual = this.obtenerMesesHastaActual();

    const data = {
      labels: this.mesesHastaActual,
      datasets: [{
        label: 'Generación Electricidad',
        data: data_electricidad,
        borderColor: '#6A4588',
        backgroundColor: 'rgba(106, 69, 136, 0.3)',
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 15,
        fill: true,
      }]
    };
    this.chart = new Chart ("line",{
      type: 'line' as ChartType,
      data: data,
      options: {
        responsive: true,
      }
    })
  }
}