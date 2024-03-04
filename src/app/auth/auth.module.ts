import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';

import {MatInputModule} from '@angular/material/input';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { RestablecerPasswordComponent } from './components/restablecer-password/restablecer-password.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    AuthPageComponent,
    RecuperarPasswordComponent,
    RestablecerPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: []
})
export class AuthModule { }
