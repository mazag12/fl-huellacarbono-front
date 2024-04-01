import { Component, OnInit, inject } from '@angular/core';
import { dias, meses } from '../../utils/constans';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  private authService = inject( AuthService );
  public user = this.authService.currentUser();

  fechaActual: any;

  constructor() {
    const fecha = new Date();
    const diaSemana = fecha.getDay();
    const dia = fecha.getDate();
    const mes = fecha.getMonth();
    const anio = fecha.getFullYear();
    this.fechaActual = `${dias[diaSemana]} ${dia}, ${meses[mes]} ${anio}`;
  }

}
