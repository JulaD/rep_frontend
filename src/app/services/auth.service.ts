import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Auth, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private url: string = environment.api;

  // constructor(
  //   private http: HttpClient,
  //   private router: Router
  // ) { }

  // isAuth(): boolean {
  //   return localStorage.getItem('token') ? true : false;
  // }

  // login(auth: Auth): Observable<any> {
  //   return this.http
  //     .post(`${this.url}/login`, auth)
  //     .pipe(
  //       tap((response: any) => {
  //         let user: User = response.user;
  //         localStorage.setItem('token', response.token);
  //         localStorage.setItem('name', user.name);
  //         localStorage.setItem('email', user.email);
  //         localStorage.setItem('role', String(user.type));
  //       })
  //     );
  // }

  // logout(): void {
  //   localStorage.clear();
  //   this.router.navigate(['auth/login']);
  // }
}