import { ChangeDetectorRef, Component, ViewChild, computed, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

import {BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  constructor(private breakpointObserver: BreakpointObserver, private cd: ChangeDetectorRef) {}

  private authService = inject ( AuthService );

  public user = computed( () => this.authService.currentUser() );

  title = 'Footloose';


  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }

  @ViewChild(MatDrawer)
  sidenav!: MatDrawer

  onLogout(){
    this.authService.logout();
  }

  ngAfterViewInit(){

    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((res: any) => {
      if(res.matches){
        this.sidenav.opened = 'false';
      }else{
        this.sidenav.opened = 'true';
      }

      this.cd.detectChanges();

    });

    // this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((res: any) => {
    //   if(res.matches){
    //     this.sidenav.mode = 'over';
    //     this.sidenav.close();
    //   }else{
    //     this.sidenav.mode = 'side';
    //     this.sidenav.open();
    //   }
    // });

    // this.cd.detectChanges();

  }
}
