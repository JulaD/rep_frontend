import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { NumberForForms } from "./numbers-validation";

/*
  En el paso 3, si la poblacion rural no es nula o se ingreso algun valor de PAL,
  entonces los valores de PAL deben sumar 100.
*/
export const step3RuralSuman100Validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const ruralPercentage = control.get('population.ruralPercentage');
  const activeRuralPAL = control.get('ruralPAL.activeRuralPAL');
  const lowRuralPAL = control.get('ruralPAL.lowRuralPAL');

  return ruralPercentage && activeRuralPAL && lowRuralPAL &&
    (NumberForForms(ruralPercentage.value) !== 0 || activeRuralPAL.value != '' || lowRuralPAL.value != '') &&
    (NumberForForms(activeRuralPAL.value) + NumberForForms(lowRuralPAL.value) !== 100)
    ? { step3RuralSuman100: true } : null;
};