import { Component, OnInit, computed, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData, UserRegister, UserbyIDData } from 'src/app/auth/interfaces';
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
    private service: UsuarioService,
    private router:Router,
    private activatedRoute:ActivatedRoute) {}

  private authService = inject ( AuthService );

  public user = computed( () => this.authService.currentUser() );
  public permisosGuardados: string = '';
  public permisosDisponibles: any[] = permisosDisponibles;
  permisosMarcados: string[] = [];

  datos_personal: UserbyIDData[] = [];

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
      accesos: new FormControl<any[]>([],[Validators.required]),
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
      for (let permiso of this.permisosDisponibles) {
        for (let acceso of response.data.accesos) {
            const accesoId = parseInt(acceso.modulo_id)
            if (permiso.id == accesoId) {
                this.actualizarPermisosMarcados(permiso);
            }
        }
      }
      this.datos_personal.push(response.data);
      this.Form.patchValue(dataAdaptada)
    });
  }

  resetFormState(): void {
    const dataAdaptada = {
      id:           '0',
      code:         '0',
      email:        '',
      nombre:       '',
      apellido:     '',
      isActive:     true,
      role:         'USER',
      accesos: [],
    };

    this.permisosMarcados = [];

    for (let permiso of this.permisosDisponibles) {
      permiso.check = false;
    }

    this.Form.patchValue(dataAdaptada);
  }

  navigateBackToUserList(): void {
    this.router.navigate(['/dashboard/emisiones/usuario/lista']);
    this.resetFormState();
  }

  onSubmit():void{

    this.datos_personal.forEach(response => {
      response.accesos.forEach(data => {
      const existe  = this.permisosMarcados.filter(id => id  == data.modulo_id);
      if(existe.length === 0){
        this.service.deleteAcceso(data.id)
        .subscribe(
          (error) => {
            Swal.fire({
              title: error.error.data[0],
              icon: "error"
            })
          }
        );
      }else{
        const auxData = {
          id: 1,
          user_id: this.id,
          modulo_id: data.modulo_id
        }
        this.service.registerAcceso( auxData )
        .subscribe({
          error: (err) => {
            console.log(err)
            Swal.fire({
              title: err.error.data[0],
              icon: "error"
            })
          }
        });
      }
      })
    })
  }

  actualizarPermisosMarcados(permisoData: any) {
    const permiso = ""+permisoData.id;

    if (this.permisosMarcados.includes(permiso)) {
      permisoData.check = false;
      this.permisosMarcados = this.permisosMarcados.filter(id => id !== permiso);
    } else {
      permisoData.check = true;
      this.permisosMarcados.push(permiso);
    }
    this.Form.get('accesos').setValue(this.permisosMarcados);
  }

}
