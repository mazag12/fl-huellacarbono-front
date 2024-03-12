import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';

import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { DialogComponent } from './components/login-page/dialog/dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    LoginPageComponent,
    AuthPageComponent,
    RecuperarPasswordComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule
  ],
})
export class AuthModule { }
