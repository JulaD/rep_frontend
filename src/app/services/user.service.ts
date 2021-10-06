import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  getAllUsers(limit: number, offset: number, busqueda: string) {
    return this.http.get<any>('http://localhost:3000/users?' + 'limit=' + limit + '&offset=' + offset + '&search=' + busqueda);
  }

  getPendingUsers(limit: number, offset: number, busqueda: string) {
    return this.http.get<any>('http://localhost:3000/users/pending?' + 'limit=' + limit + '&offset=' + offset + '&search=' + busqueda);
  }

  getApprovedUsers(limit: number, offset: number, busqueda: string) {
    return this.http.get<any>('http://localhost:3000/users/approved?' + 'limit=' + limit + '&offset=' + offset + '&search=' + busqueda);
  }

  approve(id: number) {
    return this.http.put<any>('http://localhost:3000/users/' + id + '/approve', undefined);
  }

  cancel(id: number) {
    return this.http.put<any>('http://localhost:3000/users/' + id + '/cancel', undefined);
  }
}
