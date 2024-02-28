import { Component, OnInit, ViewChild, computed, inject, AfterViewInit  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../auth/services/auth.service';

import { Agua, ConsumoaguaRegister } from 'src/app/views/interfaces';
import { AguaService } from '../../../services/agua.service';

import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-consumo-agua',
  templateUrl: './consumo-agua.component.html',
  styleUrls: ['./consumo-agua.component.scss']
})
export class ConsumoAguaComponent {
  constructor(
    private consumo_aguaservice: AguaService ,
    public dialog: MatDialog) {}

  displayedColumns: string[] = ['ID', 'Fecha', 'Medidor', 'Area', 'Cantidad', 'Evidencia', 'accion'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public authService = inject ( AuthService );

  public user = computed( () => this.authService.currentUser() );

  public electricidades: Agua[] = [];

  public dataSource: any = [];

  public length = 5;

  public pageIndex = 0;

  public Form = new FormGroup({
    id:                   new FormControl<number>(0),
    medidor:              new FormControl<number>(0,[Validators.min(1)]),
    cantidad:             new FormControl<number>(0,[Validators.required, Validators.min(1)]),
    fecha_ingreso:        new FormControl<string>('',[Validators.required]),
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
    this.consumo_aguaservice.obtener(limit,page)
    .subscribe( (reponse) => {
      this.electricidades = reponse.data;
      this.dataSource = new MatTableDataSource(reponse.data);
    });
  }

  getcurrentElectricidad() : ConsumoaguaRegister{
    this.Form.value.fecha_ingreso = new Date("" + this.Form.controls.fecha_ingreso.value).toISOString();
    return this.Form.value as ConsumoaguaRegister;
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

    this.consumo_aguaservice.obtener(5,1)
    .subscribe( (reponse) => {
      this.electricidades = reponse.data;
      this.dataSource = new MatTableDataSource(reponse.data);
    });

    this.getelectricidad(5,1);
  }
}
