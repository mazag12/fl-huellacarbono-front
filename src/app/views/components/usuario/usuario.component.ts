import { Component, ViewChild, NgModule, computed, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Row } from 'src/app/auth/interfaces';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {
  constructor(
    private service: UsuarioService,
    public dialog: MatDialog) {}

displayedColumns: string[] = ['ID', 'Code', 'email', 'Nombre', 'activo', 'role', 'accion'];

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

public authService = inject ( AuthService );
public user = computed( () => this.authService.currentUser() );
public dataSource: any = [];
public length = 5;
public pageIndex = 0;
public filterValue: string = '';
public data: Row[] = [];

ngOnInit(): void{
  this.get(this.length, this.pageIndex + 1 );
}

get(limit: number, page: number, textFilter?: string){
    let totalData: any;
    this.service.obtener(limit, page, textFilter)
    .subscribe( (reponse) => {
      if (reponse && reponse.data) {
        this.data = reponse.data.rows;
        totalData = reponse.data.count
        this.dataSource = new MatTableDataSource(this.data);
        this.length = totalData;
      }
    });
}

onPageChange(event: PageEvent) {
  this.get(event.pageSize,event.pageIndex + 1, this.filterValue);
}

applyFilter() {
  this.length = 5
  this.get(this.length, this.pageIndex + 1, this.filterValue);
}


}
