import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit{

  public chart: Chart | undefined;

  ngOnInit(): void {

    //console.log(this.getMonths(7));

    this.grafico();

  }

  grafico(){
    // datos
    const data = {
      labels: ['Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',],
      datasets: [{
        label: 'Consumo Agua',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      },
      {
        label: 'Electricidad',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };

    // Creamos la gráfica
    this.chart = new Chart("bar", {
      type: 'bar' as ChartType, // tipo de la gráfica
      data: data, // datos
      options: { // opciones de la gráfica
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
  }

  getMonths(count: number): any[] {
    const currentDate = new Date();
    const months: any[] = [];

    for (let i = 0; i < count; i++) {
      const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      months.push({
        index: i + 1,
        name: currentMonth.toLocaleString('default', { month: 'long' })
      });
    }

    return months;
  }

}
