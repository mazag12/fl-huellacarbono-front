import { Component, inject} from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { DialogComponent } from './dialog/dialog.component';

import {MatDialog} from '@angular/material/dialog';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(public dialog: MatDialog){}

  private fb              = inject( FormBuilder );
  private authService     = inject( AuthService );
  private router          = inject( Router );

  public loginForm: FormGroup = this.fb.group({
    code: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit() {
    const {code, password} = this.loginForm.value;

    this.authService.login( code, password )
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (message) => {
          Swal.fire(
            'INGRESE DE NUEVO SU CODIGO COLABORADOR Y CONTRASEÑA',
              message,
            'error');
        }
      })
  }

  async recovery(enterAnimationDuration: string, exitAnimationDuration: string){
    const {code} = this.loginForm.value;
    if(code){
      this.authService.getuser(code).subscribe( (response) => {
        if (response && response.data) {
          this.authService.updateData(code);
          this.dialog.open(DialogComponent, {
            data: {code: code, email: response.data.email, nombre: response.data.nombre + response.data.apellido },
            autoFocus: true,
            closeOnNavigation: true,
            hasBackdrop: true,
            enterAnimationDuration,
            exitAnimationDuration,
          });
        }else{
          Swal.fire(
            'ERROR',
            'No existe el Codigo del Colaborador : ' + code,
            'error');
        }
      },
      (error) => {
        Swal.fire(
          'ERROR',
          'No existe el Codigo del Colaborador ',
          'error');
      }
      );
    }else{
      Swal.fire({
        title: "Codigo Colaborador",
        text: "No se ingreso el Codigo del Colaborador",
        icon: "warning"
      });
    }

  }
}
