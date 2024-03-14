import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { TableComponent } from './components/table/table.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({

  declarations: [
    DialogComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatDatepickerModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    DialogComponent
  ]
})
export class SharedModule { }
