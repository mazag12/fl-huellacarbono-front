import { ChangeDetectorRef, Component, OnInit, ViewChild, computed, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

import {BreakpointObserver } from '@angular/cdk/layout';
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

    const currentUser = this.authService.currentUser();

    if(currentUser)
    await this.service.obtenerbyid(currentUser.sub)
    .subscribe (response => {
      this.permisosMarcados = response.data.accesos
    });
    

    await this.serviceModule.listModule().subscribe(response => {
      this.permisosDisponibles = response.data.rows
    });

    
    
  }


  private authService = inject ( AuthService );
  //public permisosDisponibles: any[] = permisosDisponibles;
  public permisosDisponibles: any 

  permisosMarcados: any[] = [];
  public user = computed( () => this.authService.currentUser() );

  //public currentUser = this.authService2.currentUser();

  estilos: any = {
    'width': 'auto'
  };

  menu: boolean = true;

  onLogout(){
    this.authService.logout();
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
