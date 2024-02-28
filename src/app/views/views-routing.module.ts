import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/fna/list/list.component';
import { GeneracionElectricidadComponent } from './components/fna/generacion-electricidad/generacion-electricidad.component';
import { TransportePropioComponent } from './components/fna/transporte-propio/transporte-propio.component';
import { RefrigerantesComponent } from './components/fna/refrigerantes/refrigerantes.component';
import { FugasSf6Component } from './components/fna/fugas-sf6/fugas-sf6.component';
import { ConsumoSeinComponent } from './components/fna/consumo-sein/consumo-sein.component';
import { TransporteCasaTrabajoComponent } from './components/fna/transporte-casa-trabajo/transporte-casa-trabajo.component';
import { TransporteAereoComponent } from './components/fna/transporte-aereo/transporte-aereo.component';
import { TransporteTerrestreComponent } from './components/fna/transporte-terrestre/transporte-terrestre.component';
import { ConsumoPapelComponent } from './components/fna/consumo-papel/consumo-papel.component';
import { ConsumoAguaComponent } from './components/fna/consumo-agua/consumo-agua.component';
import { TransporteInsumosComponent } from './components/fna/transporte-insumos/transporte-insumos.component';
import { GeneracionResiduosComponent } from './components/fna/generacion-residuos/generacion-residuos.component';
import { ListaComponent } from './components/report/lista/lista.component';
import { GeneracionElectricidadReporteComponent } from './components/report/generacion-electricidad-reporte/generacion-electricidad-reporte.component';
import { TransportePropioReporteComponent } from './components/report/transporte-propio-reporte/transporte-propio-reporte.component';
import { RefrigerantesReporteComponent } from './components/report/refrigerantes-reporte/refrigerantes-reporte.component';
import { FugasSf6ReporteComponent } from './components/report/fugas-sf6-reporte/fugas-sf6-reporte.component';
import { ConsumoSeinReporteComponent } from './components/report/consumo-sein-reporte/consumo-sein-reporte.component';
import { TransporteCasaTrabajoReporteComponent } from './components/report/transporte-casa-trabajo-reporte/transporte-casa-trabajo-reporte.component';
import { TransporteAereoReporteComponent } from './components/report/transporte-aereo-reporte/transporte-aereo-reporte.component';
import { TransporteTerrestreReporteComponent } from './components/report/transporte-terrestre-reporte/transporte-terrestre-reporte.component';
import { ConsumoPapelReporteComponent } from './components/report/consumo-papel-reporte/consumo-papel-reporte.component';
import { ConsumoAguaReporteComponent } from './components/report/consumo-agua-reporte/consumo-agua-reporte.component';
import { TransporteInsumosReporteComponent } from './components/report/transporte-insumos-reporte/transporte-insumos-reporte.component';
import { GeneracionResiduosReporteComponent } from './components/report/generacion-residuos-reporte/generacion-residuos-reporte.component';
import { ElectricidadIngresarComponent } from './components/fna/generacion-electricidad/electricidad-ingresar/electricidad-ingresar.component';
import { ConsumoAguaIngresarComponent } from './components/fna/consumo-agua/consumo-agua-ingresar/consumo-agua-ingresar.component';


const routes: Routes = [
  {
    path: 'fna',
    children:[
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'electricidad',
        component: GeneracionElectricidadComponent,
      },
      {
        path: 'transportepropio',
        component: TransportePropioComponent,
      },
      {
        path: 'refrigerante',
        component: RefrigerantesComponent,
      },
      {
        path: 'fugas',
        component: FugasSf6Component,
      },
      {
        path: 'consumosein',
        component: ConsumoSeinComponent,
      },
      {
        path: 'transportecasa_trabajo',
        component: TransporteCasaTrabajoComponent,
      },
      {
        path: 'transporte_aere',
        component: TransporteAereoComponent,
      },
      {
        path: 'transporte_terrestre',
        component: TransporteTerrestreComponent,
      },
      {
        path: 'consumopapel',
        component: ConsumoPapelComponent,
      },
      {
        path: 'consumoagua',
        component: ConsumoAguaComponent,
      },
      {
        path: 'transporte_insumos',
        component: TransporteInsumosComponent,
      },
      {
        path: 'generacion_residuos',
        component: GeneracionResiduosComponent,
      },
    ]
  },
  {
    path: 'reporte',
    children:[
      {
        path: '',
        component: ListaComponent,
      },
      {
        path: 'electricidad',
        component: GeneracionElectricidadReporteComponent,
      },
      {
        path: 'transportepropio',
        component: TransportePropioReporteComponent,
      },
      {
        path: 'refrigerante',
        component: RefrigerantesReporteComponent,
      },
      {
        path: 'fugas',
        component: FugasSf6ReporteComponent,
      },
      {
        path: 'consumosein',
        component: ConsumoSeinReporteComponent,
      },
      {
        path: 'transportecasa_trabajo',
        component: TransporteCasaTrabajoReporteComponent,
      },
      {
        path: 'transporte_aere',
        component: TransporteAereoReporteComponent,
      },
      {
        path: 'transporte_terrestre',
        component: TransporteTerrestreReporteComponent,
      },
      {
        path: 'consumopapel',
        component: ConsumoPapelReporteComponent,
      },
      {
        path: 'consumoagua',
        component: ConsumoAguaReporteComponent,
      },
      {
        path: 'transporte_insumos',
        component: TransporteInsumosReporteComponent,
      },
      {
        path: 'generacion_residuos',
        component: GeneracionResiduosReporteComponent,
      },
    ]
  },
  {
    path: 'registrar',
    children:[
      {
        path: 'electricidad',
        component: ElectricidadIngresarComponent,
      },
      {
        path: 'transportepropio',
        component: TransportePropioComponent,
      },
      {
        path: 'refrigerante',
        component: RefrigerantesComponent,
      },
      {
        path: 'fugas',
        component: FugasSf6Component,
      },
      {
        path: 'consumosein',
        component: ConsumoSeinComponent,
      },
      {
        path: 'transportecasa_trabajo',
        component: TransporteCasaTrabajoComponent,
      },
      {
        path: 'transporte_aere',
        component: TransporteAereoComponent,
      },
      {
        path: 'transporte_terrestre',
        component: TransporteTerrestreComponent,
      },
      {
        path: 'consumopapel',
        component: ConsumoPapelComponent,
      },
      {
        path: 'consumoagua',
        component: ConsumoAguaIngresarComponent,
      },
      {
        path: 'transporte_insumos',
        component: TransporteInsumosComponent,
      },
      {
        path: 'generacion_residuos',
        component: GeneracionResiduosComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
