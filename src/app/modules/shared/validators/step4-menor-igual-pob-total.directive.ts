import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NumberForForms } from './numbers-validation';

/*
  En el paso 4, la poblacion especifica de mujeres no puede ser mayor que la poblacion total.
*/
export function step4MenorIgualPobTotalValidator(franja: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let pobEspecifica: AbstractControl | null = null;
    let pobTotal: AbstractControl | null = null;
    switch (franja) {
      case 1:
        pobEspecifica = control.get('cantPrimerFranja');
        pobTotal = control.get('pobTotPrimerFranja');
        break;
      case 2:
        pobEspecifica = control.get('cantSegundaFranja');
        pobTotal = control.get('pobTotSegundaFranja');
        break;
      default:
        break;
    }

    return pobEspecifica && pobTotal
      && NumberForForms(pobEspecifica.value) > NumberForForms(pobTotal.value)
      ? { step4MenorIgualPobTotal: true } : null;
  };
}
