import { Component, OnInit } from "@angular/core";

interface Edad {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-calculos-paso1',
  templateUrl: './calculos-paso1.component.html',
  styleUrls: ['./calculos-paso1.component.css']
})
export class CalculosPaso1Component implements OnInit {
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
  
  constructor() { }

  ngOnInit(): void {
  }
}

