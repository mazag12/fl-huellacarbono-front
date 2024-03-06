import { Component, ViewChild, computed, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {
  constructor(
    private service: UsuarioService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) {}

displayedColumns: string[] = ['ID', 'Code', 'email', 'Nombre', 'activo', 'role', 'accion'];

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

public authService = inject ( AuthService );
public user = computed( () => this.authService.currentUser() );
public dataSource: any = [];

ngOnInit(): void{
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.get();
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

get(){
  this.service.obtener()
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
}
