import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NumberForForms } from './numbers-validation';

/*
  En el paso 4, la suma de las mujeres embarazadas y amamantando no puede ser mayor
  que las ingresadas en el paso 1 para las franjas etarias 18-29 y 30-59 años.
*/
export function step4MenorIgualPobStep1Validator(franja: number, pobStep1: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let embarazos: AbstractControl | null = null;
    let amamantando: AbstractControl | null = null;
    switch (franja) {
      case 1:
        embarazos = control.get('embsPrimerFranja');
        amamantando = control.get('amamPrimerFranja');
        break;
      case 2:
        embarazos = control.get('embsSegundaFranja');
        amamantando = control.get('amamSegundaFranja');
        break;
      default:
        break;
    }

    return embarazos && amamantando
      && NumberForForms(embarazos.value) + NumberForForms(amamantando.value) > pobStep1
      ? { step4MenorIgualPobStep1: true } : null;
  };
}
