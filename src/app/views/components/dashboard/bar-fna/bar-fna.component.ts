import { Component, OnInit } from '@angular/core';
import { permisosDisponibles } from '../../../utils/constans';
import { ElectricidadService } from 'src/app/views/services/electricidad.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-bar-fna',
  templateUrl: './bar-fna.component.html',
  styleUrls: ['./bar-fna.component.scss']
})
export class BarFnaComponent implements OnInit {

  constructor(
    private service: ElectricidadService) {}

  PermisosDisponibles: any[] =  permisosDisponibles;

  public fechaActual = new Date();

  public numeroMes = this.fechaActual.getMonth() + 1;

  public fna_total = new Array(12).fill(0);

  ngOnInit(): void {
    const requests = [];

    //Generación Electricidad
    for (let mes = 1; mes < this.numeroMes + 1; mes++) {
      const request = this.service.reporte('MONTH', mes.toString());
      requests.push(request);
    }

    forkJoin(requests).subscribe(reportsArray => {
      reportsArray.forEach((reporte) => {
        reporte.data.forEach(reportes => {
          this.fna_total[1] += ((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.co2) / 1000) +
          (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.ch4) / 1000) * 30) +
          (((((reportes.factor === 0 ? reportes.cantidad : (reportes.cantidad * reportes.factor)) * reportes.valor_neto) * reportes.n2o) / 1000) * 265);
        });
      });
    });
    //Final de Generación de Electricidad

  }

}
