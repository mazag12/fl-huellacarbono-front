import { Component, inject} from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { DialogComponent } from './dialog/dialog.component';

import {MatDialog} from '@angular/material/dialog';
import { AuthStatus } from '../../interfaces';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(public dialog: MatDialog){}
  private fb              = inject( FormBuilder );
  private authService     = inject( AuthService );
  private router          = inject( Router );
  hidePassword = true;

  public loginForm: FormGroup = this.fb.group({
    code: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit() {
    const {code, password} = this.loginForm.value;
    this.authService.login( code, password )
    .subscribe({
      next: () => {
        const currentUser: any = this.authService.currentUser();
        if(currentUser.isValid == false){
          this.authService.updateData(code);
          this.router.navigateByUrl('auth/recuperar');
        }else{
          this.router.navigateByUrl('/dashboard')
        }
      },
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
            height: 'auto',
            width: '500px',
            data: {id: response.data.id, code: code, email: response.data.email, nombre: response.data.nombre + response.data.apellido },
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

  onInputChange(event: any) {
    const input = event.target.value;
    const regex = /^([0-9]{1,6}?)$/;
    if (!regex.test(input)) {
      event.target.value = input.slice(0, input.length - 1);
    }
  }
}
