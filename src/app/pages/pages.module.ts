import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatListModule} from "@angular/material/list"

import {LayoutModule} from '@angular/cdk/layout';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatTreeModule,
    MatDividerModule,
    MatSlideToggleModule,
    LayoutModule,
    MatListModule,
  ]
})
export class PagesModule { }
