import { Component, OnInit, ViewChild, computed, inject, AfterViewInit, ElementRef  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { read, utils } from 'xlsx';
import { AuthService } from '../../../../../auth/services/auth.service';

import { ElectricidadResponse, TipoElectricidad, ElectricidadRegister } from 'src/app/views/interfaces';
import { ElectricidadService } from '../../../../services/electricidad.service';


@Component({
  selector: 'app-electricidad-ingresar',
  templateUrl: './electricidad-ingresar.component.html',
  styleUrls: ['./electricidad-ingresar.component.scss']
})
export class ElectricidadIngresarComponent implements OnInit{

  constructor(
    private electricidadservice: ElectricidadService ,
    public dialog: MatDialog) {}

    @ViewChild('fileUpload') fileUpload!: ElementRef;

    private authService = inject ( AuthService );

    public user = computed( () => this.authService.currentUser() );

    public electricidades: ElectricidadResponse[] = [];

    public tipos_electricidad: TipoElectricidad[] = [];

    file: File | null = null;

    excelData: any[] = [];

    public ElectricidadForm = new FormGroup({
      id:                   new FormControl<number>(0),
      tipo_electricidad_id: new FormControl<number>(0,[Validators.min(1)]),
      cantidad:             new FormControl<number>(0,[Validators.required, Validators.min(1)]),
      fecha_ingreso:        new FormControl<string>('',[Validators.required]),
      factura:              new FormControl<string>('',[Validators.required]),
      area:                 new FormControl<string>('',[Validators.required]),
      evidencia_url:        new FormControl<string>(''),
    })

    ngOnInit(): void{

      this.electricidadservice.tipo_electricidad()
      .subscribe( reponse => this.tipos_electricidad = reponse.data);

    }

    onSubmit():void{
      let electricidad =  this.ElectricidadForm.value as ElectricidadRegister;
      electricidad.fecha_ingreso = new Date(electricidad.fecha_ingreso ).toISOString();

      this.electricidadservice.ingresar_actualizar_Electricidad( electricidad )
      .subscribe({
        // TODO: mostrar snackbar, y navegar a /electricidad/editar/electricidad.id
        error: (err) => {
          Swal.fire({
            title: "El Dato que ingresaste esta Incorrecto",
            text: "presiona el boton!",
            icon: "error"
          });
        },
      complete: () => {
        Swal.fire({
          title: "Se guardo correctamente",
          text: "presiona el boton!",
          icon: "success"
        });
      }
      });
    }

    public campoVacioError: boolean = false;

    ImportExcel(event: any) {
      const file: File = event.target.files[0];

      if (file) {
        this.file = file;
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const wb = read(event.target.result);
          const sheets = wb.SheetNames;

            if (sheets.length) {
              const rows: any[] = utils.sheet_to_json(wb.Sheets[sheets[0]]);
              const isEmptyField = rows.some(row => {
                return !row.id_tipo || !row.cantidad || !row.fecha || !row.factura || !row.area;
              });

              if (isEmptyField) {
                this.campoVacioError = true;
                this.excelData = [];
                this.fileUpload.nativeElement.value = '';
              } else {
                this.excelData = rows;
                this.campoVacioError = false;
              }
              this.excelData = rows;
            }

        }
        reader.readAsArrayBuffer(this.file);
      }
    }

    GuardarExcel(){
      if(this.excelData.length == 0){
        console.log("no hay datos");
        Swal.fire({
          title: "No hay datos en el documento",
          text: "presiona el boton!",
          icon: "error"
        });
      }

      this.excelData?.forEach(element => {

        let list_electricidad = {
          id: 0,
          fecha_ingreso: element.fecha,
          tipo_electricidad_id: element.id_tipo,
          cantidad: element.cantidad,
          factura: element.factura,
          area: element.area,
          evidencia_url: element.evidencia,
        };

        this.electricidadservice.ingresar_actualizar_Electricidad( list_electricidad )
        .subscribe( {
          // TODO: mostrar snackbar, y navegar a /electricidad/editar/electricidad.id
          error: (message) => {
              Swal.fire('Error', message, 'error');
            },
            complete: () => {
              Swal.fire({
                title: "Se importo los datos Correctamente",
                text: "presiona el boton!",
                icon: "success"
              });
            }
        } );
      });

    }

}
