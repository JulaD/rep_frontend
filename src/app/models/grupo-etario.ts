import { FranjaEtaria } from "../enums/FranjaEtaria";
import { Sexo } from "../enums/Sexo";

export class GrupoEtario {

  constructor(
    public edad: FranjaEtaria,
    public sexo: Sexo,
    public pesoMediano: number,
    public cantidad: number
  ) {  }
}