import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Correo } from '../interface/correo';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Correo
  ) {}

  private router = inject( Router );
  private authService     = inject( AuthService );

  botonDeshabilitado: boolean = false;
  tiempoRestante: number = 0;
  intervalId: any;
  codigo: any;
  DesabilitadoInputVerificador: boolean = true;

  metodo_salir(): void {
    this.dialogRef.close();
  }

  metodo_enviar(): void{
    if(this.codigo === Number(this.data.code)){

      this.router.navigateByUrl('auth/recuperar')
      this.dialogRef.close();
    }else{
      Swal.fire({
        title: "Codigo de Verificación",
        text: "El codigo Ingresado es incorrecto",
        icon: "warning"
      });
    }
  }

  enviar_codigo(): void {
    this.botonDeshabilitado = true;
    this.tiempoRestante = 15;
    this.DesabilitadoInputVerificador = false;

    Swal.fire({
      title: "Mensaje Enviado",
      text: "Se envio a tu correo el codigo",
      icon: "success"
    });

   this.codigo = this.generateRandomNumber();

   this.authService.sendMail(this.codigo, this.data.email, this.data.nombre)
   .subscribe(response => response);

    this.intervalId = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante <= 0) {
        clearInterval(this.intervalId);
        this.botonDeshabilitado = false;
      }
    }, 1000);
  }

  generateRandomNumber(): number {
    const min = 10000000;
    const max = 99999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}
