import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth, Register, User } from '../models';
import { environment } from '../../environments/environment';

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
  };

  private api: string = environment.api;

  private options = () => {
    let token: string = '';
    if (localStorage.getItem('token')) {
      token = String(localStorage.getItem('token'));
    }
    return {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    };
  };

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  register(user: Register) {
    return this.http.post<any>(`${this.api}/users`, user);
  }

  login(user: Auth): Observable<{token: string, user: User}> {
    return this.http
      .post<{token: string, user: User}>(`${this.api}/users/login`, user)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.user.id);
          localStorage.setItem('userType', response.user.type);
          localStorage.setItem('userName', response.user.name);
        }),
      );
  }

  getUser(): Partial<User> | undefined {
    if (localStorage.getItem('userId') && localStorage.getItem('userType')) {
      return {
        id: Number(localStorage.getItem('userId')),
        type: Number(localStorage.getItem('userType')),
        name: String(localStorage.getItem('userName')),
      };
    }
    return undefined;
  }

  getBackUser(userId: number | undefined): Observable<User> {
    return this.http
      .get<User>(`${this.api}/users/${userId}`, this.options());
  }

  updateUser(userId: number, user: User): Observable<User> {
    return this.http
      .put<User>(`${this.api}/users/${userId}`, user, this.options());
  }

  logout(): void {
    localStorage.clear();
  }

  checkUser(): Observable<{userId: number, userType: number}> {
    return this.http
      .post<{userId: number, userType: number}>(
      `${this.api}/users/check-user`, {}, this.options(),
    );
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
