import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environments';
import { TransportePropioRegister, TipoTransportepropioResponse, Transportepropio } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TranportepropioService {

   //TODO: DIRECCIÓN DE LA API
   private readonly baseUrl: string = environment.baseURL;

   constructor(private http: HttpClient) { }

   private headers = new HttpHeaders()
   .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

   private electricidad: string = "transporte-propio/";

   obtener( limit: number,page: number ): Observable<Transportepropio> {
     return this.http.get<Transportepropio>(`${this.baseUrl}${this.electricidad}ingreso?limit=${limit}&page=${page}`, { headers: this.headers });
   }

   ingresar_actualizar(data : TransportePropioRegister): Observable<TransportePropioRegister> {

     if(data.id != 0 ){
       return this.http.post<TransportePropioRegister>(`${this.baseUrl}${this.electricidad}ingreso`,data,{ headers: this.headers });
     }else{
       const { id, ...objElectricidad } = data;
       return this.http.post<TransportePropioRegister>(`${this.baseUrl}${this.electricidad}ingreso`,objElectricidad,{ headers: this.headers });
     }

   }

   //TODO: TIPO GENERADOR DE ELECTRICIDAD
   tipo(): Observable<TipoTransportepropioResponse> {
     return this.http.get<TipoTransportepropioResponse>(`${this.baseUrl}${this.electricidad}tipo`, { headers: this.headers });
   }
}
