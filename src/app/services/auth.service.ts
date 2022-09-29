import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ALERT_MESSAGE } from '../enums/erro-mensagem.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint = 'auth/signIn';
  api = environment.api;

  constructor(private http: HttpClient, private router: Router) {}

  public signIn(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/${this.endpoint}`, data).pipe(
      tap((res) => {
        if (res) {
          localStorage.setItem('access_token', res);
          this.router.navigate(['home']);
        }
      }),
      catchError((e) => {
        if (e.error.message) return throwError(() => e.error.message);
        return throwError(() => ALERT_MESSAGE.ERROR_SIGNIN);
      })
    );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (!!token) {
      return false;
    }
    return true;
  }

  public logout() {
    localStorage.removeItem('acess_token');
    return this.router.navigate(['']);
  }
}
