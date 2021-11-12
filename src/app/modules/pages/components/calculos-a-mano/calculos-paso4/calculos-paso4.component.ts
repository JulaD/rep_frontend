import {
  Component, Input, OnChanges, OnInit, SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { delay } from 'rxjs/operators';
import IndividualMaternity from 'src/app/interfaces/IndividualMaternityDTO';
import Maternity from 'src/app/interfaces/MaternityDTO';
import PopulationMaternity from 'src/app/interfaces/PopulationMaternityDTO';
import { ShowOnDirtyOrTouchedErrorStateMatcher } from 'src/app/modules/shared/dirty-or-touched-error-state-matcher';
import {
  NumberForForms, numeroEnteroPositivoValidator, numeroFloatValidator,
} from 'src/app/modules/shared/validators/numbers-validation';
import { step4MenorIgualPobStep1Validator } from 'src/app/modules/shared/validators/step4-menor-igual-pob-step1.directive';
import { step4MenorIgualPobTotalValidator } from 'src/app/modules/shared/validators/step4-menor-igual-pob-total.directive';

@Component({
  selector: 'app-calculos-paso4',
  templateUrl: './calculos-paso4.component.html',
  styleUrls: ['./calculos-paso4.component.css'],
})
export class CalculosPaso4Component implements OnInit, OnChanges {
  @Input() defaultMaternity18to29: PopulationMaternity;

  @Input() loadedPopMaternity18to29: PopulationMaternity;

  @Input() loadedIndivMaternity18to29: IndividualMaternity;

  @Input() loadedIndivMaternity30to59: IndividualMaternity;

  @Input() checkedButton: boolean;

  @Input() defaultExtraDataAvailable: boolean;

  @Input() female18To29Pop: number;

  @Input() female30To59Pop: number;

  @Input() agesFemale18To29Present: boolean;

  @Input() agesFemale30To59Present: boolean;

  ngOnInit() {
  }

  matcher = new ShowOnDirtyOrTouchedErrorStateMatcher();

  materYLactanciaForm = new FormGroup({
    // Primer franja
    maternityIndivPrimerFranja: new FormGroup({
      embsPrimerFranja: new FormControl({ value: '', disabled: false }, numeroEnteroPositivoValidator),
      amamPrimerFranja: new FormControl({ value: '', disabled: false }, numeroEnteroPositivoValidator),
    }),
    maternityPrimerFranja: new FormGroup({
      cantPrimerFranja: new FormControl({ value: '', disabled: true }, numeroEnteroPositivoValidator),
      pobTotPrimerFranja: new FormControl({ value: '', disabled: true }, numeroEnteroPositivoValidator),
      natPrimerFranja: new FormControl({ value: '', disabled: true }, numeroFloatValidator),
    }, { validators: step4MenorIgualPobTotalValidator(1) }),
    // Segunda franja
    maternityIndivSegundaFranja: new FormGroup({
      embsSegundaFranja: new FormControl({ value: '', disabled: false }, numeroEnteroPositivoValidator),
      amamSegundaFranja: new FormControl({ value: '', disabled: false }, numeroEnteroPositivoValidator),
    }),
    // Checkbox
    primerFranjaDisabled: new FormControl(false),
    segundaFranjaDisabled: new FormControl(false),
  });

  ngOnChanges(changes: SimpleChanges) {
    delay(0);
    const keys: string[] = Object.keys(changes);
    const event: MatCheckboxChange = new MatCheckboxChange();
    keys.forEach((key: string) => {
      switch (key) {
        case 'female18To29Pop':
          this.materYLactanciaForm.get('maternityIndivPrimerFranja')?.setValidators(
            step4MenorIgualPobStep1Validator(1, this.female18To29Pop),
          );
          break;
        case 'female30To59Pop':
          // Revisar que este caso se ejecute
          // console.log('Se cambio el valor de female30to59Pop en el paso 4');
          this.materYLactanciaForm.get('maternityIndivSegundaFranja')?.setValidators(
            step4MenorIgualPobStep1Validator(2, this.female30To59Pop),
          );
          break;
        case 'loadedIndivMaternity18to29':
          if (changes[key].currentValue !== undefined
              && changes[key].currentValue !== changes[key].previousValue) {
            this.materYLactanciaForm.get('maternityIndivPrimerFranja.embsPrimerFranja')?.setValue(changes.loadedIndivMaternity18to29.currentValue.pregnantWomen);
            this.materYLactanciaForm.get('maternityIndivPrimerFranja.embsPrimerFranja')?.markAsDirty();
            this.materYLactanciaForm.get('maternityIndivPrimerFranja.amamPrimerFranja')?.setValue(changes.loadedIndivMaternity18to29.currentValue.lactatingWomen);
            this.materYLactanciaForm.get('maternityIndivPrimerFranja.amamPrimerFranja')?.markAsDirty();
            this.materYLactanciaForm.get('primerFranjaDisabled')?.setValue(false);
            event.checked = false;
            this.enableFields(event, 1);
          }
          break;
        case 'loadedPopMaternity18to29':
          if (changes[key].currentValue !== undefined
              && changes[key].currentValue !== changes[key].previousValue) {
            this.materYLactanciaForm.get('maternityPrimerFranja.cantPrimerFranja')?.setValue(changes.loadedPopMaternity18to29.currentValue.countryWomenInAgeGroup);
            this.materYLactanciaForm.get('maternityPrimerFranja.cantPrimerFranja')?.markAsDirty();
            this.materYLactanciaForm.get('maternityPrimerFranja.pobTotPrimerFranja')?.setValue(changes.loadedPopMaternity18to29.currentValue.countryPopulation);
            this.materYLactanciaForm.get('maternityPrimerFranja.pobTotPrimerFranja')?.markAsDirty();
            this.materYLactanciaForm.get('maternityPrimerFranja.natPrimerFranja')?.setValue(changes.loadedPopMaternity18to29.currentValue.countryBirthRate);
            this.materYLactanciaForm.get('maternityPrimerFranja.natPrimerFranja')?.markAsDirty();
            this.materYLactanciaForm.get('primerFranjaDisabled')?.setValue(true);
            event.checked = true;
            this.enableFields(event, 1);
          }
          break;
        case 'loadedIndivMaternity30to59':
          if (changes[key].currentValue !== undefined
              && changes[key].currentValue !== changes[key].previousValue) {
            this.materYLactanciaForm.get('maternityIndivSegundaFranja.embsSegundaFranja')?.setValue(changes.loadedIndivMaternity30to59.currentValue.pregnantWomen);
            this.materYLactanciaForm.get('maternityIndivSegundaFranja.embsSegundaFranja')?.markAsDirty();
            this.materYLactanciaForm.get('maternityIndivSegundaFranja.amamSegundaFranja')?.setValue(changes.loadedIndivMaternity30to59.currentValue.lactatingWomen);
            this.materYLactanciaForm.get('maternityIndivSegundaFranja.amamSegundaFranja')?.markAsDirty();
            this.materYLactanciaForm.get('segundaFranjaDisabled')?.setValue(false);
            event.checked = false;
            this.enableFields(event, 2);
          }
          break;
        case 'checkedButton':
          if (changes[key].currentValue !== undefined
            && changes.loadedIndivMaternity30to59.currentValue === undefined) {
            this.materYLactanciaForm.get('segundaFranjaDisabled')?.setValue(this.checkedButton);
            event.checked = this.checkedButton;
            this.enableFields(event, 2);
          }
          break;
        default: break;
      }
    });
  }

  onSubmit() {}

  enableFields(event: MatCheckboxChange, fields: number) {
    switch (fields) {
      case 1:
        if (event.checked) {
          this.materYLactanciaForm.get('maternityPrimerFranja.cantPrimerFranja')?.enable();
          this.materYLactanciaForm.get('maternityPrimerFranja.pobTotPrimerFranja')?.enable();
          this.materYLactanciaForm.get('maternityPrimerFranja.natPrimerFranja')?.enable();
          this.materYLactanciaForm.get('maternityIndivPrimerFranja.embsPrimerFranja')?.disable();
          this.materYLactanciaForm.get('maternityIndivPrimerFranja.amamPrimerFranja')?.disable();
        } else {
          this.materYLactanciaForm.get('maternityPrimerFranja.cantPrimerFranja')?.disable();
          this.materYLactanciaForm.get('maternityPrimerFranja.pobTotPrimerFranja')?.disable();
          this.materYLactanciaForm.get('maternityPrimerFranja.natPrimerFranja')?.disable();
          this.materYLactanciaForm.get('maternityIndivPrimerFranja.embsPrimerFranja')?.enable();
          this.materYLactanciaForm.get('maternityIndivPrimerFranja.amamPrimerFranja')?.enable();
        }
        break;
      case 2:
        if (event.checked) {
          this.materYLactanciaForm.get('maternityIndivSegundaFranja.embsSegundaFranja')?.disable();
          this.materYLactanciaForm.get('maternityIndivSegundaFranja.amamSegundaFranja')?.disable();
        } else {
          this.materYLactanciaForm.get('maternityIndivSegundaFranja.embsSegundaFranja')?.enable();
          this.materYLactanciaForm.get('maternityIndivSegundaFranja.amamSegundaFranja')?.enable();
        }
        break;
      default:
        break;
    }
  }

  sendData(): Maternity {
    let maternity18to29 : IndividualMaternity | PopulationMaternity;
    let maternity30to59 : IndividualMaternity | undefined;
    // Primer franja etaria
    if (!this.materYLactanciaForm.get('primerFranjaDisabled')?.value) {
      maternity18to29 = {
        pregnantWomen: NumberForForms(this.materYLactanciaForm.get('maternityIndivPrimerFranja.embsPrimerFranja')?.value),
        lactatingWomen: NumberForForms(this.materYLactanciaForm.get('maternityIndivPrimerFranja.amamPrimerFranja')?.value),
      };
    } else {
      maternity18to29 = {
        countryWomenInAgeGroup: NumberForForms(this.materYLactanciaForm.get('maternityPrimerFranja.cantPrimerFranja')?.value),
        countryBirthRate: NumberForForms(this.materYLactanciaForm.get('maternityPrimerFranja.natPrimerFranja')?.value),
        countryPopulation: NumberForForms(this.materYLactanciaForm.get('maternityPrimerFranja.pobTotPrimerFranja')?.value),
      };
    }
    // Segunda franja etaria
    if (!this.materYLactanciaForm.get('segundaFranjaDisabled')?.value) {
      maternity30to59 = {
        pregnantWomen: NumberForForms(this.materYLactanciaForm.get('maternityIndivSegundaFranja.embsSegundaFranja')?.value),
        lactatingWomen: NumberForForms(this.materYLactanciaForm.get('maternityIndivSegundaFranja.amamSegundaFranja')?.value),
      };
    } else {
      maternity30to59 = undefined;
    }
    const maternity: Maternity = {
      maternity18to29,
      maternity30to59,
    };
    return maternity;
  }

  loadDefaultValues() {
    if (this.defaultExtraDataAvailable) {
      this.materYLactanciaForm.get('maternityPrimerFranja.cantPrimerFranja')?.setValue(this.defaultMaternity18to29.countryWomenInAgeGroup);
      this.materYLactanciaForm.get('maternityPrimerFranja.pobTotPrimerFranja')?.setValue(this.defaultMaternity18to29.countryPopulation);
      this.materYLactanciaForm.get('maternityPrimerFranja.natPrimerFranja')?.setValue(this.defaultMaternity18to29.countryBirthRate);
    }
  }
}
