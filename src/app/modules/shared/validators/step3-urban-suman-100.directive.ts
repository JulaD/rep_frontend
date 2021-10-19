import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NumberForForms } from './numbers-validation';

/*
  En el paso 3, si la poblacion urbana no es nula o se ingreso algun valor de PAL,
  entonces los valores de PAL deben sumar 100.
*/
export const step3UrbanSuman100Validator: ValidatorFn = (control: AbstractControl):
ValidationErrors | null => {
  const urbanPercentage = control.get('population.urbanPercentage');
  const activeUrbanPAL = control.get('urbanPAL.activeUrbanPAL');
  const lowUrbanPAL = control.get('urbanPAL.lowUrbanPAL');

  return urbanPercentage && activeUrbanPAL && lowUrbanPAL
    && (NumberForForms(urbanPercentage.value) !== 0 || activeUrbanPAL.value !== '' || lowUrbanPAL.value !== '')
    && (NumberForForms(activeUrbanPAL.value) + NumberForForms(lowUrbanPAL.value) !== 100)
    ? { step3UrbanSuman100: true } : null;
};
