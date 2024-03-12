import { Component, OnInit, inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

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
  subscription: Subscription | undefined;

  public loginForm: FormGroup = this.fb.group({
    code: [''],
    password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]]
  })

  ngOnInit(): void {
    this.subscription = this.authService.currentData.subscribe(data => {
      this.data = data;
    });
  }

  onSubmit() {

    console.log(this.data);

    const { password, confirmPassword } = this.loginForm.value;

    const comparacion = password.localeCompare(confirmPassword);

    if(comparacion === 0 ){
      this.authService.recuperar(  this.data, password )
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (message) => {
          Swal.fire(
            'ERROR COMUNICATE CON TI',
              message,
            'error');
        }
      });
    }else{
      Swal.fire({
        title: "Error",
        text: "La contraseña ingresada no son iguales",
        icon: "error"
      });
    }
  }


}
