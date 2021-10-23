/* eslint-disable linebreak-style */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { User } from '../models';
import { environment } from '../../environments/environment';
import { FAQ } from '../models/faq.model';
import { CreateFaqDTO } from '../interfaces/create-faqDTO';

@Injectable({
  providedIn: 'root',
})
export class FAQService {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

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

  getFAQs(): Observable<FAQ[]> {
    return this.http
      .get<FAQ[]>(`${this.api}/faqs`, this.options());
  }

  createFAQ(dto: CreateFaqDTO): Observable<FAQ> {
    return this.http
      .post<FAQ>(`${this.api}/faqs`, dto, this.options());
  }

  updateFAQ(id: number, dto: CreateFaqDTO): Observable<FAQ> {
    return this.http
      .put<FAQ>(`${this.api}/faqs/${id}`, dto, this.options());
  }

  deleteFAQ(id: number): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.api}/faqs/${id}`, this.options());
  }
}
