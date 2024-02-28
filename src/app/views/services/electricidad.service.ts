import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environments';
import { TipoElectricidadResponse, Electricidad, ElectricidadRegister } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ElectricidadService {
  //TODO: DIRECCIÓN DE LA API
  private readonly baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders()
  .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  private electricidad: string = "electricidad/";

  obtener( limit: number,page: number ): Observable<Electricidad> {
    return this.http.get<Electricidad>(`${this.baseUrl}${this.electricidad}ingreso?limit=${limit}&page=${page}`, { headers: this.headers });
  }

  ingresar_actualizar(data : ElectricidadRegister): Observable<ElectricidadRegister> {

    if(data.id != 0 ){
      return this.http.post<ElectricidadRegister>(`${this.baseUrl}${this.electricidad}ingreso`,data,{ headers: this.headers });
    }else{
      const { id, ...obj } = data;
      return this.http.post<ElectricidadRegister>(`${this.baseUrl}${this.electricidad}ingreso`,obj,{ headers: this.headers });
    }

  }

  //TODO: TIPO GENERADOR DE ELECTRICIDAD
  tipo(): Observable<TipoElectricidadResponse> {
    return this.http.get<TipoElectricidadResponse>(`${this.baseUrl}${this.electricidad}tipo`, { headers: this.headers });
  }

}
