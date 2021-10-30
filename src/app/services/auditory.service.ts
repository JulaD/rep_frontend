import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuditorySearch } from '../models/auditory-search.model';

@Injectable({
  providedIn: 'root',
})
export class AuditoryService {
  constructor(private http: HttpClient) { }

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

  getLogs(search: AuditorySearch) {
    const endpoint: string = `${this.api}/auditory?cant=${search.cant}&page=${search.page}`;
    return this.http.get<any>(endpoint, this.options());
  }
}
