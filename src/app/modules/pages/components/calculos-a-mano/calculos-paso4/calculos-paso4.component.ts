import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import IndividualMaternity from 'src/app/interfaces/IndividualMaternityDTO';
import Maternity from 'src/app/interfaces/MaternityDTO';
import PopulationMaternity from 'src/app/interfaces/PopulationMaternityDTO';
import { ShowOnDirtyOrTouchedErrorStateMatcher } from 'src/app/modules/shared/dirty-or-touched-error-state-matcher';
import {
  NumberForForms, numeroEnteroPositivoValidator, numeroFloatValidator,
} from 'src/app/modules/shared/validators/numbers-validation';

@Component({
  selector: 'app-calculos-paso4',
  templateUrl: './calculos-paso4.component.html',
  styleUrls: ['./calculos-paso4.component.css'],
})
export class CalculosPaso4Component {
  @Input() agesFemale18To29Present: boolean;

  @Input() agesFemale30To59Present: boolean;

  matcher = new ShowOnDirtyOrTouchedErrorStateMatcher();

  materYLactanciaForm = new FormGroup({
    // Primer franja
    embsPrimerFranja: new FormControl({ value: '', disabled: false }, numeroEnteroPositivoValidator),
    amamPrimerFranja: new FormControl({ value: '', disabled: false }, numeroEnteroPositivoValidator),
    cantPrimerFranja: new FormControl({ value: '', disabled: true }, numeroEnteroPositivoValidator),
    pobTotPrimerFranja: new FormControl({ value: '', disabled: true }, numeroEnteroPositivoValidator),
    natPrimerFranja: new FormControl({ value: '', disabled: true }, numeroFloatValidator),
    // Segunda franja
    embsSegundaFranja: new FormControl({ value: '', disabled: false }, numeroEnteroPositivoValidator),
    amamSegundaFranja: new FormControl({ value: '', disabled: false }, numeroEnteroPositivoValidator),
    cantSegundaFranja: new FormControl({ value: '', disabled: true }, numeroEnteroPositivoValidator),
    pobTotSegundaFranja: new FormControl({ value: '', disabled: true }, numeroEnteroPositivoValidator),
    natSegundaFranja: new FormControl({ value: '', disabled: true }, numeroFloatValidator),
    // Checkbox
    primerFranjaDisabled: new FormControl(false),
    segundaFranjaDisabled: new FormControl(false),
  });

  onSubmit() {}

  enableFields(event: MatCheckboxChange, fields: number) {
    switch (fields) {
      case 1:
        if (event.checked) {
          this.materYLactanciaForm.get('cantPrimerFranja')?.enable();
          this.materYLactanciaForm.get('pobTotPrimerFranja')?.enable();
          this.materYLactanciaForm.get('natPrimerFranja')?.enable();
          this.materYLactanciaForm.get('embsPrimerFranja')?.disable();
          this.materYLactanciaForm.get('amamPrimerFranja')?.disable();
          this.materYLactanciaForm.get('medPrimerFranja')?.disable();
        } else {
          this.materYLactanciaForm.get('cantPrimerFranja')?.disable();
          this.materYLactanciaForm.get('pobTotPrimerFranja')?.disable();
          this.materYLactanciaForm.get('natPrimerFranja')?.disable();
          this.materYLactanciaForm.get('embsPrimerFranja')?.enable();
          this.materYLactanciaForm.get('amamPrimerFranja')?.enable();
          this.materYLactanciaForm.get('medPrimerFranja')?.enable();
        }
        break;
      case 2:
        if (event.checked) {
          this.materYLactanciaForm.get('cantSegundaFranja')?.enable();
          this.materYLactanciaForm.get('pobTotSegundaFranja')?.enable();
          this.materYLactanciaForm.get('natSegundaFranja')?.enable();
          this.materYLactanciaForm.get('embsSegundaFranja')?.disable();
          this.materYLactanciaForm.get('amamSegundaFranja')?.disable();
          this.materYLactanciaForm.get('medSegundaFranja')?.disable();
        } else {
          this.materYLactanciaForm.get('cantSegundaFranja')?.disable();
          this.materYLactanciaForm.get('pobTotSegundaFranja')?.disable();
          this.materYLactanciaForm.get('natSegundaFranja')?.disable();
          this.materYLactanciaForm.get('embsSegundaFranja')?.enable();
          this.materYLactanciaForm.get('amamSegundaFranja')?.enable();
          this.materYLactanciaForm.get('medSegundaFranja')?.enable();
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
        pregnantWomen: NumberForForms(this.materYLactanciaForm.get('embsPrimerFranja')?.value),
        lactatingWomen: NumberForForms(this.materYLactanciaForm.get('amamPrimerFranja')?.value),
      };
    } else {
      maternity18to29 = {
        countryWomenInAgeGroup: NumberForForms(this.materYLactanciaForm.get('cantPrimerFranja')?.value),
        countryBirthRate: NumberForForms(this.materYLactanciaForm.get('natPrimerFranja')?.value),
        countryPopulation: NumberForForms(this.materYLactanciaForm.get('pobTotPrimerFranja')?.value),
      };
    }
    // Segunda franja etaria
    if (!this.materYLactanciaForm.get('segundaFranjaDisabled')?.value) {
      maternity30to59 = {
        pregnantWomen: NumberForForms(this.materYLactanciaForm.get('embsSegundaFranja')?.value),
        lactatingWomen: NumberForForms(this.materYLactanciaForm.get('amamSegundaFranja')?.value),
      };
    } else {
      maternity30to59 = {
        countryWomenInAgeGroup: NumberForForms(this.materYLactanciaForm.get('cantSegundaFranja')?.value),
        countryBirthRate: NumberForForms(this.materYLactanciaForm.get('natSegundaFranja')?.value),
        countryPopulation: NumberForForms(this.materYLactanciaForm.get('pobTotSegundaFranja')?.value),
      };
    }
    const maternity: Maternity = {
      maternity18to29,
      maternity30to59,
    };
    return maternity;
  }
}
