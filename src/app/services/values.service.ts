import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import DefaultExtraDataDTO from '../interfaces/DefaultExtraDataDTO';
import DefaultWeightDTO from '../interfaces/DefaultWeightDTO';
import EquationConstantDTO from '../interfaces/EquationConstantDTO';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ValuesService {
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

  getParameters() {
    return this.http.get<any>(`${this.api}/parameters`, this.options());
  }

  modifyParameter(parameters: DefaultWeightDTO[] | DefaultExtraDataDTO[] | EquationConstantDTO[]) {
    return this.http.put<any>(`${this.api}/parameters/parameterUpdate`, { parameters }, this.options());
  }
}
