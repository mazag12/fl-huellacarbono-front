import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { LoginResponse, User } from '../interfaces';
import { AuthStatus } from '../Enum/auth-status.enum';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseURL;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _authSatatus = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authSatatus() );

  constructor() {

    this.checkAuthStatus().subscribe();

  }

  private setAuthentication(token: string): boolean{

    const payload = this.getJwtPayload(token);

    const user: User = {
      sub: payload.sub,
      code: payload.code,
      email: payload.email,
      nombre: payload.nombre,
      apellido: payload.apellido,
      role: payload.role,
      iat: payload.iat,
      exp: payload.exp,
      aud: payload.aud
    };

    this._currentUser.set(user);
    this._authSatatus.set( AuthStatus.authenticated );


    localStorage.setItem('token', token);

    return true;
  }

  login( code: string, password: string ): Observable<boolean>{

    const url = `${ this.baseUrl }auth/signin`;
    const body = { code, password} ;

    return this.http.post<LoginResponse>(url, body)
    .pipe(
      map(token => {
        return this.setAuthentication(token.data);
      }),
      catchError( err => throwError( () => err.error.message ))
      );
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

    const token = localStorage.getItem('token');


    if( !token ){
      this.logout();
      return of(false);
    };

    // if (!expiration || new Date(expiration) < new Date()) {
    //   this.logout();
    //   return of(false);
    // }

    this._authSatatus.set( AuthStatus.authenticated );

    return of(true);
  }

  logout(){
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authSatatus.set( AuthStatus.notAuthenticated );
  }

}


