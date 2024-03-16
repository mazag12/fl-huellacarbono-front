import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { ElectricidadService } from 'src/app/views/services/electricidad.service';
import { forkJoin, filter } from 'rxjs';
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

  sumaTficina = new Array(this.numeroMes).fill(0);
  sumaTtienda = new Array(this.numeroMes).fill(0);
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

  sumaTFna = new  Array(2).fill(null).map(() => Array(this.numeroMes).fill(0));

  sumatotal = new Array(2).fill(0).map(() => new Array(this.numeroMes).fill(0));

  titulo = new Array(2).fill(0);

  DataRsponse: any[] = [];

  mesesHastaActual: string[] = [];

  PermisosDisponibles: any[] =  listaFna;

  listalocacion: any[] = listalocacion;

  fna: string = '';

  locacion: string = '';

  ngOnInit(): void {
    this.electricidad('',0);
    this.grafico(this.sumatotal, this.titulo);
  }

  obtenerMesesHastaActual(): string[] {
    const mesActual = new Date().getMonth();
    return meses.slice(0, mesActual + 1);
  }

  //TODO: SELECCIONAR LOS COMBO
  onSelectChange() {

    if(this.fna == '0' && this.locacion == ''){

    }else if(this.fna !== '0' && this.locacion == ''){
      switch (parseInt(this.fna)) {
        case 1:
          listalocacion.forEach(response => {
            this.generador_todos(response.nombre, response.id);
          })
          break;

        default:
          break;
      }
    }else if(this.fna !== '0' && this.locacion !== ''){
      this.generador( this.locacion, parseInt(this.fna));
    }
  }

  generador_todos(Localizacion: string, codigo: number){
    const requests = [];

    for (let mes = 1; mes < this.numeroMes + 1; mes++) {
      const request = this.service.reporte('MONTH', mes.toString(), Localizacion);
      requests.push(request);
    }

    if(codigo == 1){
      forkJoin(requests).subscribe(reportsArray => {
        reportsArray.forEach((reporte, index) => {
          if (reporte && reporte.data) {
          reporte.data.forEach(reportes => {
            this.sumaTficina[index] += ((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.co2) / 1000) +
            (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.ch4) / 1000) * 30) +
            (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.n2o) / 1000) * 265);
          });
          } else {
            console.error('El reporte es null o no tiene la propiedad data');
          }
        });
      });
    }else{
      forkJoin(requests).subscribe(reportsArray => {
        reportsArray.forEach((reporte, index) => {
          if (reporte && reporte.data) {
          reporte.data.forEach(reportes => {
            this.sumaTtienda[index] += ((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.co2) / 1000) +
            (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.ch4) / 1000) * 30) +
            (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.n2o) / 1000) * 265);
          });
          } else {
            console.error('El reporte es null o no tiene la propiedad data');
          }
        });
      });
    }
    this.graficoLocalidadTodo(this.sumaTficina, this.sumaTtienda);
  }


  generador(Localizacion: string, codigo: number){
    const requests = [];

    for (let mes = 1; mes < this.numeroMes + 1; mes++) {
      const request = this.service.reporte('MONTH', mes.toString(), Localizacion);
      requests.push(request);
    }

    forkJoin(requests).subscribe(reportsArray => {
      reportsArray.forEach((reporte, index) => {
        if (reporte && reporte.data) {
        reporte.data.forEach(reportes => {
          this.sumaTficina[index] += ((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.co2) / 1000) +
          (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.ch4) / 1000) * 30) +
          (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.n2o) / 1000) * 265);
        });
        } else {
          console.error('El reporte es null o no tiene la propiedad data');
        }
      });
    });

    this.generadorgrafico(this.sumaTficina, codigo);
  }

  electricidad(Localizacion: string, codigo: number){
    const requests = [];

    Localizacion = 'CD principal - Oficina';

    this.titulo[codigo] = Localizacion;

    for (let mes = 1; mes < this.numeroMes + 1; mes++) {
      const request = this.service.reporte('MONTH', mes.toString(), Localizacion);
      requests.push(request);
      console.log(mes);
    }

    forkJoin(requests).subscribe(reportsArray => {
      reportsArray.forEach((reporte, index) => {
        if (reporte && reporte.data) {
        reporte.data.forEach(reportes => {
          this.sumatotal[codigo][index] += ((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.co2) / 1000) +
          (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.ch4) / 1000) * 30) +
          (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.n2o) / 1000) * 265);
        });
        } else {
          console.error('El reporte es null o no tiene la propiedad data');
        }
      });
      console.log(this.sumatotal);
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


  graficoLocalidadTodo(oficina: any, tienda: any){

    this.mesesHastaActual = this.obtenerMesesHastaActual();

    const data = {
      labels: this.mesesHastaActual,
      datasets: [{
        label: 'Oficina: ',
        data: [
          1.5044520150000003,
          29.3124975,
          1635.089591996718
        ],
        borderColor: 'rgba(255, 165, 0, 1)',
        backgroundColor: 'rgba(255, 165, 0, 0.3)',
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 15,
        fill: true,
      },
      {
        label: 'Tienda: ',
        data: [
          0,
          0,
          2344.9998
      ],
        borderColor: 'rgba(125, 125, 18, 1)',
        backgroundColor: 'rgba(125, 125, 18, 0.3)',
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

  generadorgrafico(dataset: any, fna: number){

    this.mesesHastaActual = this.obtenerMesesHastaActual();

    const data_fna = listaFna.find(item => item.id === fna);

    const data = {
      labels: this.mesesHastaActual,
      datasets: [{
        label: data_fna.nombre,
        data: dataset,
        borderColor: 'rgba(255, 165, 0, 1)',
        backgroundColor: 'rgba(255, 165, 0, 0.3)',
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 15,
        fill: true,
      }]
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
