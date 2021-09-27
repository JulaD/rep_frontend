import { FranjaEtaria } from "./FranjaEtaria";
import { Sexo } from "./Sexo";

// export interface GrupoEtario {
//   edad: FranjaEtaria;
//   sexo: Sexo;
//   cantidad: number;
//   pesoMediano: number;
// }

export class GrupoEtario {

  constructor(
    public edad: FranjaEtaria,
    public sexo: Sexo,
    public pesoMediano: number,
    public cantidad: number
  ) {  }

  // getEdad(): FranjaEtaria {
  //   return this.edad;
  // }

  // getSexo(): Sexo {
  //   return this.sexo;
  // }

  // getPesoMediano(): number {
  //   return this.pesoMediano;
  // }

  // getCantidad(): number {
  //   return this.cantidad;
  // }
}