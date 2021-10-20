/* eslint-disable linebreak-style */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { User } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  private api: string = environment.usersApi;

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

  getUsers(type:string, limit: number, offset: number, busqueda: string) {
    return this.http.get<any>(`${this.api}/users/?type=${type}&limit=${limit}&offset=${offset}&search=${busqueda}`,
      this.options());
  }

  approve(id: number) {
    return this.http.put<any>(`${this.api}/users/${id}/approve`, undefined, this.options());
  }

  cancel(id: number) {
    return this.http.put<any>(`${this.api}/users/${id}/cancel`, undefined, this.options());
  }

  giveAdminPermission(id: number) {
    return this.http.put<any>(`${this.api}/users/${id}/admin`, undefined, this.options());
  }

  removeAdminPermission(id: number) {
    return this.http.put<any>(`${this.api}/users/${id}/client`, undefined, this.options());
  }
}
