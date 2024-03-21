import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards';
import { ViewsComponent } from './views/views.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path:'',
    component: ViewsComponent,
    canActivate: [ isAuthenticatedGuard ],
    children:[
      {
        path:'',
        loadChildren: () => import('./views/views.module').then( m => m.ViewsModule )
      }
    ]
  },
  {
    path:'**',
    redirectTo: 'auth'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
