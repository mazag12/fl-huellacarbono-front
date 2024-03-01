import { Component, OnInit, ViewChild, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../auth/services/auth.service';

import { Refrigerante } from 'src/app/views/interfaces';

import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RefrigerantesService } from '../../services/refrigerantes.service';

@Component({
  selector: 'app-refrigerantes',
  templateUrl: './refrigerantes.component.html',
  styleUrls: ['./refrigerantes.component.scss']
})
export class RefrigerantesComponent implements OnInit {
  constructor(
    private service: RefrigerantesService,
    public dialog: MatDialog) {}

  displayedColumns: string[] = ['ID', 'Fecha', 'Tipo', 'Unidad', 'Cantidad', 'Evidencia', 'accion'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public authService = inject ( AuthService );

  public user = computed( () => this.authService.currentUser() );

  public data: Refrigerante[] = [];

  public dataSource: any = [];

  public length = 5;

  public pageIndex = 0;

  ngOnInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.get(5,this.pageIndex + 1);
    this.length = this.data.length = 5 ?  this.length + 5 : 5;
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
