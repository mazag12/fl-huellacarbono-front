import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumosein, ConsumoseinRegister, TipoConsumosein } from '../interfaces';
import { environment } from '../../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class ConsumoseinService {

  //TODO: DIRECCIÓN DE LA API
  private readonly baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders()
  .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  private electricidad: string = "electricidad/";

  obtener( limit: number,page: number ): Observable<Consumosein> {
    return this.http.get<Consumosein>(`${this.baseUrl}${this.electricidad}ingreso?limit=${limit}&page=${page}`, { headers: this.headers });
  }

  ingresar_actualizar(data : ConsumoseinRegister): Observable<ConsumoseinRegister> {

    if(data.id != 0 ){
      return this.http.post<ConsumoseinRegister>(`${this.baseUrl}${this.electricidad}ingreso`,data,{ headers: this.headers });
    }else{
      const { id, ...obj } = data;
      return this.http.post<ConsumoseinRegister>(`${this.baseUrl}${this.electricidad}ingreso`,obj,{ headers: this.headers });
    }

  }

  //TODO: TIPO GENERADOR DE ELECTRICIDAD
  tipo(): Observable<TipoConsumosein> {
    return this.http.get<TipoConsumosein>(`${this.baseUrl}${this.electricidad}tipo`, { headers: this.headers });
  }
}
