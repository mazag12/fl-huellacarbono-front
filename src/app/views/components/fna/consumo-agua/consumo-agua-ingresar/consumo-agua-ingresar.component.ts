import { Component, OnInit, ViewChild, computed, inject, AfterViewInit, ElementRef  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { read, utils } from 'xlsx';
import { AuthService } from '../../../../../auth/services/auth.service';

import {  } from 'src/app/views/interfaces';
import { AguaService } from '../../../../services/agua.service';

@Component({
  selector: 'app-consumo-agua-ingresar',
  templateUrl: './consumo-agua-ingresar.component.html',
  styleUrls: ['./consumo-agua-ingresar.component.scss']
})
export class ConsumoAguaIngresarComponent {

}
