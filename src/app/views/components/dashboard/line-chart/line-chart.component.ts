import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { ElectricidadService } from 'src/app/views/services/electricidad.service';
import { forkJoin } from 'rxjs';
import { meses, permisosDisponibles } from 'src/app/views/utils/constans';

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

  public PermisosDisponibles: any[] =  permisosDisponibles;

  ngOnInit(): void {
    this.generador_electricidad();
  }

  obtenerMesesHastaActual(): string[] {
    const mesActual = new Date().getMonth();
    return meses.slice(0, mesActual + 1);
  }

  onSelectChange(selectedValue: any) {
    switch (selectedValue.value) {
      case 1:
        this.generador_electricidad();
        break;
      case 2:
        this.sin_registro();
        break;
      case 3:
        this.sin_registro();
        break;
      case 4:
        this.sin_registro();
        break;
      case 5:
        this.sin_registro();
        break;
      case 6:
        this.sin_registro();
        break;
      case 7:
        this.sin_registro();
        break;
      case 8:
        this.sin_registro();
        break;
      case 9:
        this.sin_registro();
        break;
      case 10:
        this.sin_registro();
        break;
      case 11:
        this.sin_registro();
        break;
      case 12:
        this.sin_registro();
        break;
      default:
        break;
    }
  }

  sin_registro(){
    this.grafico([0,0,0]);
  }

  generador_electricidad(){
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
        } else {
          console.error('El reporte es null o no tiene la propiedad data');
        }
      });
      this.grafico(this.sumasJPorMes);
    });
  }

  grafico(data_fna: any){

    this.mesesHastaActual = this.obtenerMesesHastaActual();

    const data = {
      labels: this.mesesHastaActual,
      datasets: [{
        data: data_fna,
        borderColor: 'rgba(255, 165, 0, 1)',
        backgroundColor: 'rgba(255, 165, 0, 0.3)',
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 15,
        fill: true,
      }
    ]
    };
    this.chart = new Chart ("line",{
      type: 'line' as ChartType,
      data: data,
      options: {
      }
    })
  }
}
