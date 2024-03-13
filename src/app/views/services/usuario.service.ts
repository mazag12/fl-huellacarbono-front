import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData, UserDataList, UserRegister, Userverificar, UserbyID } from 'src/app/auth/interfaces';
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

  obtener( limit: number, page: number ): Observable<UserDataList> {
    return this.http.get<UserDataList>(`${this.baseUrl}user?limit=${limit}&page=${page}`, { headers: this.headers });
  }

  obtenerbyid( id: number ): Observable<UserbyID> {
    return this.http.get<UserbyID>(`${this.baseUrl}user/user/${id}`, { headers: this.headers });
  }

  register(data : any): Observable<any> {
    return this.http.post<UserRegister>(`${this.baseUrl}auth/signup`,data,{ headers: this.headers });
  }


  obtenerbycode(code: string): Observable<Userverificar>{
    return this.http.get<Userverificar>(`${this.baseUrl}user/ingreso/${code}`);
  }

  sendEmail(code: string): Observable<Userverificar>{
    return this.http.get<Userverificar>(`${this.baseUrl}user/ingreso/${code}`);
  }

}
