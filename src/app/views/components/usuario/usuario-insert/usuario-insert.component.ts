import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuarioService } from 'src/app/views/services/usuario.service';
import Swal from 'sweetalert2';
import { ModuloService } from 'src/app/views/services/modulo.service';

@Component({
  selector: 'app-usuario-insert',
  templateUrl: './usuario-insert.component.html',
  styleUrls: ['./usuario-insert.component.scss']
})
export class UsuarioInsertComponent {
  constructor(
    private service: UsuarioService ,
    private router:Router,
    private user: AuthService,
    private serviceModule: ModuloService) {}

  permisosMarcados: any[] = [];
  permisosDisponibles: any;
  sinpermisosDisponibles: any;
  Form: any;
  data:UserRegister[] = [];
  id: any;

  ngOnInit(): void{
    this.Form = new FormGroup({
      code:                 new FormControl<string>('0',[Validators.min(1), Validators.pattern('^([0-9]{1,10}(\.[0-9]{1,2})?)$')]),
      email:                new FormControl<string>('',[Validators.required, Validators.email]),
      password:             new FormControl<string>('',[Validators.required, Validators.maxLength(20)]),
      nombre:               new FormControl<string>('',[Validators.required, Validators.pattern('^([a-zA-Z\s ]{2,250})$'), Validators.min(3), Validators.maxLength(200)]),
      apellido:             new FormControl<string>('',[Validators.required, Validators.pattern('^([a-zA-Z\s ]{2,250})$'), Validators.min(3), Validators.maxLength(200)]),
      role:                 new FormControl<string>('',[Validators.required]),
      accesos: new FormControl<any[]>([],[Validators.required]),
    });

    this.serviceModule.modulo$.subscribe((modulo) => {
      this.permisosDisponibles = modulo;
    });
  }

  resetFormState(): void {
    const dataAdaptada = {
      id:           '0',
      code:         '0',
      email:        '',
      nombre:       '',
      apellido:     '',
      password:     '',
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
    this.router.navigate(['/usuario']);
    this.resetFormState();
  }

  onSubmit():void{
    let data =  this.Form.value as UserRegister;

     this.service.register( data )
    .subscribe({
      next: (response) => {
        for(let permiso of this.permisosDisponibles){
          const auxData = {
            user_id: response.data.id,
            modulo_id: permiso.id
          }
          const existe  = this.permisosMarcados.filter(id => id  == permiso.id);
          this.service.registerAcceso( auxData )
          .subscribe({
            next: (response) => {
              if(existe.length === 0){
                this.service.deleteAcceso(response.data.id, permiso.id)
                .subscribe(
                  (error) => {
                    Swal.fire({
                      title: error.error.data[0],
                      icon: "error"
                    })
                  }
                );
              }
            },
            error: (err) => {
              Swal.fire({
                title: err.error.data[0],
                icon: "error"
              })
            }
          });
        }
      },
      error: (err) => {
        Swal.fire({
          title: err.error.data[0],
          icon: "error"
        });
      },
      complete: () => {
          this.resetFormState();
          Swal.fire({
            title: "Se guardo correctamente",
            icon: "success"
          });
      }

    });
  }

  actualizarPermisosMarcados(permisoData: any) {
    const permiso = ""+permisoData.id;

    if (this.permisosMarcados.includes(permiso)) {
      permisoData.check = false;
      this.permisosMarcados = this.permisosMarcados.filter(id => id !== permiso);
      this.permisosMarcados.push(permiso);
    } else {
      permisoData.check = true;
      this.permisosMarcados.push(permiso);
    }
    this.Form.get('accesos').setValue(this.permisosMarcados);
  }

  Obtener_Usuario(){

    const {code} = this.Form.value;

    this.user.getuser(code).subscribe(response =>{
      if (response && response.data) {
        this.Form.patchValue({
          nombre: response.data.nombre,
          apellido: response.data.apellido,
          email: response.data.email
      });
      }else{
        Swal.fire({
          title: "Codigo Colaborador",
          text: "No se encuentra el Codigo",
          icon: "warning"
        });
      }
    })
  }

}
