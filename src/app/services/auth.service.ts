import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, Register } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioRegistro: Register = {
    name: '',
    email: '',
    organization: '',
    password: '',
  }

  usuarioLogin: Auth = {
    email: '',
    password: '',
  }

  constructor(
    //private router: Router,
    //private http: HttpClient,
  ) { }

  /*registrar(usuario: Register) {
    return this.http.post<any>('http://localhost:3000/registrar', usuario);
  }

  ingresar(usuario: Auth) {
    return this.http.post<any>('http://localhost:3000/ingresar', usuario);*/


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