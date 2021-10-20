import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl, FormGroup, ValidatorFn, Validators,
} from '@angular/forms';
import MinorPAL from 'src/app/interfaces/MinorPALDTO';
import { ShowOnDirtyOrTouchedErrorStateMatcher } from 'src/app/modules/shared/dirty-or-touched-error-state-matcher';
import { groupSuman100Validator } from 'src/app/modules/shared/validators/group-suman-100.directive';
import { NumberForForms, numeroFloatValidator } from 'src/app/modules/shared/validators/numbers-validation';

const percentageValidators: ValidatorFn[] = [
  numeroFloatValidator,
  Validators.min(0),
  Validators.max(100)];

@Component({
  selector: 'app-calculos-paso2',
  templateUrl: './calculos-paso2.component.html',
  styleUrls: ['./calculos-paso2.component.css'],
})
export class CalculosPaso2Component implements OnInit {
  @Input() defaultMinorPal: MinorPAL;

  ngOnInit() { this.loadDefaultData() }

  matcher = new ShowOnDirtyOrTouchedErrorStateMatcher();

  minorPALForm = new FormGroup({
    lowPAL: new FormControl('', percentageValidators),
    moderatePAL: new FormControl('', percentageValidators),
    intensePAL: new FormControl('', percentageValidators),
  }, { validators: groupSuman100Validator(3) });

  sendData(): MinorPAL {
    const lowPAL: number = NumberForForms(this.minorPALForm.get('lowPAL')?.value);
    const moderatePAL: number = NumberForForms(this.minorPALForm.get('moderatePAL')?.value);
    const intensePAL: number = NumberForForms(this.minorPALForm.get('intensePAL')?.value);

    const minorPALData: MinorPAL = {
      lowPALPrevalence: lowPAL,
      moderatePALPrevalence: moderatePAL,
      intensePALPrevalence: intensePAL,
    };

    return minorPALData;
  }

  loadDefaultData() {
    this.minorPALForm.get('lowPAL')?.setValue(this.defaultMinorPal.lowPALPrevalence)
    this.minorPALForm.get('moderatePAL')?.setValue(this.defaultMinorPal.moderatePALPrevalence)
    this.minorPALForm.get('intensePAL')?.setValue(this.defaultMinorPal.intensePALPrevalence)
  }
}
