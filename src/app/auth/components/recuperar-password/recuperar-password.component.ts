import { Component, OnInit, inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { UserverificatorData } from '../../interfaces';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss']
})
export class RecuperarPasswordComponent implements OnInit {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );
  hidePassword = true;
  hideConfirmPassword = true;
  missingCriteria: string[] = [];

  data: any;
  info:UserverificatorData[] = [];
  subscription: Subscription | undefined;

  public loginForm: FormGroup = this.fb.group({
    code: [''],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  })



  getMissingCriteria(password: string): string[] {
    const missing: string[] = [];
    if (!/[a-z]/.test(password)) {
      missing.push('minúscula');
    }
    if (!/[A-Z]/.test(password)) {
      missing.push('mayúscula');
    }
    if (!/\d/.test(password)) {
      missing.push('número');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      missing.push('carácter especial');
    }
    return missing;
  }

  ngOnInit(): void {
    this.subscription = this.authService.currentData.subscribe(data => {
      this.data = data;
      this.authService.getuser(this.data)
      .subscribe({
        next: (response) =>{
         this.info.push(response.data);
        }
      });
    });
    const passwordControl = this.loginForm.get('password');
    if (!passwordControl) return

    passwordControl.valueChanges.subscribe(value => {
      this.missingCriteria = this.getMissingCriteria(value);
    });
    
  }

  onSubmit() {
    const { password, confirmPassword } = this.loginForm.value;
    const comparacion = password.localeCompare(confirmPassword);

    if(comparacion != 0 ){
      Swal.fire({
        title: "Error",
        text: "La contraseña ingresada no son iguales",
        icon: "error"
      });
      return
    }

    this.info[0].id
    const body = {
      id:  parseInt(this.info[0].id),
      password: password
    }
    this.authService.recuperar( body )
      .subscribe({
        next: () => {
          this.authService.login( this.data, password )
          .subscribe({
            next: () => this.router.navigateByUrl('/dashboard'),
            error: (message) => {
              Swal.fire(
                'INGRESE DE NUEVO SU CODIGO COLABORADOR Y CONTRASEÑA',
                  message,
                'error');
            }
          })
        },
        error: (message) => {
          Swal.fire(
            'Error en la solicitud: ',
            message.error.data[0],
          );
        }
      });

    
  }
}
