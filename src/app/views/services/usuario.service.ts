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

  obtener( limit: number, page: number, filter?: any ): Observable<UserDataList> {
    let url = `${this.baseUrl}user?limit=${limit}&page=${page}`;
    const filterStr = JSON.stringify(filter);
    if(filter){
      url += `&filter=${filterStr}`;
    }
    return this.http.get<UserDataList>(url, { headers: this.headers });
   }

  obtenerbyid( id: number ): Observable<UserbyID> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<UserbyID>(`${this.baseUrl}user/${id}`, { headers: headers });
  }

  register(data : any): Observable<any> {
    return this.http.post<UserRegister>(`${this.baseUrl}auth/signup`,data,{ headers: this.headers });
  }

  registerAcceso(data : any): Observable<any> {
    return this.http.post<UserRegister>(`${this.baseUrl}user/acceso`,data,{ headers: this.headers });
  }

  deleteAcceso(id : number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}user/acceso?acceso_id=${id}`,{ headers: this.headers });
  }

}
