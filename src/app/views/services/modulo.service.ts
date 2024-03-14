import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
   
   private readonly baseUrl: string = environment.baseURL;

   constructor(private http: HttpClient) { }

  private moduloSubject = new BehaviorSubject<any[]>([]);
  private accesosSubject = new BehaviorSubject<any[]>([]);
  
  public modulo$: Observable<any[]> = this.moduloSubject.asObservable();
  public accesos$: Observable<any[]> = this.accesosSubject.asObservable();
  
  private headers = new HttpHeaders()
   .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  setModulo(modulo: any[]): void {
    this.moduloSubject.next(modulo);
  }

  setAcceso(acceso : any[]): void {
    this.accesosSubject.next(acceso);
  }

  listModule(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}modulo`, { headers: this.headers });
  }

  register(data : any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}module`,data,{ headers: this.headers });
  }

  

}
