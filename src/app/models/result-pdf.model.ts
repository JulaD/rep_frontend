import { MatTableDataSource } from '@angular/material/table';
import { RequerimientoEnergetico } from '../modules/pages/components/result/result.component';

/**
 * Contiene los datos a ser desplegados en el pdf de descarga de los resultados.
 */
export class ResultPdf {
  constructor(
    public totalPopulation : number,
    public totalRequirement : number,
    public totalPerCapitaRequirement : number,
    public dataSources : {
      title: string,
      subtitle: number,
      femenine: number,
      masculine: number,
      source: MatTableDataSource<RequerimientoEnergetico>
    }[],
  ) { }
}
