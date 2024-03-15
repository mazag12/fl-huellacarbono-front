import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsumoaguaResponsive, ConsumoaguaRegister, AguaReporte } from '../interfaces';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AguaService {
  //TODO: DIRECCIÓN DE LA API
  private readonly baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders()
  .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  private entidad: string = "agua/";

  obtener( limit: number,page: number ): Observable<ConsumoaguaResponsive> {
    return this.http.get<ConsumoaguaResponsive>(`${this.baseUrl}${this.entidad}ingreso?limit=${limit}&page=${page}`, { headers: this.headers });
  }

  ingresar_actualizar(data : ConsumoaguaRegister): Observable<ConsumoaguaRegister> {
    if(data.id != 0 ){
      return this.http.post<ConsumoaguaRegister>(`${this.baseUrl}${this.entidad}ingreso`,data,{ headers: this.headers });
    }else{
      const { id, ...objentidad } = data;
      return this.http.post<ConsumoaguaRegister>(`${this.baseUrl}${this.entidad}ingreso`,objentidad,{ headers: this.headers });
    }
  }

  reporte( tipodate: string,date: string ): Observable<AguaReporte>{
    return this.http.get<AguaReporte>(`${this.baseUrl}${this.entidad}reporte?tipoDate=${tipodate}&valueDate=${date}`, { headers: this.headers });
  }

}
