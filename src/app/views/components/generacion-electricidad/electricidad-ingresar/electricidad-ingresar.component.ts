import { Component, OnInit, ViewChild, computed, inject, ElementRef  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { read, utils } from 'xlsx';
import { AuthService } from '../../../../auth/services/auth.service';

import { TipoElectricidad, ElectricidadRegister } from 'src/app/views/interfaces';
import { ElectricidadService } from '../../../services/electricidad.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-electricidad-ingresar',
  templateUrl: './electricidad-ingresar.component.html',
  styleUrls: ['./electricidad-ingresar.component.scss']
})
export class ElectricidadIngresarComponent implements OnInit{

  constructor(
    private service: ElectricidadService ,
    private route:Router,
    private activatedRoute:ActivatedRoute) {}

    @ViewChild('fileUpload') fileUpload!: ElementRef;

    private authService = inject ( AuthService );

    public user = computed( () => this.authService.currentUser() );
    public tipos  : TipoElectricidad[] = [];
    public campoVacioError: boolean = false;

    public Form = new FormGroup({
      id:                   new FormControl<string>('0'),
      tipo_electricidad_id: new FormControl<string>('0',[Validators.min(1)]),
      cantidad:             new FormControl<number>(0,[Validators.required, Validators.min(1)]),
      fecha_ingreso:        new FormControl<string>('',[Validators.required]),
      factura:              new FormControl<string>('',[Validators.required, Validators.pattern('[A-Z0-9-]*')]),
      area:                 new FormControl<string>('',[Validators.required]),
      evidencia_url:        new FormControl<string>('',[Validators.required, Validators.pattern('(ftp|http|https):\/\/[^ "]*')]),
    })
    public editing: boolean = false;

    file: File | null = null;
    excelData: any[] = [];
    public data:ElectricidadRegister[] = [];
    id: any;

    ngOnInit(): void{

      this.service.tipo()
      .subscribe( reponse => this.tipos = reponse.data);

      this.id = this.activatedRoute.snapshot.params['id'];

      if(this.id){
        this.editing = true;
        this.service.obtenerbyid(this.id)
        .subscribe (response => {
          console.log(response.data.tipo_electricidad_id)
          const dataAdaptada = {
            id:                   response.data.id,
            tipo_electricidad_id: response.data.tipo_electricidad_id,
            cantidad:             response.data.cantidad,
            fecha_ingreso:        response.data.fecha_ingreso,
            factura:              response.data.factura,
            area:                 response.data.area,
            evidencia_url:        response.data.evidencia_url
          };
          this.Form.patchValue(dataAdaptada);
        });
      }
    }

    onSubmit():void{
      let data =  this.Form.value as ElectricidadRegister;
      data.fecha_ingreso = new Date(data.fecha_ingreso ).toISOString();

      this.service.ingresar_actualizar( data )
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
          text: "",
          icon: "success"
        });

        const dataAdaptada = {
          id:                   '0',
          tipo_electricidad_id: '0',
          cantidad:             0,
          fecha_ingreso:        '',
          factura:              '',
          area:                 '',
          evidencia_url:        ''
        };
        this.Form.patchValue(dataAdaptada);

      }
      });
    }

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

        let lista = {
          id: '0',
          fecha_ingreso: element.fecha,
          tipo_electricidad_id: element.id_tipo,
          cantidad: element.cantidad,
          factura: element.factura,
          area: element.area,
          evidencia_url: element.evidencia,
        };

        this.service.ingresar_actualizar( lista )
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
