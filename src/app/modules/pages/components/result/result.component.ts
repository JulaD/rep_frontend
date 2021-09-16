import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalculatorResponseDTO } from 'src/app/interfaces/CalculatorResponseDTO';

export interface RequerimientoEnergetico {
  texto: string,
  femenino: number;
  masculino: number;
}

const TABLA_DATA: RequerimientoEnergetico[] = [
  {texto: 'Requerimiento energético por persona', femenino: 300, masculino: 400},
  {texto: 'Requerimiento energético del grupo', femenino: 4500, masculino: 6800},
];

const TABLA_DATA2: RequerimientoEnergetico[] = [
  {texto: 'Requerimiento energético por persona', femenino: 300, masculino: 400},
  {texto: 'Requerimiento energético del grupo', femenino: 4500, masculino: 6800},
];


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {
  parsedObtainedResult :CalculatorResponseDTO;
  requerimientoTotal: number = 0;
  poblacionTotal: number = 0;

  constructor( private route: ActivatedRoute) {}
  displayedColumns: string[] = ['texto','femenino', 'masculino'];
  dataSource = TABLA_DATA;
  dataSource2 = TABLA_DATA2;
  
  ngOnInit(): void {
    const myObj: any = this.route.snapshot.queryParamMap.get('result');
    if (myObj != null) {
      this.parsedObtainedResult = JSON.parse(myObj);
      this.requerimientoTotal = this.parsedObtainedResult.requerimientoTotal.requerimientoEnergeticoPerCapita;
      this.poblacionTotal = this.parsedObtainedResult.requerimientoTotal.poblacionTotal;
    }
  }

}