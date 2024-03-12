import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegister } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuarioService } from 'src/app/views/services/usuario.service';
import Swal from 'sweetalert2';
import {permisosDisponibles} from '../../../utils/constans';
import { ModuloService } from 'src/app/views/services/modulo.service';

@Component({
  selector: 'app-usuario-insert',
  templateUrl: './usuario-insert.component.html',
  styleUrls: ['./usuario-insert.component.scss']
})
export class UsuarioInsertComponent {
  constructor(
    private service: UsuarioService ,
    private serviceModule: ModuloService ,
    private router:Router,
    private user: AuthService,
    private activatedRoute:ActivatedRoute) {}
    public permisosDisponibles: any[] = permisosDisponibles;
    permisosMarcados: any[] = [];

  public Form: any;

  public data:UserRegister[] = [];

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
      })
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
    let data =  this.Form.value as UserRegister;

    this.service.register( data )
    .subscribe({
      next: (response) => {

        for(let modulo of data.accesos){
          const auxData = {
            user_id: response.data.id,
            modulo_id: modulo
          }
          this.serviceModule.register( auxData )
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
        

      },
      error: (err) => {
        console.log(err)
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
