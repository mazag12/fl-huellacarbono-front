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

  data: any;
  info:UserverificatorData[] = [];
  subscription: Subscription | undefined;

  public loginForm: FormGroup = this.fb.group({
    code: [''],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  })

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
  }

  onSubmit() {
    const { password, confirmPassword } = this.loginForm.value;

    const comparacion = password.localeCompare(confirmPassword);

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
        }
      });

    if(comparacion != 0 ){
      Swal.fire({
        title: "Error",
        text: "La contraseña ingresada no son iguales",
        icon: "error"
      });
    }
  }


}
