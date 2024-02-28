import { Component, ViewChild, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../auth/services/auth.service';

import { Agua } from 'src/app/views/interfaces';
import { AguaService } from '../../services/agua.service';

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

  public data: Agua[] = [];

  public dataSource: any = [];

  public length = 5;

  public pageIndex = 0;

  ngOnInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getelectricidad(5,this.pageIndex + 1);
    this.length = this.data.length = 5 ?  this.length + 5 : 5;
  }

  getelectricidad(limit: number, page: number){
    this.consumo_aguaservice.obtener(limit,page)
    .subscribe( (reponse) => {
      this.data = reponse.data;
      this.dataSource = new MatTableDataSource(reponse.data);
    });
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
}
