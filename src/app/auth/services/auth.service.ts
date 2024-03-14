import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { LoginResponse, Token, Userverificar } from '../interfaces';
import { AuthStatus } from '../Enum/auth-status.enum';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private readonly baseUrl: string = environment.baseURL;

  private http = inject( HttpClient );

  private _currentUser = signal<Token|null>(null);
  private _authSatatus = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authSatatus() );

  private dataSource = new BehaviorSubject<any>(null);
  currentData = this.dataSource.asObservable();

  login( code: string, password: string ): Observable<boolean>{
    const body = { code, password} ;
    return this.http.post<LoginResponse>(`${ this.baseUrl }auth/signin`, body)
    .pipe(
      map(token => {
        return this.setAuthentication(token.data);
      }),
      catchError( err => throwError( () => err.error.message ))
    );
  }

  recuperar( body: any): Observable<boolean>{
    return this.http.post<LoginResponse>(`${ this.baseUrl }auth/password-reset`, body)
    .pipe(
      map(token => {
        return this.setAuthentication(token.data);
      }),
      catchError( err => throwError( () => err.error.message ))
    );
  }

  getuser( code: string ): Observable<Userverificar> {
    return this.http.get<Userverificar>(`${this.baseUrl}auth/${code}`);
  }

  sendMail( code: number, email: string, nombre: string): Observable<SendMail>{
    const body = { code, email, nombre} ;
    return this.http.post<SendMail>(`${ this.baseUrl }auth/password-recovery`, body);
  }

  private setAuthentication(token: string): boolean{
    const payload: Token  = this.getJwtPayload(token);

    this._currentUser.set(payload);
    this._authSatatus.set( AuthStatus.authenticated );

    localStorage.setItem('token', token);

    return true;
  }

  obtenerbyid( code: string ): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}auth/${code}`);
  }

  getJwtPayload(token: string): any {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  checkAuthStatus():Observable<boolean>{

    if( !localStorage.getItem('token') ){
      this.logout();
      return of(false);
    };
    const token = localStorage.getItem('token');
    let currentUser;

    if(token){
      currentUser = this.getJwtPayload(token.toString());
    }

    this._currentUser.set(currentUser)

    this._authSatatus.set( AuthStatus.authenticated );

    return of(true);
  }

  logout(){
    this._currentUser.set(null);
    this._authSatatus.set( AuthStatus.notAuthenticated );
    localStorage.clear();
  }

  updateData(data: any) {
    this.dataSource.next(data);
  }

}

export interface SendMail {
  data: Data;
}

export interface Data {
  message: string;
}


