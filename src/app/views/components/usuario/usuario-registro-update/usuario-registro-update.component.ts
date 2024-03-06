import { Component, OnInit, computed, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuarioService } from 'src/app/views/services/usuario.service';
import Swal from 'sweetalert2';
import {permisosDisponibles} from '../../../utils/constans';

@Component({
  selector: 'app-usuario-registro-update',
  templateUrl: './usuario-registro-update.component.html',
  styleUrls: ['./usuario-registro-update.component.scss']
})
export class UsuarioRegistroUpdateComponent implements OnInit{
  constructor(
    private service: UsuarioService ,
    private router:Router,
    private activatedRoute:ActivatedRoute) {}

  private authService = inject ( AuthService );

  public user = computed( () => this.authService.currentUser() );
  public permisosGuardados: string = '';
  public permisosDisponibles: any[] = permisosDisponibles;
  permisosMarcados: string[] = [];

  public Form: any;
  public data:UserData[] = [];

  id: any;

  ngOnInit(): void{

    this.id = this.activatedRoute.snapshot.params['id'];


    this.Form = new FormGroup({
      id:                   new FormControl<string>('0'),
      code:                 new FormControl<string>('0',[Validators.min(1), Validators.pattern('^([0-9]{1,10}(\.[0-9]{1,2})?)$')]),
      email:                new FormControl<string>('',[Validators.required, Validators.email]),
      nombre:               new FormControl<string>('',[Validators.required, Validators.pattern('^([a-zA-Z\s ]{2,250})$'), Validators.min(3), Validators.maxLength(200)]),
      apellido:             new FormControl<string>('',[Validators.required, Validators.pattern('^([a-zA-Z\s ]{2,250})$'), Validators.min(3), Validators.maxLength(200)]),
      isActive:             new FormControl<boolean>(true,[Validators.required]),
      role:                 new FormControl<string>('',[Validators.required]),
    })

    this.service.obtenerbyid(this.id)
    .subscribe (response => {
      const dataAdaptada = {
        id:           response.data.id,
        code:         response.data.code,
        email:        response.data.email,
        nombre:       response.data.nombre,
        apellido:     response.data.apellido,
        isActive:     response.data.isActive,
        role:         response.data.role,
      };
      const datos = response.data.permissions;
      this.permisosGuardados = datos.split(',').toString();
      this. permisosMarcados = datos.split(',');
      this.Form.patchValue(dataAdaptada)
    });

  }

  onSubmit():void{
    let data =  this.Form.value as UserData;

    data.permissions =  this.permisosMarcados.toString();

    this.service.update( data )
      .subscribe({
        // TODO: mostrar snackbar, y navegar a /electricidad/editar/electricidad.id
        error: (err) => {
          Swal.fire({
            title: "El Dato que ingresaste esta Incorrecto",
            icon: "error"
          });
        },
      complete: () => {

        const dataAdaptada = {
          id:           '0',
          code:         '0',
          email:        '',
          nombre:       '',
          apellido:     '',
          isActive:     true,
          role:         'USER',
        };
        this.Form.patchValue(dataAdaptada);
          Swal.fire({
            title: "Se guardo correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 3500
          });
          this.router.navigate(['/dashboard/emisiones/usuario/lista']);
        }
      });
  }

  actualizarPermisosMarcados(permisoId: string) {
    const permiso = ''+permisoId;
    if (this.permisosMarcados.includes(permiso)) {
      this.permisosMarcados = this.permisosMarcados.filter(id => id !== permiso);
    } else {
      this.permisosMarcados.push(permiso);
    }
  }

}
