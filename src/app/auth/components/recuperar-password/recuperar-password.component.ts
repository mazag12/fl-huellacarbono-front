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
    code: ['', [Validators.pattern('[0-9]*')]]
  })

  onSubmit() {
      // Realiza las acciones que desees con los valores del formulario.
      const {code} = this.loginForm.value;

      if(code == ''){
        Swal.fire({
          title: "ERROR",
          text: "INGRESE SU CODIGO COLABORADOR",
          icon: "warning"
        });
        return;
      }

      // Aquí puedes enviar los datos al servidor o realizar otras acciones.
      Swal.fire({
        title: "Enviado",
        text: "SE ENVIO UN LINK A TU CORREO PARA RECUPERAR TU CONTRASEÑA" + code,
        icon: "success"
      });

  }


}
