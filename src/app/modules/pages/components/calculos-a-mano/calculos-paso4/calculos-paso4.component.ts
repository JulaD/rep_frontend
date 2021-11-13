import {
  Component, Input, OnChanges, OnInit, SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { delay } from 'rxjs/operators';
import IndividualMaternity from 'src/app/interfaces/IndividualMaternityDTO';
import Maternity from 'src/app/interfaces/MaternityDTO';
import PopulationMaternity from 'src/app/interfaces/PopulationMaternityDTO';
import { ShowOnDirtyOrTouchedErrorStateMatcher } from 'src/app/modules/shared/dirty-or-touched-error-state-matcher';
import {
  NumberForForms, numeroEnteroMayorCeroValidator,
  numeroEnteroPositivoValidator, numeroFloatValidator,
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

  @Input() defaultExtraDataAvailable: boolean;

  @Input() female18To29Pop: number;

  @Input() female30To59Pop: number;

  @Input() agesFemale18To29Present: boolean;

  @Input() agesFemale30To59Present: boolean;

  ngOnInit() {}

  matcher = new ShowOnDirtyOrTouchedErrorStateMatcher();

  materYLactanciaForm = new FormGroup({
    // Primer franja
    maternityIndivPrimerFranja: new FormGroup({
      embsPrimerFranja: new FormControl({ value: '', disabled: false }, numeroEnteroPositivoValidator),
      amamPrimerFranja: new FormControl({ value: '', disabled: false }, numeroEnteroPositivoValidator),
    }),
    maternityPrimerFranja: new FormGroup({
      cantPrimerFranja: new FormControl(
        { value: '', disabled: true }, [numeroEnteroMayorCeroValidator, Validators.required],
      ),
      pobTotPrimerFranja: new FormControl(
        { value: '', disabled: true }, [numeroEnteroMayorCeroValidator, Validators.required],
      ),
      natPrimerFranja: new FormControl({ value: '', disabled: true }, numeroFloatValidator),
    }, { validators: step4MenorIgualPobTotalValidator(1) }),
    // Segunda franja
    maternityIndivSegundaFranja: new FormGroup({
      embsSegundaFranja: new FormControl({ value: '', disabled: false }, numeroEnteroPositivoValidator),
      amamSegundaFranja: new FormControl({ value: '', disabled: false }, numeroEnteroPositivoValidator),
    }),
    // Checkbox
    maternityIndivDisabled: new FormControl(false),
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
          // Cuando no hay poblacion femenina 18-29, el checkbox no actua sobre los campos
          // de maternityPrimerFranja, por tanto, al agregar o remover se debe revisar el
          // estado del checkbox y activar o desactivar los campos segun corresponda.
          if (this.materYLactanciaForm.get('maternityIndivDisabled')?.value) {
            if (this.female18To29Pop > 0) {
              this.materYLactanciaForm.get('maternityPrimerFranja')?.enable();
            } else {
              this.materYLactanciaForm.get('maternityPrimerFranja')?.disable();
            }
          }
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
            this.materYLactanciaForm.get('maternityIndivDisabled')?.setValue(false);
            event.checked = false;
            this.enableFields(event);
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
            this.materYLactanciaForm.get('maternityIndivDisabled')?.setValue(true);
            event.checked = true;
            this.enableFields(event);
          }
          break;
        case 'loadedIndivMaternity30to59':
          if (changes[key].currentValue !== undefined
              && changes[key].currentValue !== changes[key].previousValue) {
            this.materYLactanciaForm.get('maternityIndivSegundaFranja.embsSegundaFranja')?.setValue(changes.loadedIndivMaternity30to59.currentValue.pregnantWomen);
            this.materYLactanciaForm.get('maternityIndivSegundaFranja.embsSegundaFranja')?.markAsDirty();
            this.materYLactanciaForm.get('maternityIndivSegundaFranja.amamSegundaFranja')?.setValue(changes.loadedIndivMaternity30to59.currentValue.lactatingWomen);
            this.materYLactanciaForm.get('maternityIndivSegundaFranja.amamSegundaFranja')?.markAsDirty();
            this.materYLactanciaForm.get('maternityIndivDisabled')?.setValue(false);
            event.checked = false;
            this.enableFields(event);
          }
          break;
        default: break;
      }
    });
  }

  onSubmit() {}

  enableFields(event: MatCheckboxChange) {
    if (event.checked) {
      // Solo se afectan los campos de maternityPrimerFranja si hay poblacion femenina 18-29
      if (this.agesFemale18To29Present) {
        this.materYLactanciaForm.get('maternityPrimerFranja')?.enable();
      }
      this.materYLactanciaForm.get('maternityIndivPrimerFranja')?.disable();
      // campos de franja 30-59
      this.materYLactanciaForm.get('maternityIndivSegundaFranja')?.disable();
    } else {
      // Solo se afectan los campos de maternityPrimerFranja si hay poblacion femenina 18-29
      if (this.agesFemale18To29Present) {
        this.materYLactanciaForm.get('maternityPrimerFranja')?.disable();
      }
      this.materYLactanciaForm.get('maternityIndivPrimerFranja')?.enable();
      // campos de franja 30-59
      this.materYLactanciaForm.get('maternityIndivSegundaFranja')?.enable();
    }
  }

  sendData(): Maternity {
    let maternity18to29 : IndividualMaternity | PopulationMaternity;
    let maternity30to59 : IndividualMaternity | undefined;

    if (!this.materYLactanciaForm.get('maternityIndivDisabled')?.value) {
      maternity18to29 = {
        pregnantWomen: NumberForForms(this.materYLactanciaForm.get('maternityIndivPrimerFranja.embsPrimerFranja')?.value),
        lactatingWomen: NumberForForms(this.materYLactanciaForm.get('maternityIndivPrimerFranja.amamPrimerFranja')?.value),
      };
      maternity30to59 = {
        pregnantWomen: NumberForForms(this.materYLactanciaForm.get('maternityIndivSegundaFranja.embsSegundaFranja')?.value),
        lactatingWomen: NumberForForms(this.materYLactanciaForm.get('maternityIndivSegundaFranja.amamSegundaFranja')?.value),
      };
    } else {
      maternity18to29 = {
        countryWomenInAgeGroup: NumberForForms(this.materYLactanciaForm.get('maternityPrimerFranja.cantPrimerFranja')?.value),
        countryBirthRate: NumberForForms(this.materYLactanciaForm.get('maternityPrimerFranja.natPrimerFranja')?.value),
        countryPopulation: NumberForForms(this.materYLactanciaForm.get('maternityPrimerFranja.pobTotPrimerFranja')?.value),
      };
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
