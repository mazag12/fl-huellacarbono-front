import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegister } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuarioService } from 'src/app/views/services/usuario.service';
import Swal from 'sweetalert2';
import {permisosDisponibles} from '../../../utils/constans';

@Component({
  selector: 'app-usuario-insert',
  templateUrl: './usuario-insert.component.html',
  styleUrls: ['./usuario-insert.component.scss']
})
export class UsuarioInsertComponent {
  constructor(
    private service: UsuarioService ,
    private router:Router,
    private activatedRoute:ActivatedRoute) {}

  private authService = inject ( AuthService );

  public user = computed( () => this.authService.currentUser() );

  public Form: any;

  public data:UserRegister[] = [];

  id: any;

  ngOnInit(): void{

      this.Form = new FormGroup({
        code:                 new FormControl<string>('0',[Validators.min(1), Validators.pattern('^([0-9]{1,10}(\.[0-9]{1,2})?)$')]),
        email:                new FormControl<string>('',[Validators.required, Validators.email]),
        password:             new FormControl<string>('',[Validators.required, Validators.maxLength(200)]),
        nombre:               new FormControl<string>('',[Validators.required, Validators.pattern('^([a-zA-Z\s ]{2,250})$'), Validators.min(3), Validators.maxLength(200)]),
        apellido:             new FormControl<string>('',[Validators.required, Validators.pattern('^([a-zA-Z\s ]{2,250})$'), Validators.min(3), Validators.maxLength(200)]),
        role:                 new FormControl<string>('',[Validators.required]),
      })
  }

  onSubmit():void{
    let data =  this.Form.value as UserRegister;

    this.service.register( data )
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
        code:         '0',
        email:        '',
        nombre:       '',
        apellido:     '',
        password:     '',
        role:         '',
      };
      this.Form.patchValue(dataAdaptada);
        Swal.fire({
          title: "Se guardo correctamente",
          icon: "success"
        });
      }
    });

  }
}
