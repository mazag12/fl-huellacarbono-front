import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFnaComponent } from './components/listar_fna/list.component';
import { GeneracionElectricidadComponent } from './components/generacion-electricidad/generacion-electricidad.component';
import { TransportePropioComponent } from './components/transporte-propio/transporte-propio.component';
import { RefrigerantesComponent } from './components/refrigerantes/refrigerantes.component';
import { FugasSf6Component } from './components/fugas-sf6/fugas-sf6.component';
import { ConsumoSeinComponent } from './components/consumo-sein/consumo-sein.component';
import { TransporteCasaTrabajoComponent } from './components/transporte-casa-trabajo/transporte-casa-trabajo.component';
import { TransporteAereoComponent } from './components/transporte-aereo/transporte-aereo.component';
import { TransporteTerrestreComponent } from './components/transporte-terrestre/transporte-terrestre.component';
import { ConsumoPapelComponent } from './components/consumo-papel/consumo-papel.component';
import { ConsumoAguaComponent } from './components/consumo-agua/consumo-agua.component';
import { TransporteInsumosComponent } from './components/transporte-insumos/transporte-insumos.component';
import { GeneracionResiduosComponent } from './components/generacion-residuos/generacion-residuos.component';
import { ElectricidadIngresarComponent } from './components/generacion-electricidad/electricidad-ingresar/electricidad-ingresar.component';
import { ConsumoAguaIngresarComponent } from './components/consumo-agua/consumo-agua-ingresar/consumo-agua-ingresar.component';
import { GeneracionResiduosReporteComponent } from './components/generacion-residuos/generacion-residuos-reporte/generacion-residuos-reporte.component';
import { TransporteInsumosReporteComponent } from './components/transporte-insumos/transporte-insumos-reporte/transporte-insumos-reporte.component';
import { ConsumoAguaReporteComponent } from './components/consumo-agua/consumo-agua-reporte/consumo-agua-reporte.component';
import { ConsumoPapelReporteComponent } from './components/consumo-papel/consumo-papel-reporte/consumo-papel-reporte.component';
import { TransporteTerrestreReporteComponent } from './components/transporte-terrestre/transporte-terrestre-reporte/transporte-terrestre-reporte.component';
import { TransporteCasaTrabajoReporteComponent } from './components/transporte-casa-trabajo/transporte-casa-trabajo-reporte/transporte-casa-trabajo-reporte.component';
import { TransporteAereoReporteComponent } from './components/transporte-aereo/transporte-aereo-reporte/transporte-aereo-reporte.component';
import { ConsumoSeinReporteComponent } from './components/consumo-sein/consumo-sein-reporte/consumo-sein-reporte.component';
import { FugasSf6ReporteComponent } from './components/fugas-sf6/fugas-sf6-reporte/fugas-sf6-reporte.component';
import { RefrigerantesReporteComponent } from './components/refrigerantes/refrigerantes-reporte/refrigerantes-reporte.component';
import { TransportePropioReporteComponent } from './components/transporte-propio/transporte-propio-reporte/transporte-propio-reporte.component';
import { ListaReporteComponent } from './components/listar_reporte/lista.component';
import { ElectricidadReporteComponent } from './components/generacion-electricidad/electricidad-reporte/electricidad-reporte.component';

const routes: Routes = [
  {
    path: 'fna',
    children:[
      {
        path: '',
        component: ListFnaComponent,
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
        component: ListaReporteComponent,
      },
      {
        path: 'electricidad',
        component: ElectricidadReporteComponent,
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