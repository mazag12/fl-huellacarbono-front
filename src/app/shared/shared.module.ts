import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DialogComponent } from './components/dialog/dialog.component';


@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    DialogComponent
  ]
})
export class SharedModule { }
