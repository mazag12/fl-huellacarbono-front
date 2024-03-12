import { ChangeDetectorRef, Component, ViewChild, computed, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

import {BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent {
  constructor(private breakpointObserver: BreakpointObserver, private cd: ChangeDetectorRef) {}

  private authService = inject ( AuthService );

  public user = computed( () => this.authService.currentUser() );

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
