import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import MinorPAL from 'src/app/interfaces/MinorPALDTO';
import { groupSuman100Validator } from 'src/app/modules/shared/validators/group-suman-100.directive';
import { numeroFloatValidator } from 'src/app/modules/shared/validators/numbers-validation';

const percentageValidators: ValidatorFn[] = [
  numeroFloatValidator,
  Validators.min(0),
  Validators.max(100)];

@Component({
  selector: 'app-calculos-paso2',
  templateUrl: './calculos-paso2.component.html',
  styleUrls: ['./calculos-paso2.component.css'],
})
export class CalculosPaso2Component {

  constructor() {}

  minorPALForm = new FormGroup({
    lowPAL: new FormControl('', percentageValidators),
    moderatePAL: new FormControl('', percentageValidators),
    intensePAL: new FormControl('', percentageValidators)
  }, {validators: groupSuman100Validator(3)});

  sendData(): MinorPAL {
    const lowPAL: number = Number(this.minorPALForm.get('lowPAL')?.value);
    const moderatePAL: number = Number(this.minorPALForm.get('moderatePAL')?.value);
    const intensePAL: number = Number(this.minorPALForm.get('intensePAL')?.value);

    const minorPALData: MinorPAL = {lowPALPrevalence: lowPAL,
      moderatePALPrevalence: moderatePAL,
      intensePALPrevalence: intensePAL}
    
    return minorPALData
  }
}
