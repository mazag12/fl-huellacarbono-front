import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { TipoElectricidadResponse, ElectricidadAll, ElectricidadRegister, ElectricidadReporteData, ElectricidadById, ElectricidadVerificacion, TipoElectricidad } from '../interfaces';
import { Filter } from 'src/app/shared/interface/filtro';
import { Localizacion } from '../utils/constans';

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

  obtener( filter: Filter): Observable<ElectricidadAll> {
    let url = `${this.baseUrl}${this.electricidad}ingreso?`;
    url += `limit=${filter.limit}&page=${filter.page}`;
    if (filter.factura !== undefined && filter.factura !== '') {
      url += `&factura=${filter.factura}`;
    }
    if(filter.fecha !== undefined && filter.fecha !== ''){
      url += filter.fecha !== undefined?`&`:``;
      const soloFecha: string = filter.fecha.split('T')[0];
      url += `fecha=${soloFecha}`;
    }
    if (filter.tipo !== undefined) {
      let data = 0;
      data += filter.factura !== undefined?1:0;
      data += filter.fecha !== undefined?1:0;
      url += data>0?`&`:``;
      url += `tipo=${filter.tipo}`;
    }
    if (filter.cantidad !== undefined) {
      let data = 0;
      data += filter.factura !== undefined?1:0;
      data += filter.fecha !== undefined?1:0;
      data += filter.tipo !== undefined?1:0;
      url += data>0?`&`:``;
      url += `cantidad=${filter.cantidad}`;
    }

    return this.http.get<ElectricidadAll>(url, { headers: this.headers });
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

  //TODO: AGREGAR Y EDITAR TIPO
  ingresar_actualizar_tipo(data: TipoElectricidad):Observable<TipoElectricidad>{
    delete data.flag_activo;
    if(data.id === ""){ delete data.id}
    return this.http.post<TipoElectricidad>(`${this.baseUrl}${this.electricidad}tipo`,data, { headers: this.headers });
  }

  deletetipo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${this.electricidad}tipo/${id}`, { headers: this.headers });
  }


  //TODO: REPORTE
  reporte(tipodate:string, date: string , Localizacion?: string): Observable<ElectricidadReporteData> {
    return this.http.get<ElectricidadReporteData>(`${this.baseUrl}${this.electricidad}reporte?tipoDate=${tipodate}&valueDate=${date}&locacion=${Localizacion}`, { headers: this.headers });
  }

}
