import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { step2Suman100Validator } from 'src/app/modules/shared/validators/step2-suman-100.directive';

// El regex es ^(un entero >= 0)|(un decimal >= 0)$
const numeroFloatY0Re: RegExp =
  new RegExp(/^((\d*)|(\d*\.\d+))$/)

@Component({
  selector: 'app-calculos-paso2',
  templateUrl: './calculos-paso2.component.html',
  styleUrls: ['./calculos-paso2.component.css'],
})
export class CalculosPaso2Component {

  constructor() {}

  minorPALForm = new FormGroup({
    lowPAL: new FormControl('', [Validators.pattern(numeroFloatY0Re),
      Validators.min(0),
      Validators.max(100)]),
    moderatePAL: new FormControl('', [Validators.pattern(numeroFloatY0Re),
      Validators.min(0),
      Validators.max(100)]),
    intensePAL: new FormControl('', [Validators.pattern(numeroFloatY0Re),
      Validators.min(0),
      Validators.max(100)])
  }, {validators: step2Suman100Validator});
}
