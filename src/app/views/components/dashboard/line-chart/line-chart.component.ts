import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { ElectricidadService } from 'src/app/views/services/electricidad.service';
import { forkJoin } from 'rxjs';
import { meses, listaFna, listalocacion } from 'src/app/views/utils/constans';
import { Localizacion } from '../../../utils/constans';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor(
    private service: ElectricidadService) {}

  chart: Chart | undefined;

  fechaActual = new Date();

  numeroMes = this.fechaActual.getMonth() + 1;

  sumaTElectricidad = new Array(this.numeroMes).fill(0);
  sumaTTransportePropio = new Array(this.numeroMes).fill(0);
  sumaTRefrigerante = new Array(this.numeroMes).fill(0);
  sumaTFugasSf6 = new Array(this.numeroMes).fill(0);
  sumaTConsumoElectricidad = new Array(this.numeroMes).fill(0);
  sumaTTraportecasatrabajo = new Array(this.numeroMes).fill(0);
  sumaTTransporteaereo = new Array(this.numeroMes).fill(0);
  sumaTConsumoPapel = new Array(this.numeroMes).fill(0);
  sumaTConsumoAgua = new Array(this.numeroMes).fill(0);
  sumaTTransporteInsumos = new Array(this.numeroMes).fill(0);
  sumaTGeneracionResiduos = new Array(this.numeroMes).fill(0);

  sumaTFna: { [key: string]: number[] } = {};

  DataRsponse: any[] = [];

  mesesHastaActual: string[] = [];

  PermisosDisponibles: any[] =  listaFna;

  listalocacion: any[] = listalocacion;

  fna: string = '';

  locacion: string = '';

  ngOnInit(): void {
    //this.generador_electricidad_todos('');
  }

  obtenerMesesHastaActual(): string[] {
    const mesActual = new Date().getMonth();
    return meses.slice(0, mesActual + 1);
  }

  onSelectChange() {
    if(this.fna == '0' && this.locacion == ''){

    }else if(this.fna !== '0' && this.locacion == ''){

      switch (parseInt(this.fna)) {
        case 1:
          listalocacion.forEach(response => {
            this.generador_electricidad_todos(response.id);
          })
          console.log(this.sumaTFna);
          break;

        default:
          break;
      }
    }else if(this.fna !== '0' && this.locacion !== ''){

    }

  }

  sin_registro(){
    this.grafico([0,0,0]);
  }

  generador_electricidad_todos(Localizacion: string){

    if (!this.sumaTFna[Localizacion]) {
      this.sumaTFna[Localizacion] = [];
    }

    const requests = [];

    for (let mes = 1; mes < this.numeroMes + 1; mes++) {
      const request = this.service.reporte('MONTH', mes.toString(), Localizacion);
      requests.push(request);

    }

    forkJoin(requests).subscribe(reportsArray => {
      reportsArray.forEach((reporte, index) => {
        if (reporte && reporte.data) {
        reporte.data.forEach(reportes => {
          this.sumaTFna[Localizacion][index] += ((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.co2) / 1000) +
          (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.ch4) / 1000) * 30) +
          (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.n2o) / 1000) * 265);

          const data = ((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.co2) / 1000) +
          (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.ch4) / 1000) * 30) +
          (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.n2o) / 1000) * 265);

          console.log(data);

        });
        } else {
          console.error('El reporte es null o no tiene la propiedad data');
        }
      });
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
      },
      {
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

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart ("line",{
      type: 'line',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip:{
            enabled: true
          },
        }
      }
    })

    this.chart.update();

  }
}
