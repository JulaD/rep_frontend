import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import AdultPAL from 'src/app/interfaces/AdultPALDTO';
import { groupSuman100Validator } from 'src/app/modules/shared/validators/group-suman-100.directive';
import { numeroFloatValidator } from 'src/app/modules/shared/validators/numbers-validation';

const percentageValidators: ValidatorFn[] = [
  numeroFloatValidator,
  Validators.min(0),
  Validators.max(100)];

@Component({
  selector: 'app-calculos-paso3',
  templateUrl: './calculos-paso3.component.html',
  styleUrls: ['./calculos-paso3.component.css'],
})
export class CalculosPaso3Component {

  constructor() {}

  adultPALForm = new FormGroup({
    population: new FormGroup({
      ruralPercentage: new FormControl('', percentageValidators),
      urbanPercentage: new FormControl('', percentageValidators)
    }, {validators: groupSuman100Validator(2)}),
    ruralPAL: new FormGroup({
      activeRuralPAL: new FormControl('', percentageValidators),
      lowRuralPAL: new FormControl('', percentageValidators)
    }, {validators: groupSuman100Validator(2)}),
    urbanPAL: new FormGroup({
      activeUrbanPAL: new FormControl('', percentageValidators),
      lowUrbanPAL: new FormControl('', percentageValidators)
    }, {validators: groupSuman100Validator(2)})
  });

  sendData(): AdultPAL {
    const ruralPercentage: number = Number(this.adultPALForm.get('population.ruralPercentage')?.value);
    const urbanPercentage: number = Number(this.adultPALForm.get('population.urbanPercentage')?.value);

    const activeRuralPAL: number = Number(this.adultPALForm.get('ruralPAL.activeRuralPAL')?.value);
    const lowRuralPAL: number = Number(this.adultPALForm.get('ruralPAL.lowRuralPAL')?.value);

    const activeUrbanPAL: number = Number(this.adultPALForm.get('urbanPAL.activeUrbanPAL')?.value);
    const lowUrbanPAL: number = Number(this.adultPALForm.get('urbanPAL.lowUrbanPAL')?.value);

    const adultPALData: AdultPAL = {urbanPercentage: urbanPercentage,
      activeUrbanPAL: activeUrbanPAL,
      lowUrbanPAL: lowUrbanPAL,
      ruralPercentage: ruralPercentage,
      activeRuralPAL: activeRuralPAL,
      lowRuralPAL: lowRuralPAL}
  
    return adultPALData
  }
}
