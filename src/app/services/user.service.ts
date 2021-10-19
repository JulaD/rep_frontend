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

  getAllUsers(limit: number, offset: number, busqueda: string) {
    return this.http.get<any>(`${this.api}/users?limit=${limit}&offset=${offset}&search=${busqueda}`,
      this.options());
  }

  getPendingUsers(limit: number, offset: number, busqueda: string) {
    return this.http.get<any>(`${this.api}/users/pending?limit=${limit}&offset=${offset}&search=${busqueda}`,
      this.options());
  }

  getApprovedUsers(limit: number, offset: number, busqueda: string) {
    return this.http.get<any>(`${this.api}/users/approved?limit=${limit}&offset=${offset}&search=${busqueda}`,
      this.options());
  }

  approve(id: number) {
    return this.http.put<any>(`${this.api}/users/${id}/approve`, undefined, this.options());
  }

  cancel(id: number) {
    return this.http.put<any>(`${this.api}/users/${id}/cancel`, undefined, this.options());
  }

  getUsers(limit: number, offset: number, busqueda: string) {
    return this.http.get<any>(`${this.api}/users/clients?limit=${limit}&offset=${offset}&search=${busqueda}`,
      this.options());
  }

  getAdmins(limit: number, offset: number, busqueda: string) {
    return this.http.get<any>(`${this.api}/users/admins?limit=${limit}&offset=${offset}&search=${busqueda}`,
      this.options());
  }

  giveAdminPermission(id: number) {
    return this.http.put<any>(`${this.api}/users/${id}/admin`, undefined, this.options());
  }

  removeAdminPermission(id: number) {
    return this.http.put<any>(`${this.api}/users/${id}/client`, undefined, this.options());
  }
}
