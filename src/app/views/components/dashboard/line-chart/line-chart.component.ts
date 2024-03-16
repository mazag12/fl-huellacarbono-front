import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ElectricidadService } from 'src/app/views/services/electricidad.service';
import { forkJoin } from 'rxjs';
import { meses, listaFna, listalocacion } from 'src/app/views/utils/constans';

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

  //TODO: ESTAS VARIABLES SON PARA LAS 2 FNA
  sumatotal = new Array(2).fill(0).map(() => new Array(this.numeroMes).fill(0));
  titulo = new Array(2).fill(0);

  //TODO: VALORES DE LISTADO
  PermisosDisponibles: any[] =  listaFna;
  listalocacion: any[] = listalocacion;

  //TODO: VALORES
  mesesHastaActual: string[] = [];
  fna: string = '0';
  locacion: string = '';

  ngOnInit(): void {
    this.onSelectChange();
  }

  obtenerMesesHastaActual(): string[] {
    const mesActual = new Date().getMonth();
    return meses.slice(0, mesActual + 1);
  }

  limpiarDatos() {
    this.sumatotal = [[0,0,0], [0,0,0]];
    this.titulo = ['', ''];
  }

  //TODO: SELECCIONAR LOS COMBO
  onSelectChange() {
    this.limpiarDatos();
    if(this.fna == '0' && this.locacion == ''){
      //TODO: DEBE APARECER LA SUMA TOTAL DE LAS 2 LOCALIDADES
      this.listalocacion.forEach(response => {
            this.electricidad(response.nombre, response.id);
      });
    }else if(this.fna !== '0' && this.locacion == ''){
      //TODO: DEBE APARECER SOLO EL FNA CON LAS 2 LOCALIDADES
      switch (parseInt(this.fna)) {
        case 1:
          this.listalocacion.forEach(response => {
            this.electricidad(response.nombre, response.id);
          });
          break;

        default:
          break;
      }
    }else if(this.fna !== '0' && this.locacion !== ''){
      //TODO: DEBE APARECER SOLO UN FNA Y UNA
      const locaciones = this.listalocacion.find(elemento => elemento.nombre === this.locacion);
      switch (parseInt(this.fna)) {
        case 1:
            this.electricidad(this.locacion,locaciones.id);
          break;

        default:
          break;
      }
    }
  }

  electricidad(Localizacion: string, codigo: number){
    const requests = [];
    this.titulo[codigo-1] = Localizacion;
    for (let mes = 1; mes < this.numeroMes + 1; mes++) {
      const request = this.service.reporte('MONTH', mes.toString(), Localizacion);
      requests.push(request);
    }

    forkJoin(requests).subscribe(reportsArray => {
      reportsArray.forEach((reporte, index) => {
        if (reporte && reporte.data) {
        reporte.data.forEach(reportes => {
          this.sumatotal[codigo-1][index] += ((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.co2) / 1000) +
          (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.ch4) / 1000) * 30) +
          (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.n2o) / 1000) * 265);
        });
        } else {
          console.error('El reporte es null o no tiene la propiedad data');
        }
      });
      this.grafico(this.sumatotal, this.titulo);
    });
  }

  grafico(dataset: any, title: any){
    this.mesesHastaActual = this.obtenerMesesHastaActual();
    const data = {
      labels: this.mesesHastaActual,
      datasets: [{
        label: title[0],
        data: dataset[0],
        borderColor: 'rgba(0, 113, 206, 1)',
        backgroundColor: 'rgba(0, 113, 206, 0.75)',
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 15,
        fill: true,
      },
      {
        label: title[1],
        data: dataset[1],
        borderColor: 'rgba(255, 181, 71, 1)',
        backgroundColor: 'rgba(255, 181, 71, 0.75)',
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
