import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { LoginResponse, User } from '../interfaces';
import { AuthStatus } from '../Enum/auth-status.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseURL;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _authSatatus = signal<AuthStatus>( AuthStatus.checking );
  private _token = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authSatatus() );

  constructor() {

    this.checkAuthStatus().subscribe();

  }

  private setAuthentication(code: string, token: string): boolean{

    const ahora = new Date();
    const expiracion = new Date(ahora.getTime() + 21600 * 1000);

    this._authSatatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);
    localStorage.setItem('codigo', code);
    localStorage.setItem('expiracion', expiracion.toISOString());

    return true;
  }

  login( code: string, password: string ): Observable<boolean>{

    const url = `${ this.baseUrl }auth/signin`;
    const body = { code, password} ;

    return this.http.post<LoginResponse>(url, body)
    .pipe(
      map(token => {
        return this.setAuthentication(code, token.data);
      }),
      catchError( err => throwError( () => err.error.message ))
      );
  }


  checkAuthStatus():Observable<boolean>{

    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiracion');

    if( !token ){
      this.logout();
      return of(false);
    };

    if (!expiration || new Date(expiration) < new Date()) {
      this.logout();
      return of(false);
    }

    this._authSatatus.set( AuthStatus.authenticated );

    return of(true);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('codigo');
    localStorage.removeItem('expiracion');
    this._currentUser.set(null);
    this._authSatatus.set( AuthStatus.notAuthenticated );
  }

}
