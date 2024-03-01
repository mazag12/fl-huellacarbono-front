import { Component, inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss']
})
export class RecuperarPasswordComponent {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );

  public loginForm: FormGroup = this.fb.group({
    code: ['010942', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  onSubmit() {
      // Realiza las acciones que desees con los valores del formulario.
      const {code} = this.loginForm.value;

      // Aquí puedes enviar los datos al servidor o realizar otras acciones.
      Swal.fire({
        title: "Enviado",
        text: "Se envio un mensaje a su correo que esta vinculado con su codigo ->" + code,
        icon: "success"
      });

  }


}
