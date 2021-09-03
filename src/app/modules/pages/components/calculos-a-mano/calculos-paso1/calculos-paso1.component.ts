import { Component, AfterViewInit, ViewChild } from "@angular/core";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

interface Edad {
  value: string;
  viewValue: string;
}

interface EdadCantMediana {
  edad: number;
  cantidad: number;
  mediana: number;
}

@Component({
  selector: 'app-calculos-paso1',
  templateUrl: './calculos-paso1.component.html',
  styleUrls: ['./calculos-paso1.component.css']
})
export class CalculosPaso1Component implements AfterViewInit {
  edades: Edad[] = [
    {value: 'meses-0', viewValue: '0 Meses'},
    {value: 'meses-1', viewValue: '1 Meses'},
    {value: 'meses-2', viewValue: '2 Meses'},
    {value: 'meses-3', viewValue: '3 Meses'},
    {value: 'meses-4', viewValue: '4 Meses'},
    {value: 'meses-5', viewValue: '5 Meses'},
    {value: 'meses-6', viewValue: '6 Meses'},
    {value: 'meses-7', viewValue: '7 Meses'},
    {value: 'meses-8', viewValue: '8 Meses'},
    {value: 'meses-9', viewValue: '9 Meses'},
    {value: 'meses-10', viewValue: '10 Meses'},
    {value: 'meses-11', viewValue: '11 Meses'},
    {value: 'anios-1', viewValue: '1 Año'},
    {value: 'anios-2', viewValue: '2 Años'},
    {value: 'anios-3', viewValue: '3 Años'}
  ];

  displayedColumns: string[] = ['edad', 'cantidad', 'mediana'];
  dataSource = new MatTableDataSource<EdadCantMediana>(FEMENINO_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

const FEMENINO_DATA: EdadCantMediana[] = [
  {edad: 1, cantidad: 151, mediana: 1.09},
  {edad: 2, cantidad: 441, mediana: 4.06},
  {edad: 3, cantidad: 411, mediana: 6.91},
  {edad: 4, cantidad: 846, mediana: 9.22},
  {edad: 5, cantidad: 456, mediana: 10.11},
  {edad: 6, cantidad: 894, mediana: 12.07},
  {edad: 7, cantidad: 120, mediana: 14.67},
  {edad: 8, cantidad: 784, mediana: 15.94},
  {edad: 9, cantidad: 9561, mediana: 18.84},
  {edad: 10, cantidad: 7984, mediana: 20.97},
  {edad: 11, cantidad: 845, mediana: 22.97},
  {edad: 12, cantidad: 1511, mediana: 24.05},
  {edad: 13, cantidad: 946, mediana: 26.15},
  {edad: 14, cantidad: 496, mediana: 28.05},
  {edad: 15, cantidad: 794, mediana: 30.38},
  {edad: 16, cantidad: 48, mediana: 32.05},
  {edad: 17, cantidad: 749, mediana: 35.43},
  {edad: 18, cantidad: 554, mediana: 39.98},
  {edad: 19, cantidad: 461, mediana: 39.83},
  {edad: 20, cantidad: 1288, mediana: 40.78}
];

