import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
   //TODO: DIRECCIÓN DE LA API
   private readonly baseUrl: string = environment.baseURL;

   constructor(private http: HttpClient) { }

   private headers = new HttpHeaders()
   .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
   

  listModule(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}modulo`, { headers: this.headers });
  }

  register(data : any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}module`,data,{ headers: this.headers });
  }

  

}
