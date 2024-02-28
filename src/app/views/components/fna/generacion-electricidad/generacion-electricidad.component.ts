import { Component, OnInit, ViewChild, computed, inject, AfterViewInit  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import Swal from 'sweetalert2';
import { read, utils } from 'xlsx';
import { AuthService } from '../../../../auth/services/auth.service';

import { ElectricidadResponse, ElectricidadRegister } from 'src/app/views/interfaces';
import { ElectricidadService } from '../../../services/electricidad.service';

import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-generacion-electricidad',
  templateUrl: './generacion-electricidad.component.html',
  styleUrls: ['./generacion-electricidad.component.scss']
})
export class GeneracionElectricidadComponent implements OnInit{

  constructor(
      private electricidadservice: ElectricidadService ,
      public dialog: MatDialog) {}

  displayedColumns: string[] = ['ID', 'Fecha', 'Factura', 'TipoCombustible', 'Unidad', 'Cantidad', 'Evidencia', 'accion'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public authService = inject ( AuthService );

  public user = computed( () => this.authService.currentUser() );

  public electricidades: ElectricidadResponse[] = [];

  public dataSource: any = [];

  public length = 5;

  public pageIndex = 0;

  public ElectricidadForm = new FormGroup({
    id:                   new FormControl<number>(0),
    tipo_electricidad_id: new FormControl<number>(0,[Validators.min(1)]),
    cantidad:             new FormControl<number>(0,[Validators.required, Validators.min(1)]),
    fecha_ingreso:        new FormControl<string>('',[Validators.required]),
    factura:              new FormControl<string>('',[Validators.required]),
    area:                 new FormControl<string>('',[Validators.required]),
    evidencia_url:        new FormControl<string>(''),
  })

  ngOnInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getelectricidad(5,this.pageIndex + 1);
    this.length = this.electricidades.length = 5 ?  this.length + 5 : 5;
  }

  getelectricidad(limit: number, page: number){
    this.electricidadservice.obtener_Electricidad(limit,page)
    .subscribe( (reponse) => {
      this.electricidades = reponse.data;
      this.dataSource = new MatTableDataSource(reponse.data);
    });
  }

  getcurrentElectricidad() : ElectricidadRegister{
    this.ElectricidadForm.value.fecha_ingreso = new Date("" + this.ElectricidadForm.controls.fecha_ingreso.value).toISOString();
    return this.ElectricidadForm.value as ElectricidadRegister;
  }

  onPageChange(event: PageEvent) {
    this.length = (event.pageSize * (event.pageIndex + 2))+ 1;
    this.getelectricidad(event.pageSize,event.pageIndex + 1);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateElectricidad(id: number){

    this.electricidadservice.obtener_Electricidad(5,1)
    .subscribe( (reponse) => {
      this.electricidades = reponse.data;
      this.dataSource = new MatTableDataSource(reponse.data);
    });

    this.getelectricidad(5,1);
  }

}
