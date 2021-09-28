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
    if (sheetData.hombresMenores) {
      this.addMascs(sheetData.hombresMenores, grupos);
    }
    if (sheetData.hombres) {
      this.addMascs(sheetData.hombresMenores, grupos);
    }
    if (sheetData.mujeresMenores) {
      this.addFems(sheetData.mujeresMenores, grupos);
    }
    if (sheetData.mujeres) {
      this.addMascs(sheetData.mujeres, grupos);
    }
    this.changeData(grupos);
    this.router.navigate(['/by-hand'], { queryParams: {skipLocationChange: true}​​​​​​​}​);
  }

  addMascs(mascs : any, grupos : GrupoEtario[]) {
    for (let m of mascs) {
      grupos.push(new GrupoEtario(
        m.edad,
        Sexo.Masculino,
        m.peso? m.peso : m.talla,
        0));
    }
  }

  addFems(fems : any, grupos : GrupoEtario[]) {
    for (let f of fems) {
      grupos.push(new GrupoEtario(
        f.edad,
        Sexo.Femenino,
        f.peso? f.peso : f.talla,
        0));
    }
  }

}