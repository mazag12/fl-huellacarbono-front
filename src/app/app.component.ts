import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';
import { ModuloService } from './views/services/modulo.service';
import { UsuarioService } from './views/services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public verificacion: boolean = false;
  private authService = inject( AuthService );
  private router      = inject( Router );
  public permisosDisponibles: any
  permisosMarcados: any[] = [];

  constructor(private serviceModule: ModuloService, private service: UsuarioService){}
  
  ngOnInit(): void {
    this.generarSidebar();
  }

  async generarSidebar() {
    const currentUser = this.authService.currentUser();
    if(currentUser)

    await this.service.obtenerbyid(currentUser.sub)
    .subscribe (response => {
      this.permisosMarcados = response.data.accesos
      this.serviceModule.setAcceso(this.permisosMarcados);
    });

    await this.serviceModule.listModule().subscribe(response => {
      this.permisosDisponibles = response.data.rows
      this.serviceModule.setModulo(this.permisosDisponibles);
    });
    
    setTimeout(() => {
      this.verificacion =  this.finishAuthCheck();
    }, 1000);
    
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
