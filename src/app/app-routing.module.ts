import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './views/components/dashboard/dashboard.component';

const routes: Routes = [

  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path:'dashboard',
    component: PagesComponent,
    canActivate: [ isAuthenticatedGuard ],
    children:[
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'emisiones',
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
