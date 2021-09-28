import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Sexo } from '../enums/Sexo';
import { GrupoEtario } from '../models/grupo-etario';

@Injectable({
  providedIn: 'root'
})
export class ParsedDataService {

  private gruposEtarios : GrupoEtario[];

  constructor(private router: Router) { }

  getData() : GrupoEtario[] {
    return this.gruposEtarios;
  }

  changeData(grupos : GrupoEtario[]) {
    this.gruposEtarios = grupos;
  }

  parseData(sheetData: any) {
    let grupos : GrupoEtario [] = [];  
    for (let data of sheetData) {
      grupos.push(new GrupoEtario(
        data.age,
        data.sex,
        data.medianWeight,
        data.population))  
    }
    this.changeData(grupos);
    this.router.navigate(['/stepper'], { queryParams: {skipLocationChange: true}​​​​​​​}​);
  }

}