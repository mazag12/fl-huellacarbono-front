import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public verificacion: boolean = false;
  private authService = inject( AuthService );
  private router      = inject( Router );

  ngOnInit(): void {
    setTimeout(() => {
    this.verificacion =  this.finishAuthCheck();
    }, 2000);
  }

  finishAuthCheck = computed<boolean>( () => {
      if( this.authService.authStatus() == AuthStatus.checking ){return false; }
      return true;
  });

  public authStatusChangeEffect = effect( () => {
    switch( this.authService.authStatus() ){
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard/emisiones/lista');
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }
  } );

}
