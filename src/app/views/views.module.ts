import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';

import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import {NgFor} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

import { ListFnaComponent } from './components/listar_fna/list.component';
import { GeneracionElectricidadComponent } from './components/generacion-electricidad/generacion-electricidad.component';
import { TransportePropioComponent } from './components/transporte-propio/transporte-propio.component';
import { RefrigerantesComponent } from './components/refrigerantes/refrigerantes.component';
import { ConsumoSeinComponent } from './components/consumo-sein/consumo-sein.component';
import { FugasSf6Component } from './components/fugas-sf6/fugas-sf6.component';
import { TransporteCasaTrabajoComponent } from './components/transporte-casa-trabajo/transporte-casa-trabajo.component';
import { TransporteAereoComponent } from './components/transporte-aereo/transporte-aereo.component';
import { TransporteTerrestreComponent } from './components/transporte-terrestre/transporte-terrestre.component';
import { ConsumoPapelComponent } from './components/consumo-papel/consumo-papel.component';
import { ConsumoAguaComponent } from './components/consumo-agua/consumo-agua.component';
import { TransporteInsumosComponent } from './components/transporte-insumos/transporte-insumos.component';
import { GeneracionResiduosComponent } from './components/generacion-residuos/generacion-residuos.component';
import { ListaReporteComponent } from './components/listar_reporte/lista.component';
import { RefrigerantesReporteComponent } from './components/refrigerantes/refrigerantes-reporte/refrigerantes-reporte.component';
import { ConsumoAguaReporteComponent } from './components/consumo-agua/consumo-agua-reporte/consumo-agua-reporte.component';
import { ConsumoPapelReporteComponent } from './components/consumo-papel/consumo-papel-reporte/consumo-papel-reporte.component';
import { ConsumoSeinReporteComponent } from './components/consumo-sein/consumo-sein-reporte/consumo-sein-reporte.component';
import { FugasSf6ReporteComponent } from './components/fugas-sf6/fugas-sf6-reporte/fugas-sf6-reporte.component';
import { GeneracionResiduosReporteComponent } from './components/generacion-residuos/generacion-residuos-reporte/generacion-residuos-reporte.component';
import { TransporteAereoReporteComponent } from './components/transporte-aereo/transporte-aereo-reporte/transporte-aereo-reporte.component';
import { TransporteInsumosReporteComponent } from './components/transporte-insumos/transporte-insumos-reporte/transporte-insumos-reporte.component';
import { TransporteCasaTrabajoReporteComponent } from './components/transporte-casa-trabajo/transporte-casa-trabajo-reporte/transporte-casa-trabajo-reporte.component';
import { TransportePropioReporteComponent } from './components/transporte-propio/transporte-propio-reporte/transporte-propio-reporte.component';
import { TransporteTerrestreReporteComponent } from './components/transporte-terrestre/transporte-terrestre-reporte/transporte-terrestre-reporte.component';
import { ElectricidadIngresarComponent } from './components/generacion-electricidad/electricidad-ingresar/electricidad-ingresar.component';
import { ElectricidadReporteComponent } from './components/generacion-electricidad/electricidad-reporte/electricidad-reporte.component';
import { ConsumoAguaIngresarComponent } from './components/consumo-agua/consumo-agua-ingresar/consumo-agua-ingresar.component';
import { TransportePropioRegistrarComponent } from './components/transporte-propio/transporte-propio-registrar/transporte-propio-registrar.component';
import { RefrigerantesRegistrarComponent } from './components/refrigerantes/refrigerantes-registrar/refrigerantes-registrar.component';
import { ElectricidadTipoComponent } from './components/generacion-electricidad/electricidad-tipo/electricidad-tipo.component';
import { BarChartComponent } from './components/dashboard/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/dashboard/line-chart/line-chart.component';
import { PolarAreaChartComponent } from './components/dashboard/polar-area-chart/polar-area-chart.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioRegistroUpdateComponent } from './components/usuario/usuario-registro-update/usuario-registro-update.component';
import { UsuarioInsertComponent } from './components/usuario/usuario-insert/usuario-insert.component';
import { BarFnaComponent } from './components/dashboard/bar-fna/bar-fna.component';
import { StatusComponent } from './components/dashboard/status/status.component';

@NgModule({
  declarations: [
    ListFnaComponent,
    GeneracionElectricidadComponent,
    TransportePropioComponent,
    RefrigerantesComponent,
    ConsumoSeinComponent,
    FugasSf6Component,
    TransporteCasaTrabajoComponent,
    TransporteAereoComponent,
    TransporteTerrestreComponent,
    ConsumoPapelComponent,
    ConsumoAguaComponent,
    TransporteInsumosComponent,
    GeneracionResiduosComponent,
    DashboardComponent,
    ListaReporteComponent,
    RefrigerantesReporteComponent,
    ConsumoAguaReporteComponent,
    ConsumoPapelReporteComponent,
    ConsumoSeinReporteComponent,
    FugasSf6ReporteComponent,
    GeneracionResiduosReporteComponent,
    TransporteAereoReporteComponent,
    TransporteCasaTrabajoReporteComponent,
    TransporteInsumosReporteComponent,
    TransportePropioReporteComponent,
    TransporteTerrestreReporteComponent,
    ElectricidadIngresarComponent,
    ElectricidadReporteComponent,
    ConsumoAguaIngresarComponent,
    TransportePropioRegistrarComponent,
    RefrigerantesRegistrarComponent,
    ElectricidadTipoComponent,
    BarChartComponent,
    LineChartComponent,
    PolarAreaChartComponent,
    UsuarioComponent,
    UsuarioRegistroUpdateComponent,
    UsuarioInsertComponent,
    BarFnaComponent,
    StatusComponent,
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgFor,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ],

})
export class ViewsModule { }
