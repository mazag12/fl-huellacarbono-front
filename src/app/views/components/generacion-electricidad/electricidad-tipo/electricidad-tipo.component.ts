import { AfterViewInit, Component, OnInit, ViewChild, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';

import { TipoElectricidadResponse, TipoElectricidad } from 'src/app/views/interfaces';
import { ElectricidadService } from 'src/app/views/services/electricidad.service';

import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';

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
    id:           new FormControl<string>(''),
    nombre:       new FormControl<string>('',[Validators.required, Validators.maxLength(25)]),
    unidad:       new FormControl<string>('',[Validators.required]),
    factor:       new FormControl<number>(0,[Validators.required, Validators.pattern('^([0-9]{1,10}(\.[0-9]{1,8})?)$')]),
    valor_neto:   new FormControl<number>(0,[Validators.required, Validators.pattern('^([0-9]{1,10}(\.[0-9]{1,8})?)$')]),
    co2:          new FormControl<number>(0,[Validators.required, Validators.pattern('^([0-9]{1,10}(\.[0-9]{1,8})?)$')]),
    ch4:          new FormControl<number>(0,[Validators.required, Validators.pattern('^([0-9]{1,10}(\.[0-9]{1,8})?)$')]),
    n2o:          new FormControl<number>(0,[Validators.required, Validators.pattern('^([0-9]{1,10}(\.[0-9]{1,8})?)$')]),
    flag_activo:  new FormControl<boolean>(true),
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
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Paginación';
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
    const data = this.Form.value as TipoElectricidad;
    this.service.ingresar_actualizar_tipo(data)
    .subscribe(response => { response });

    const dataAdaptada = {
      id:           '',
      nombre:       "",
      unidad:       "",
      factor:       0,
      valor_neto:   0,
      co2:          0,
      ch4:          0,
      n2o:          0,
    };
    this.Form.patchValue(dataAdaptada);

    this.get();

    Swal.fire({
      title: "Se guardo correctamente",
      icon: "success"
    });
  }

  edit(id: string){
    this.service.tipo()
    .subscribe( (response) => {
      const datoConId1 = response.data.find(item => item.id === id);
      const dataAdaptada = {
        id:           datoConId1?.id,
        nombre:       datoConId1?.nombre,
        unidad:       datoConId1?.unidad,
        factor:       datoConId1?.factor,
        valor_neto:   datoConId1?.valor_neto,
        co2:          datoConId1?.co2,
        ch4:          datoConId1?.ch4,
        n2o:          datoConId1?.n2o,
      };
      this.Form.patchValue(dataAdaptada);
    });
  }

  eliminar(id: string){
    Swal.fire({
      title: "ELIMINAR",
      text: "¿Estas Seguro que deseas eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

}
