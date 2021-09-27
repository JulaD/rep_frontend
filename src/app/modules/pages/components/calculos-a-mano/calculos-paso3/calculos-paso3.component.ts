import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// El regex es ^(un entero >= 0)|(un decimal >= 0)$
const numeroFloatY0Re: RegExp =
  new RegExp(/^((\d*)|(\d*\.\d+))$/)

@Component({
  selector: 'app-calculos-paso3',
  templateUrl: './calculos-paso3.component.html',
  styleUrls: ['./calculos-paso3.component.css'],
})
export class CalculosPaso3Component {

  constructor() {}

  adultPALForm = new FormGroup({
    population: new FormGroup({
      ruralPercentage: new FormControl('rural'),
      urbanPercentage: new FormControl('urban')
    }),
    ruralPAL: new FormGroup({
      activeRuralPAL: new FormControl('rural active'),
      lowRuralPAL: new FormControl('rural low')
    }),
    urbanPAL: new FormGroup({
      activeUrbanPAL: new FormControl('urban active'),
      lowUrbanPAL: new FormControl('urban low')
    })
  });
}
