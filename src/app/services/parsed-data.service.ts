import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import FranjaEtaria from '../enums/FranjaEtaria';
import Sexo from '../enums/Sexo';
import ExtraData from '../interfaces/ExtraDataDTO';
import { GrupoEtario } from '../models/grupo-etario';
import { AgeGroupJSON } from './rest/rest.service';

@Injectable({
  providedIn: 'root',
})
export class ParsedDataService {
  private gruposEtarios : GrupoEtario[];

  private fromTemplate: boolean;

  private extraData: ExtraData | null = null;

  constructor(private router: Router) { }

  getGroupData() : GrupoEtario[] {
    const ret = this.gruposEtarios;
    this.gruposEtarios = []; // No queda en el servicio la última plantilla procesada por el usuario
    return ret;
  }

  getExtraData() : ExtraData | null {
    const ret = this.extraData;
    // No queda en el servicio la última plantilla procesada por el usuario
    this.extraData = null;
    return ret;
  }

  isFromTemplate() {
    return this.fromTemplate;
  }

  changeGroupData(grupos : GrupoEtario[]) {
    this.gruposEtarios = grupos;
  }

  changeExtraData(data : ExtraData) {
    this.extraData = data;
  }

  parseSheetData(sheetData: any) {
    const grupos : GrupoEtario [] = [];
    this.fromTemplate = true;
    // eslint-disable-next-line no-restricted-syntax
    for (const data of sheetData) {
      grupos.push(new GrupoEtario(
        data.age,
        data.sex,
        data.medianWeight,
        data.population,
      ));
    }
    this.changeGroupData(grupos);
    // eslint-disable-next-line no-irregular-whitespace
    this.router.navigate(['/stepper'], { queryParams: { skipLocationChange: true }​​​​​​​ });
  }

  parseAllStepsData(data: {
    step1Data: AgeGroupJSON[],
    extraData: ExtraData
  }) {
    const grupos : GrupoEtario [] = [];
    this.fromTemplate = false;
    // eslint-disable-next-line no-restricted-syntax
    for (const grupo of data.step1Data) {
      grupos.push(new GrupoEtario(
        grupo.age as FranjaEtaria,
        grupo.sex as Sexo,
        grupo.medianWeight,
        grupo.population,
      ));
    }
    this.changeGroupData(grupos);
    this.changeExtraData(data.extraData);
    // eslint-disable-next-line no-irregular-whitespace
    this.router.navigate(['/stepper'], { queryParams: { skipLocationChange: true }​​​​​​​ });
  }
}
