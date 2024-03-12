import { AfterViewInit, Component, OnInit, ViewChild, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';

import { TipoElectricidadResponse } from 'src/app/views/interfaces';
import { ElectricidadService } from 'src/app/views/services/electricidad.service';

import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-electricidad-tipo',
  templateUrl: './electricidad-tipo.component.html',
  styleUrls: ['./electricidad-tipo.component.scss']
})
export class ElectricidadTipoComponent {
  constructor(
    private service: ElectricidadService) {}

  displayedColumns: string[] = ['id', 'nombre', 'unidad', 'factor', 'valor_neto', 'co2', 'ch4', 'n2o','activo','accion'];


  public Form = new FormGroup({
    id:                   new FormControl<string>('0'),
    nombre: new FormControl<string>('0',[Validators.min(1)]),
    unidad:             new FormControl<number>(0,[Validators.required, Validators.min(1),Validators.pattern('^([0-9]{1,10}(\.[0-9]{1,2})?)$')]),
    factor:        new FormControl<string>('',[Validators.required]),
    valor_neto:              new FormControl<string>('',[Validators.required, Validators.pattern('[A-Z0-9-]*')]),
    area:                 new FormControl<string>('',[Validators.required]),
    evidencia_url:        new FormControl<string>('',[Validators.required, Validators.pattern('(ftp|http|https):\/\/[^ "]*')]),
  })


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public authService = inject ( AuthService );
  public user = computed( () => this.authService.currentUser() );
  public data: TipoElectricidadResponse[] = [];
  public dataSource: any = [];
  public pageSize = 5;

  ngOnInit(): void{
    this.get();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get(){
    this.service.tipo()
    .subscribe( (reponse) => {
      this.dataSource = new MatTableDataSource(reponse.data);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit(){

  }
}
