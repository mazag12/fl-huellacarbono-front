import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environments';
import { TipoElectricidadResponse, Electricidad, ElectricidadRegister, ElectricidadReporteData, ElectricidadById, ElectricidadVerificacion } from '../interfaces';

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

  obtenerbyid( id: number ): Observable<ElectricidadById> {
    return this.http.get<ElectricidadById>(`${this.baseUrl}${this.electricidad}ingreso/${id}`, { headers: this.headers });
  }

  ingresar_actualizar(data : ElectricidadRegister): Observable<ElectricidadRegister> {
    if(data.id != '0' ){
      return this.http.post<ElectricidadRegister>(`${this.baseUrl}${this.electricidad}ingreso`,data,{ headers: this.headers });
    }else{
      const { id, ...obj } = data;
      return this.http.post<ElectricidadRegister>(`${this.baseUrl}${this.electricidad}ingreso`,obj,{ headers: this.headers });
    }
  }

  obtenerfactura(factura:string, tipo_electricidad_id: number): Observable<ElectricidadVerificacion> {
    return this.http.get<ElectricidadVerificacion>(`${this.baseUrl}${this.electricidad}factura?factura=${factura}&tipo_electricidad_id=${tipo_electricidad_id}`, { headers: this.headers });
  }

  //TODO: TIPO
  tipo(): Observable<TipoElectricidadResponse> {
    return this.http.get<TipoElectricidadResponse>(`${this.baseUrl}${this.electricidad}tipo`, { headers: this.headers });
  }

  //TODO: EDITAR TIPO


  //TODO: REPORTE
  reporte(tipodate:string, date: string): Observable<ElectricidadReporteData> {
    return this.http.get<ElectricidadReporteData>(`${this.baseUrl}${this.electricidad}reporte?tipoDate=${tipodate}&valueDate=${date}`, { headers: this.headers });
  }

}
