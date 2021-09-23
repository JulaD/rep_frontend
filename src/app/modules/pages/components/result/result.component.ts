import { Component, OnInit } from '@angular/core';

export interface RequerimientoEnergetico {
  texto: string,
  femenino: number;
  masculino: number;
}

const TABLA_DATA: RequerimientoEnergetico[] = [
  { texto: 'Requerimiento energético por persona', femenino: 300, masculino: 400 },
  { texto: 'Requerimiento energético del grupo', femenino: 4500, masculino: 6800 },
];

const TABLA_DATA2: RequerimientoEnergetico[] = [
  { texto: 'Requerimiento energético por persona', femenino: 300, masculino: 400 },
  { texto: 'Requerimiento energético del grupo', femenino: 4500, masculino: 6800 },
];

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})

export class ResultComponent implements OnInit {
  displayedColumns: string[] = ['texto', 'femenino', 'masculino'];

  dataSource = TABLA_DATA;

  dataSource2 = TABLA_DATA2;

  ngOnInit(): void {
  }
}
