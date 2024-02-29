import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Refrigerantesresponsive, RefrigeranteEquipo, RefrigeranteTipo, RefrigeranteRegistar } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RefrigerantesService {

    //TODO: DIRECCIÓN DE LA API
    private readonly baseUrl: string = environment.baseURL;

    constructor(private http: HttpClient) { }

    private headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    private fna: string = "electricidad/";

    obtener( limit: number,page: number ): Observable<Refrigerantesresponsive> {
      return this.http.get<Refrigerantesresponsive>(`${this.baseUrl}${this.fna}ingreso?limit=${limit}&page=${page}`, { headers: this.headers });
    }

    ingresar_actualizar(data : RefrigeranteRegistar): Observable<RefrigeranteRegistar> {

      if(data.id != 0 ){
        return this.http.post<RefrigeranteRegistar>(`${this.baseUrl}${this.fna}ingreso`,data,{ headers: this.headers });
      }else{
        const { id, ...obj } = data;
        return this.http.post<RefrigeranteRegistar>(`${this.baseUrl}${this.fna}ingreso`,obj,{ headers: this.headers });
      }

    }

    //TODO: TIPO
    tipo(): Observable<RefrigeranteTipo> {
      return this.http.get<RefrigeranteTipo>(`${this.baseUrl}${this.fna}tipo`, { headers: this.headers });
    }

    //TODO: EQUIPO
    equipo(): Observable<RefrigeranteEquipo> {
      return this.http.get<RefrigeranteEquipo>(`${this.baseUrl}${this.fna}equipo`, { headers: this.headers });
    }

}
