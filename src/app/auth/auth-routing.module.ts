import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';

const routes: Routes = [

  {
    path: '',
    component: AuthPageComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'recuperar', component: RecuperarPasswordComponent },
      { path: '**', redirectTo: 'login' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
