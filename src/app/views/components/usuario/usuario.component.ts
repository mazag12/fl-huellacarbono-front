import { Component, ViewChild, computed, inject } from '@angular/core';
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

public data: Row[] = [];

ngOnInit(): void{
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.get(this.length, this.pageIndex + 1);
}

get(limit: number, page: number){
  this.service.obtener(limit,page)
  .subscribe( (reponse) => {
    if (reponse && reponse.data) {
      this.data = reponse.data.rows;
      this.dataSource = new MatTableDataSource(this.data);
      if(reponse.data.count === 5){
        this.length = (limit * (page + 2))+ 1;
      }
    }
  });
}

onPageChange(event: PageEvent) {
  this.get(event.pageSize,event.pageIndex + 1);
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
