import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserData, UserById, UserRegister } from 'src/app/auth/interfaces';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
   //TODO: DIRECCIÓN DE LA API
   private readonly baseUrl: string = environment.baseURL;

   constructor(private http: HttpClient) { }

   private headers = new HttpHeaders()
   .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

   private usuario: string = "auth/";

   obtener(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}${this.usuario}user-all`, { headers: this.headers });
  }

  obtenerbyid( id: number ): Observable<UserById> {
    return this.http.get<UserById>(`${this.baseUrl}${this.usuario}user/${id}`, { headers: this.headers });
  }

  update(data : UserData): Observable<UserData> {
      //const { id, ...obj } = data;
      return this.http.post<UserData>(`${this.baseUrl}${this.usuario}user`,data,{ headers: this.headers });
  }

  register(data : any): Observable<UserRegister> {
    return this.http.post<UserRegister>(`${this.baseUrl}${this.usuario}signup`,data,{ headers: this.headers });
}


}
