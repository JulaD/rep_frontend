import {
  ChangeDetectorRef,
  Component, Input, OnInit, SimpleChanges,
} from '@angular/core';
import {
  FormControl, FormGroup, ValidatorFn, Validators,
} from '@angular/forms';
import AdultPAL from 'src/app/interfaces/AdultPALDTO';
import { ShowOnDirtyOrTouchedErrorStateMatcher } from 'src/app/modules/shared/dirty-or-touched-error-state-matcher';
import { groupSuman100Validator } from 'src/app/modules/shared/validators/group-suman-100.directive';
import { NumberForForms, numeroFloatValidator } from 'src/app/modules/shared/validators/numbers-validation';
import { step3RuralSuman100Validator } from 'src/app/modules/shared/validators/step3-rural-suman-100.directive';
import { step3UrbanSuman100Validator } from 'src/app/modules/shared/validators/step3-urban-suman-100.directive';

const percentageValidators: ValidatorFn[] = [
  numeroFloatValidator,
  Validators.min(0),
  Validators.max(100),
];

@Component({
  selector: 'app-calculos-paso3',
  templateUrl: './calculos-paso3.component.html',
  styleUrls: ['./calculos-paso3.component.css'],
})
export class CalculosPaso3Component implements OnInit {
  @Input() defaultAdultPal: AdultPAL;

  @Input() loadedAdultPal: AdultPAL;

  @Input() defaultExtraDataAvailable: boolean;

  ngOnInit() {
  }

  constructor(private cdRef:ChangeDetectorRef) {}

  matcher = new ShowOnDirtyOrTouchedErrorStateMatcher();

  adultPALForm = new FormGroup({
    population: new FormGroup({
      ruralPercentage: new FormControl('', percentageValidators),
      urbanPercentage: new FormControl('', percentageValidators),
    }, { validators: groupSuman100Validator(2) }),
    ruralPAL: new FormGroup({
      activeRuralPAL: new FormControl('', percentageValidators),
      lowRuralPAL: new FormControl('', percentageValidators),
    }),
    urbanPAL: new FormGroup({
      activeUrbanPAL: new FormControl('', percentageValidators),
      lowUrbanPAL: new FormControl('', percentageValidators),
    }),
  }, {
    validators: Validators.compose(
      [step3RuralSuman100Validator, step3UrbanSuman100Validator],
    ),
  });

  ngOnChanges(changes: SimpleChanges) {
    // delay(0) helps avoid an error
    setTimeout(() => {
      if (changes.loadedAdultPal.currentValue !== undefined) {
        console.log('Cargue nivel actividad fisica adultos');
        this.adultPALForm.get('population.ruralPercentage')?.setValue(changes.loadedAdultPal.currentValue.ruralPercentage);
        this.adultPALForm.get('population.urbanPercentage')?.setValue(changes.loadedAdultPal.currentValue.urbanPercentage);
        this.adultPALForm.get('ruralPAL.activeRuralPAL')?.setValue(changes.loadedAdultPal.currentValue.activeRuralPAL);
        this.adultPALForm.get('ruralPAL.lowRuralPAL')?.setValue(changes.loadedAdultPal.currentValue.lowRuralPAL);
        this.adultPALForm.get('urbanPAL.activeUrbanPAL')?.setValue(changes.loadedAdultPal.currentValue.activeUrbanPAL);
        this.adultPALForm.get('urbanPAL.lowUrbanPAL')?.setValue(changes.loadedAdultPal.currentValue.lowUrbanPAL);
      }
    });
  }

  sendData(): AdultPAL {
    const ruralPercentage: number = NumberForForms(this.adultPALForm.get('population.ruralPercentage')?.value);
    const urbanPercentage: number = NumberForForms(this.adultPALForm.get('population.urbanPercentage')?.value);

    let activeRuralPAL: number = 100;
    let lowRuralPAL: number = 0;
    if (ruralPercentage !== 0) {
      activeRuralPAL = NumberForForms(this.adultPALForm.get('ruralPAL.activeRuralPAL')?.value);
      lowRuralPAL = NumberForForms(this.adultPALForm.get('ruralPAL.lowRuralPAL')?.value);
    }

    let activeUrbanPAL: number = 0;
    let lowUrbanPAL: number = 100;
    if (urbanPercentage !== 0) {
      activeUrbanPAL = NumberForForms(this.adultPALForm.get('urbanPAL.activeUrbanPAL')?.value);
      lowUrbanPAL = NumberForForms(this.adultPALForm.get('urbanPAL.lowUrbanPAL')?.value);
    }

    const adultPALData: AdultPAL = {
      urbanPercentage,
      activeUrbanPAL,
      lowUrbanPAL,
      ruralPercentage,
      activeRuralPAL,
      lowRuralPAL,
    };

    return adultPALData;
  }

  loadDefaultValues() {
    if (this.defaultExtraDataAvailable) {
      this.adultPALForm.get('population.ruralPercentage')?.setValue(this.defaultAdultPal.ruralPercentage);
      this.adultPALForm.get('population.urbanPercentage')?.setValue(this.defaultAdultPal.urbanPercentage);
      this.adultPALForm.get('ruralPAL.activeRuralPAL')?.setValue(this.defaultAdultPal.activeRuralPAL);
      this.adultPALForm.get('ruralPAL.lowRuralPAL')?.setValue(this.defaultAdultPal.lowRuralPAL);
      this.adultPALForm.get('urbanPAL.activeUrbanPAL')?.setValue(this.defaultAdultPal.activeUrbanPAL);
      this.adultPALForm.get('urbanPAL.lowUrbanPAL')?.setValue(this.defaultAdultPal.lowUrbanPAL);
    }
  }
}
