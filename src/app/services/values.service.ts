import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import DefaultExtraDataDTO from '../interfaces/DefaultExtraDataDTO';
import DefaultWeightDTO from '../interfaces/DefaultWeightDTO';
import EquationConstantDTO from '../interfaces/EquationConstantDTO';

@Injectable({
  providedIn: 'root',
})
export class ValuesService {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

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

  getParameters() {
    return this.http.get<any>('http://localhost:8000/parameters', this.options());
  }

  modifyParameter(parameters: DefaultWeightDTO[] | DefaultExtraDataDTO[] | EquationConstantDTO[]) {
    return this.http.put<any>('http://localhost:8000/parameters/parameterUpdate', { parameters }, this.options());
  }
}
