import {
  Component, Input, OnChanges, OnInit, SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
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

  @Input() defaultMaternity30to59: PopulationMaternity;

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
    maternitySegundaFranja: new FormGroup({
      cantSegundaFranja: new FormControl({ value: '', disabled: true }, numeroEnteroPositivoValidator),
      pobTotSegundaFranja: new FormControl({ value: '', disabled: true }, numeroEnteroPositivoValidator),
      natSegundaFranja: new FormControl({ value: '', disabled: true }, numeroFloatValidator),
    }, { validators: step4MenorIgualPobTotalValidator(2) }),
    // Checkbox
    primerFranjaDisabled: new FormControl(false),
    segundaFranjaDisabled: new FormControl(false),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes.female18To29Pop && changes.female18To29Pop.currentValue) {
      this.materYLactanciaForm.get('maternityIndivPrimerFranja')?.setValidators(
        step4MenorIgualPobStep1Validator(1, this.female18To29Pop),
      );
    } else if (changes.female30To59Pop && changes.female30To59Pop.currentValue) {
      this.materYLactanciaForm.get('maternityIndivSegundaFranja')?.setValidators(
        step4MenorIgualPobStep1Validator(2, this.female30To59Pop),
      );
    }
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
          this.materYLactanciaForm.get('maternitySegundaFranja.cantSegundaFranja')?.enable();
          this.materYLactanciaForm.get('maternitySegundaFranja.pobTotSegundaFranja')?.enable();
          this.materYLactanciaForm.get('maternitySegundaFranja.natSegundaFranja')?.enable();
          this.materYLactanciaForm.get('maternityIndivSegundaFranja.embsSegundaFranja')?.disable();
          this.materYLactanciaForm.get('maternityIndivSegundaFranja.amamSegundaFranja')?.disable();
        } else {
          this.materYLactanciaForm.get('maternitySegundaFranja.cantSegundaFranja')?.disable();
          this.materYLactanciaForm.get('maternitySegundaFranja.pobTotSegundaFranja')?.disable();
          this.materYLactanciaForm.get('maternitySegundaFranja.natSegundaFranja')?.disable();
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
    let maternity30to59 : IndividualMaternity | PopulationMaternity;
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
      maternity30to59 = {
        countryWomenInAgeGroup: NumberForForms(this.materYLactanciaForm.get('maternitySegundaFranja.cantSegundaFranja')?.value),
        countryBirthRate: NumberForForms(this.materYLactanciaForm.get('maternitySegundaFranja.natSegundaFranja')?.value),
        countryPopulation: NumberForForms(this.materYLactanciaForm.get('maternitySegundaFranja.pobTotSegundaFranja')?.value),
      };
    }
    const maternity: Maternity = {
      maternity18to29,
      maternity30to59,
    };
    return maternity;
  }

  loadDefaultValues(rango: number) {
    if (this.defaultExtraDataAvailable) {
      if (rango === 1) {
        this.materYLactanciaForm.get('maternityPrimerFranja.cantPrimerFranja')?.setValue(this.defaultMaternity18to29.countryWomenInAgeGroup);
        this.materYLactanciaForm.get('maternityPrimerFranja.pobTotPrimerFranja')?.setValue(this.defaultMaternity18to29.countryPopulation);
        this.materYLactanciaForm.get('maternityPrimerFranja.natPrimerFranja')?.setValue(this.defaultMaternity18to29.countryBirthRate);
      } else {
        this.materYLactanciaForm.get('maternitySegundaFranja.cantSegundaFranja')?.setValue(this.defaultMaternity30to59.countryWomenInAgeGroup);
        this.materYLactanciaForm.get('maternitySegundaFranja.pobTotSegundaFranja')?.setValue(this.defaultMaternity30to59.countryPopulation);
        this.materYLactanciaForm.get('maternitySegundaFranja.natSegundaFranja')?.setValue(this.defaultMaternity30to59.countryBirthRate);
      }
    }
  }
}
