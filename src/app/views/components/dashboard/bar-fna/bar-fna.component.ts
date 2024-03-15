import { Component, OnInit } from '@angular/core';
import { listaFna } from '../../../utils/constans';
import { ElectricidadService } from 'src/app/views/services/electricidad.service';
import { forkJoin } from 'rxjs';
import { AguaService } from 'src/app/views/services/agua.service';

@Component({
  selector: 'app-bar-fna',
  templateUrl: './bar-fna.component.html',
  styleUrls: ['./bar-fna.component.scss']
})
export class BarFnaComponent implements OnInit {

  constructor(
    private serviceelectricidad: ElectricidadService,
    private serviceagua: AguaService) {}

  Listadofna: any[] =  listaFna;

  fechaActual = new Date();

  numeroMes = this.fechaActual.getMonth() + 1;

  ngOnInit(): void {
    const gelectricidad = [];

    const agua = [];

    //Generación Electricidad
    for (let mes = 1; mes < this.numeroMes + 1; mes++) {
      const electricidadrequest = this.serviceelectricidad.reporte('MONTH', mes.toString());
      const aguarequest = this.serviceagua.reporte('MONTH', mes.toString());

      gelectricidad.push(electricidadrequest);
      agua.push(aguarequest);

    }
    //TODO: GENERACION DE ELECTRICIDAD
    forkJoin(gelectricidad).subscribe(reportsArray => {
      reportsArray.forEach((reporte) => {
        if (reporte && reporte.data) {
          reporte.data.forEach(reportes => {
            this.Listadofna[0].cantidad += ((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.co2) / 1000) +
            (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.ch4) / 1000) * 30) +
            (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.n2o) / 1000) * 265);
          });
        }else{
          console.error('El reporte es null o no tiene la propiedad data');
        }
      });
      this.Listadofna.sort((a, b) => b.cantidad - a.cantidad);
    });

    //TODO: Transporte propio


    //TODO: AGUA
    forkJoin(agua).subscribe(reportsArray => {
      reportsArray.forEach((reporte) => {
        if (reporte && reporte.data) {
          reporte.data.forEach(reportes => {
            this.Listadofna[9].cantidad += (reportes.cantidad * 0.34 )/1000;
          });
        }else{
          console.error('El reporte es null o no tiene la propiedad data');
        }
      });
      this.Listadofna.sort((a, b) => b.cantidad - a.cantidad);
    });

  }

}
