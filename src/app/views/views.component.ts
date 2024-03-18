import { ChangeDetectorRef, Component, OnInit, ViewChild, computed, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

import { BreakpointObserver } from '@angular/cdk/layout';
import { permisosDisponibles } from './utils/constans';
import { UsuarioService } from './services/usuario.service';
import { ModuloService } from './services/modulo.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {
  constructor(private serviceModule: ModuloService, private service: UsuarioService, private breakpointObserver: BreakpointObserver, private cd: ChangeDetectorRef){}

  async ngOnInit() {
    this.generarSidebar();
  }


  private authService = inject ( AuthService );
  public permisosDisponibles: any

  permisosMarcados: any[] = [];
  public user = computed( () => this.authService.currentUser() );

  estilos: any = {
    'width': 'auto'
  };

  menu: boolean = true;

  onLogout(){
    this.authService.logout();
  }

  async generarSidebar() {
    this.serviceModule.accesos$.subscribe((acceso) => {
      this.permisosMarcados = acceso;
    });

    this.serviceModule.modulo$.subscribe((modulo) => {
      this.permisosDisponibles = modulo;
    });
  }

  cambiarEstilo() {
    this.estilos['width'] = this.menu ?  '58px':'auto';
    this.menu = this.menu ? false: true ;
  }


  ngAfterViewInit(){
    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((res: any) => {
      if(res.matches){
        this.estilos['width'] = '58px';
      }else{
        this.estilos['width'] = 'auto';
      }
      this.cd.detectChanges();
    });

  }


}
