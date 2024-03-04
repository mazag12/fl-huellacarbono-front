import { AfterViewInit, Component, OnInit, ViewChild, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../auth/services/auth.service';

import { ElectricidadResponse } from 'src/app/views/interfaces';
import { ElectricidadService } from '../../services/electricidad.service';

import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-generacion-electricidad',
  templateUrl: './generacion-electricidad.component.html',
  styleUrls: ['./generacion-electricidad.component.scss']
})
export class GeneracionElectricidadComponent implements OnInit, AfterViewInit {

  constructor(
      private service: ElectricidadService ,
      public dialog: MatDialog,
      private _liveAnnouncer: LiveAnnouncer) {}

  displayedColumns: string[] = ['ID', 'Fecha', 'Factura', 'TipoCombustible', 'Unidad', 'Cantidad', 'Evidencia', 'accion'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public authService = inject ( AuthService );
  public user = computed( () => this.authService.currentUser() );
  public data: ElectricidadResponse[] = [];
  public dataSource: any = [];
  public length = 5;
  public pageIndex = 0;

  ngOnInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.get(5,this.pageIndex + 1);
    this.length = this.data.length = 5 ?  this.length + 5 : 5;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get(limit: number, page: number){
    this.service.obtener(limit,page)
    .subscribe( (reponse) => {
      this.data = reponse.data;
      this.dataSource = new MatTableDataSource(reponse.data);
    });
  }

  onPageChange(event: PageEvent) {
    this.length = (event.pageSize * (event.pageIndex + 2))+ 1;
    this.get(event.pageSize,event.pageIndex + 1);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
