import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface Edad {
  value: string;
  viewValue: string;
}

interface EdadCantMediana {
  edad: string;
  cantidad: number;
  mediana: number;
}

const FEMENINO_DATA: EdadCantMediana[] = [
  { edad: '1 Año', cantidad: 151, mediana: 9.5 },
  { edad: '2 Años', cantidad: 441, mediana: 12.0 },
  { edad: '3 Años', cantidad: 411, mediana: 14.2 },
  { edad: '4 Años', cantidad: 846, mediana: 15.4 },
  { edad: '5 Años', cantidad: 456, mediana: 17.9 },
  { edad: '6 Años', cantidad: 894, mediana: 19.9 },
  { edad: '7 Años', cantidad: 120, mediana: 22.4 },
  { edad: '8 Años', cantidad: 784, mediana: 25.8 },
  { edad: '9 Años', cantidad: 9561, mediana: 28.1 },
  { edad: '10 Años', cantidad: 7984, mediana: 31.9 },
  { edad: '11 Años', cantidad: 845, mediana: 36.9 },
  { edad: '12 Años', cantidad: 1511, mediana: 41.5 },
  { edad: '13 Años', cantidad: 946, mediana: 45.8 },
  { edad: '14 Años', cantidad: 496, mediana: 47.6 },
  { edad: '15 Años', cantidad: 794, mediana: 52.1 },
  { edad: '16 Años', cantidad: 48, mediana: 53.5 },
  { edad: '17 Años', cantidad: 749, mediana: 54.4 },
  { edad: '18-29 Años', cantidad: 554, mediana: 60.0 },
  { edad: '30-59 Años', cantidad: 461, mediana: 60.0 },
  { edad: '60+ Años', cantidad: 1288, mediana: 60.0 },
];

@Component({
  selector: 'app-calculos-paso1',
  templateUrl: './calculos-paso1.component.html',
  styleUrls: ['./calculos-paso1.component.css'],
})
export class CalculosPaso1Component implements AfterViewInit {
  edades: Edad[] = [
    { value: 'meses-0', viewValue: '0 Meses' },
    { value: 'meses-1', viewValue: '1 Meses' },
    { value: 'meses-2', viewValue: '2 Meses' },
    { value: 'meses-3', viewValue: '3 Meses' },
    { value: 'meses-4', viewValue: '4 Meses' },
    { value: 'meses-5', viewValue: '5 Meses' },
    { value: 'meses-6', viewValue: '6 Meses' },
    { value: 'meses-7', viewValue: '7 Meses' },
    { value: 'meses-8', viewValue: '8 Meses' },
    { value: 'meses-9', viewValue: '9 Meses' },
    { value: 'meses-10', viewValue: '10 Meses' },
    { value: 'meses-11', viewValue: '11 Meses' },
    { value: 'anios-1', viewValue: '1 Año' },
    { value: 'anios-2', viewValue: '2 Años' },
    { value: 'anios-3', viewValue: '3 Años' },
    { value: 'anios-4', viewValue: '4 Años' },
    { value: 'anios-5', viewValue: '5 Años' },
    { value: 'anios-6', viewValue: '6 Años' },
    { value: 'anios-7', viewValue: '7 Años' },
    { value: 'anios-8', viewValue: '8 Años' },
    { value: 'anios-9', viewValue: '9 Años' },
    { value: 'anios-10', viewValue: '10 Años' },
    { value: 'anios-11', viewValue: '11 Años' },
    { value: 'anios-12', viewValue: '12 Años' },
    { value: 'anios-13', viewValue: '13 Años' },
    { value: 'anios-14', viewValue: '14 Años' },
    { value: 'anios-15', viewValue: '15 Años' },
    { value: 'anios-16', viewValue: '16 Años' },
    { value: 'anios-17', viewValue: '17 Años' },
    { value: 'anios-18-29', viewValue: '18-29 Años' },
    { value: 'anios-30-59', viewValue: '30-59 Años' },
    { value: 'anios-60+', viewValue: '60+ Años' },
  ];

  displayedColumns: string[] = ['edad', 'cantidad', 'mediana'];

  dataSource = new MatTableDataSource<EdadCantMediana>(FEMENINO_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
