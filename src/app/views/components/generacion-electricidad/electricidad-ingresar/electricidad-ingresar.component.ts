import { Component, OnInit, ViewChild, computed, inject, ElementRef  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { read, utils } from 'xlsx';
import { AuthService } from '../../../../auth/services/auth.service';

import { TipoElectricidad, ElectricidadRegister } from 'src/app/views/interfaces';
import { ElectricidadService } from '../../../services/electricidad.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Localizacion } from '../../../utils/constans';

@Component({
  selector: 'app-electricidad-ingresar',
  templateUrl: './electricidad-ingresar.component.html',
  styleUrls: ['./electricidad-ingresar.component.scss']
})
export class ElectricidadIngresarComponent implements OnInit{

  constructor(
    private service: ElectricidadService ,
    private router:Router,
    private activatedRoute:ActivatedRoute) {}

    @ViewChild('fileUpload') fileUpload!: ElementRef;

    private authService = inject ( AuthService );

    public user = computed( () => this.authService.currentUser() );
    public tipos  : TipoElectricidad[] = [];
    public campoVacioError: boolean = false;

    public Form = new FormGroup({
      id:                   new FormControl<string>('0'),
      tipo_electricidad_id: new FormControl<string>('0',[Validators.min(1)]),
      cantidad:             new FormControl<number>(0,[Validators.required, Validators.min(1),Validators.pattern('^([0-9]{1,10}(\.[0-9]{1,2})?)$')]),
      fecha_ingreso:        new FormControl<string>('',[Validators.required]),
      factura:              new FormControl<string>('',[Validators.required, Validators.pattern('[A-Z0-9-]*')]),
      area:                 new FormControl<string>('',[Validators.required]),
      evidencia_url:        new FormControl<string>('',[Validators.required, Validators.pattern('(ftp|http|https):\/\/[^ "]*')]),
    })

    public editing: boolean = false;
    public data:ElectricidadRegister[] = [];
    public localizacion =  Object.values(Localizacion);

    id: any;
    comprobante: string = '';
    cantidad: string = '';

    file: File | null = null;
    excelData: any[] = [];

    //mensaje de error
    public mensaje_error: any[] = [];

    ngOnInit(): void{
      this.service.tipo()
      .subscribe( reponse => this.tipos = reponse.data);

      this.id = this.activatedRoute.snapshot.params['id'];
      if(this.id){
        this.editing = true;
        this.service.obtenerbyid(this.id)
        .subscribe (response => {
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

      if(this.id){
        this.actualizar_update(data);
      }else{
        const factura = this.service.obtenerfactura(data.factura, parseInt(data.tipo_electricidad_id));
        if(factura){
          Swal.fire({
            title: "Se encontro que la Factura y el tipo de combustible registrados",
            icon: "warning"
          });
        }else{
          this.actualizar_update(data);
        }
      }
    }

    actualizar_update(data: any){
      this.service.ingresar_actualizar( data )
        .subscribe({
          // TODO: mostrar snackbar, y navegar a /electricidad/editar/electricidad.id
          error: (err) => {
            Swal.fire({
              title: "El Dato que ingresaste esta Incorrecto",
              icon: "error"
            });
          },
        complete: () => {

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

          if(this.id){
            Swal.fire({
              title: "Se guardo correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 3500
            });
            this.router.navigate(['/dashboard/emisiones/fna/electricidad']);
          }else{
            Swal.fire({
              title: "Se guardo correctamente",
              icon: "success"
            });
          }
        }
      });
    }

    TextoComprobante(valor: string): void {
      this.comprobante = valor.toUpperCase();
    }

    limitarDecimales(event: any): void {
      const valor: string = event.target.value;
      const match = valor.match(/^([0-9]{1,10}(\.[0-9]{1,2})?)$/); // Acepta números con hasta dos decimales
      this.cantidad = match ? match[0] : '';
    }

    ImportExcel(event: any) {
      const file: File = event.target.files[0];
      let filteredData: any[];
      this.mensaje_error = [];

      if (file) {
        this.file = file;
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const wb = read(event.target.result, { type: 'array' });
          const sheets = wb.SheetNames;

          if (sheets.length) {
            const rows: any[] = utils.sheet_to_json(wb.Sheets[sheets[0]], { header: 1 });

            if (rows.length < 2) {
              console.log("El documento está vacío o solo contiene encabezados.");
              return;
            }

            const headers = rows[0].filter((item: string | null) => item !== null && item !== "COMBUSTIBLE" && item !== "LOZALIZACION");
            const dataRows = rows.slice(1);

            const filteredData = dataRows.filter(item =>
              item[1] !== "" && item.some((val: null) => val !== null)
            ).map(item =>
                item.slice(0, 7)
            );

            filteredData.pop();

              filteredData.forEach((row, rowIndex) => {
                const rowObj = row.reduce((obj: any, cell: any, index: any) => {
                  switch (index) {
                    case 1:
                    case 2:
                      if (!isNaN(cell)) {
                        obj[headers[index]] = cell;
                      } else {
                        this.mensaje_error.push(`Fila ${rowIndex + 2}: No es un número.`);
                      }
                      break;
                    case 3:
                      if (/^\d{4}-\d{2}-\d{2}$/.test(cell)) {
                        obj[headers[index]] = cell;
                      } else {
                        this.mensaje_error.push(`Fila ${rowIndex + 2}: No tiene el formato 'YYYY-MM-DD'.`);
                      }
                      break;
                    case 4:
                      obj[headers[index]] = cell.toUpperCase();
                      break;
                    case 6:
                      if (this.isValidURL(cell)) {
                        obj[headers[index]] = cell;
                      } else {
                        this.mensaje_error.push(`Fila ${rowIndex + 2}: No es una URL válida.`);
                      }
                      break;
                    default:
                      obj[headers[index]] = cell;
                      break;
                  }

                  return obj;
                }, {});

              const missingFields = headers.filter((header: string | number) => !rowObj[header]);

              if (missingFields.length > 0) {
                this.mensaje_error.push(`Fila ${rowIndex + 2} tiene campos vacíos en: ${missingFields.join(', ')}`);
                this.campoVacioError = true;
                this.fileUpload.nativeElement.value = '';
              } else {
                const factura = this.service.obtenerfactura(rowObj.factura, rowObj.id_tipo);
                if (factura) {
                  this.campoVacioError = true;
                  this.mensaje_error.push(`Fila ${rowIndex + 2}: La factura ya está registrada.`);
                  this.fileUpload.nativeElement.value = '';
                } else {
                  this.campoVacioError = false;
                  this.excelData.push(rowObj);
                }
              }
            });
          }
        }
        reader.readAsArrayBuffer(file);
      }
    }

    isValidURL(url: string) {
      const pattern = new RegExp('(ftp|http|https):\/\/[^ "]*'); // fragmento
      return pattern.test(url);
    }

    GuardarExcel(){

      if(this.excelData.length == 0){
        Swal.fire({
          title: "No hay datos en el documento",
          icon: "error",
          showConfirmButton: false,
          timer: 3500
        });
      }

      this.excelData?.forEach(element => {

        let lista = {
          id: '0',
          fecha_ingreso: element.fecha,
          tipo_electricidad_id: element.id_tipo,
          cantidad: element.cantidad,
          factura: element.factura,
          area: element.locacion,
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
                icon: "success"
              });
            }
        } );
      });

    }

}
