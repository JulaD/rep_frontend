import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth, Register, User } from '../models';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  loggedUser: User = {
    id: NaN,
    name: '',
    email: '',
    organization: '',
    type: NaN,
    status: NaN,
    active: false,
    createdAt: new Date(),
  }

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  register(user: Register) {
    return this.http.post<any>('http://localhost:3000/users', user);
  }

  login(user: Auth): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users/login', user);
  }


  //-------------------------------------------------------------------------
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
