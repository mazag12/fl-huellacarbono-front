import { Component, inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  //loginForm: FormGroup;

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );

  public loginForm: FormGroup = this.fb.group({
    code: ['010942', [Validators.required]],
    password: ['Bitel123*', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit() {
      // Realiza las acciones que desees con los valores del formulario.
      const {code, password} = this.loginForm.value;

      // Aquí puedes enviar los datos al servidor o realizar otras acciones.
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

}
