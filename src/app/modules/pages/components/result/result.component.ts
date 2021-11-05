import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { GroupEnergeticRequirement } from 'src/app/interfaces/GroupEnergeticRequirement';
import { ResultsService } from 'src/app/services/results.service';
import CalculatorResponse from 'src/app/interfaces/CalculatorResponseDTO';
import { ResultPdf } from 'src/app/models/result-pdf.model';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';
import { AgeGroupJSON } from 'src/app/services/rest/rest.service';
import ExtraData from 'src/app/interfaces/ExtraDataDTO';
import FranjaEtaria, { compareFranjaEtariaWithString } from 'src/app/enums/FranjaEtaria';

export interface RequerimientoEnergetico {
  texto: string,
  femenino: number;
  masculino: number;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})

export class ResultComponent implements OnInit {
  parsedObtainedResult: {
    resp: CalculatorResponse,
    popData: AgeGroupJSON[],
    extraData: ExtraData
  };

  totalRequirement: number = 0;

  totalPerCapitaRequirement: number = 0;

  totalPopulation: number = 0;

  displayedColumns: string[] = ['texto', 'femenino', 'masculino'];

  dataSources: {
    title: string,
    subtitle: number,
    femenine: number,
    masculine: number,
    source: MatTableDataSource<RequerimientoEnergetico>
  }[];

  extraData: ExtraData;

  populationData: AgeGroupJSON[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resultsService: ResultsService,
    private pdfService: PdfGeneratorService,
  ) {
    this.resultsService.result$
      .subscribe((response) => {
        this.parsedObtainedResult = response;
        this.setValues(response.resp, response.popData, response.extraData);
      });
  }

  ngOnInit(): void {
    if (!this.parsedObtainedResult) {
      this.router.navigate(['/calculos']);
    }
  }

  setValues(result: CalculatorResponse, popData: AgeGroupJSON[], extraData: ExtraData): void {
    if (popData) {
      this.populationData = popData;
    }
    if (extraData) {
      this.extraData = extraData;
    }
    if (result) {
      // eslint-disable-next-line no-bitwise
      this.totalRequirement = Math.round(
        result?.totalRequirement?.total,
      ) | 0;
      // eslint-disable-next-line no-bitwise
      this.totalPerCapitaRequirement = Math.round(
        result?.totalRequirement?.perCapita,
      ) | 0;
      // eslint-disable-next-line no-bitwise
      this.totalPopulation = result?.totalRequirement!.totalPopulation | 0;
      const groupedByAge = this.groupByAge(result?.groupsRequirements);
      const keys = Object.keys(groupedByAge).sort(compareFranjaEtariaWithString);
      this.dataSources = keys.map((key: string) => {
        let femenineAmount: number = 0;
        let masculineAmount: number = 0;
        let totalAmount: number = 0;
        let femeninePer: number = 0;
        let femenineTotal: number = 0;
        let masculinePer: number = 0;
        let masculineTotal: number = 0;
        // eslint-disable-next-line array-callback-return
        groupedByAge[key].map((value: GroupEnergeticRequirement) => {
          totalAmount += Number(value.group.population);
          if (value?.group?.sex === 'Femenino') {
            femenineAmount = value.group.population;
            femeninePer = value.perCapita;
            femenineTotal = value.total;
          } else if (value?.group?.sex === 'Masculino') {
            masculineAmount = value.group.population;
            masculinePer = value.perCapita;
            masculineTotal = value.total;
          }
        });
        return {
          title: key,
          subtitle: totalAmount,
          femenine: femenineAmount,
          masculine: masculineAmount,
          source: new MatTableDataSource<RequerimientoEnergetico>([{
            texto: 'Requerimiento energético diario por persona',
            femenino: Math.round(femeninePer),
            masculino: Math.round(masculinePer),
          }, {
            texto: 'Requerimiento energético diario del grupo',
            femenino: Math.round(femenineTotal),
            masculino: Math.round(masculineTotal),
          }]),
        };
      });
    }
  }

  groupByAge(array: GroupEnergeticRequirement[]): {[attr: string]: GroupEnergeticRequirement[]} {
    return array.reduce((objectsByKeyValue: any, obj: GroupEnergeticRequirement) => {
      const value: string = obj.group.age;
      // eslint-disable-next-line no-param-reassign
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
  }

  generatePDF() {
    const result : ResultPdf = new ResultPdf(
      this.totalPopulation,
      this.totalRequirement,
      this.totalPerCapitaRequirement,
      this.dataSources,
    );
    this.pdfService.generateResults(result);
  }

  saveProgress() {
    const progress = { step1Data: this.populationData, extraData: this.extraData };

    const date = new Date();
    const fileName : string = `ProgresoCalculoREP_${
      date.getDate()}_${
      date.getMonth() + 1}_${
      date.getFullYear()}.json`;

    const csv: string = `data:text/json;charset=utf-8,${JSON.stringify(progress)}`;
    const data = encodeURI(csv);

    const link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', fileName);
    link.click();
  }

  mostrarFranja(franja: string) {
    if (franja === FranjaEtaria.Meses_1 as string) {
      return '1 mes';
    }

    if (franja === FranjaEtaria.Anios_1 as string) {
      return '1 año';
    }

    return franja as string;
  }

  mostrarPersonas(cantidad: number) {
    if (cantidad === 1) {
      return 'persona';
    }

    return 'personas';
  }
}
