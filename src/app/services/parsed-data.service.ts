import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GrupoEtario } from '../models/grupo-etario';

@Injectable({
  providedIn: 'root',
})
export class ParsedDataService {
  private gruposEtarios : GrupoEtario[];

  constructor(private router: Router) { }

  getData() : GrupoEtario[] {
    const ret = this.gruposEtarios;
    this.gruposEtarios = []; // No queda en el servicio la última plantilla procesada por el usuario
    return ret;
  }

  changeData(grupos : GrupoEtario[]) {
    this.gruposEtarios = grupos;
  }

  parseData(sheetData: any) {
    const grupos : GrupoEtario [] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const data of sheetData) {
      grupos.push(new GrupoEtario(
        data.age,
        data.sex,
        data.medianWeight,
        data.population,
      ));
    }
    this.changeData(grupos);
    // eslint-disable-next-line no-irregular-whitespace
    this.router.navigate(['/stepper'], { queryParams: { skipLocationChange: true }​​​​​​​ });
  }
}
