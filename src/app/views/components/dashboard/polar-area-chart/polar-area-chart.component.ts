import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { ElectricidadService } from 'src/app/views/services/electricidad.service';
import { meses } from 'src/app/views/utils/constans';

@Component({
  selector: 'app-polar-area-chart',
  templateUrl: './polar-area-chart.component.html',
  styleUrls: ['./polar-area-chart.component.scss']
})
export class PolarAreaChartComponent implements OnInit {

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
        if (reporte && reporte.data) {
          reporte.data.forEach(reportes => {
            this.sumasJPorMes[index] += ((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.co2) / 1000) +
            (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.ch4) / 1000) * 30) +
            (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.n2o) / 1000) * 265);
          });
        }else{
          console.error('El reporte es null o no tiene la propiedad data');
        }
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
      labels:  this.mesesHastaActual,
      datasets: [{
        label: 'Generación Electricidad',
        data: data_electricidad,
        fill: false,
        borderColor: '#6A4588',
        backgroundColor: 'rgba(106, 69, 136, 0.3)',
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 15,
      }]
    };

    this.chart = new Chart ("radar",{
      type: 'radar' as ChartType,
      data: data,
      options: {}
    })
  }

}
