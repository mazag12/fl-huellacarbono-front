import { Component, OnInit } from '@angular/core';
import {permisosDisponibles} from '../../../utils/constans';

@Component({
  selector: 'app-bar-fna',
  templateUrl: './bar-fna.component.html',
  styleUrls: ['./bar-fna.component.scss']
})
export class BarFnaComponent implements OnInit {


  ngOnInit(): void {
    console.log(permisosDisponibles);
  }



}
