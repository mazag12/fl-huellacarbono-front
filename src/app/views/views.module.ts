import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';

import { ListComponent } from './components/fna/list/list.component';
import { GeneracionElectricidadComponent } from './components/fna/generacion-electricidad/generacion-electricidad.component';
import { TransportePropioComponent } from './components/fna/transporte-propio/transporte-propio.component';
import { RefrigerantesComponent } from './components/fna/refrigerantes/refrigerantes.component';
import { ConsumoSeinComponent } from './components/fna/consumo-sein/consumo-sein.component';
import { FugasSf6Component } from './components/fna/fugas-sf6/fugas-sf6.component';
import { TransporteCasaTrabajoComponent } from './components/fna/transporte-casa-trabajo/transporte-casa-trabajo.component';
import { TransporteAereoComponent } from './components/fna/transporte-aereo/transporte-aereo.component';
import { TransporteTerrestreComponent } from './components/fna/transporte-terrestre/transporte-terrestre.component';
import { ConsumoPapelComponent } from './components/fna/consumo-papel/consumo-papel.component';
import { ConsumoAguaComponent } from './components/fna/consumo-agua/consumo-agua.component';
import { TransporteInsumosComponent } from './components/fna/transporte-insumos/transporte-insumos.component';
import { GeneracionResiduosComponent } from './components/fna/generacion-residuos/generacion-residuos.component';

import { ListaComponent } from './components/report/lista/lista.component';

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

import { GeneracionElectricidadReporteComponent } from './components/report/generacion-electricidad-reporte/generacion-electricidad-reporte.component';
import { RefrigerantesReporteComponent } from './components/report/refrigerantes-reporte/refrigerantes-reporte.component';
import { ConsumoAguaReporteComponent } from './components/report/consumo-agua-reporte/consumo-agua-reporte.component';
import { ConsumoPapelReporteComponent } from './components/report/consumo-papel-reporte/consumo-papel-reporte.component';
import { ConsumoSeinReporteComponent } from './components/report/consumo-sein-reporte/consumo-sein-reporte.component';
import { FugasSf6ReporteComponent } from './components/report/fugas-sf6-reporte/fugas-sf6-reporte.component';
import { GeneracionResiduosReporteComponent } from './components/report/generacion-residuos-reporte/generacion-residuos-reporte.component';
import { TransporteAereoReporteComponent } from './components/report/transporte-aereo-reporte/transporte-aereo-reporte.component';
import { TransporteCasaTrabajoReporteComponent } from './components/report/transporte-casa-trabajo-reporte/transporte-casa-trabajo-reporte.component';
import { TransporteInsumosReporteComponent } from './components/report/transporte-insumos-reporte/transporte-insumos-reporte.component';
import { TransportePropioReporteComponent } from './components/report/transporte-propio-reporte/transporte-propio-reporte.component';
import { TransporteTerrestreReporteComponent } from './components/report/transporte-terrestre-reporte/transporte-terrestre-reporte.component';
import { ElectricidadIngresarComponent } from './components/fna/generacion-electricidad/electricidad-ingresar/electricidad-ingresar.component';
import { ElectricidadReporteComponent } from './components/fna/generacion-electricidad/electricidad-reporte/electricidad-reporte.component';

@NgModule({
  declarations: [
    ListComponent,
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
    ListaComponent,
    GeneracionElectricidadReporteComponent,
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
