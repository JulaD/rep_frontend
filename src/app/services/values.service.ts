import { HttpClient } from '@angular/common/http';
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

  getParameters() {
    return this.http.get<any>('http://localhost:8000/parameters');
  }

  modifyParameter(parameters: DefaultWeightDTO[] | DefaultExtraDataDTO[] | EquationConstantDTO[]) {
    const { parameterType } = parameters[0];
    return this.http.put<any>('http://localhost:8000/parameters/parameterUpdate', { parameters, parameterType });
  }
}
