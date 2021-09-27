import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/*
  En el paso 2, los campos de actividad fisica liviana, moderada e intensa deben sumar 100.
  Se considera que un atributo vacio tiene valor cero, Number('') es igual a 0.
*/
export const step2Suman100Validator: ValidatorFn =
  (control: AbstractControl): ValidationErrors | null => {
  const lowPAL = control.get('lowPAL')?.value;
  const moderatePAL = control.get('moderatePAL')?.value;
  const intensePAL = control.get('intensePAL')?.value;

  return (!Number.isNaN(Number(lowPAL)) &&
    !Number.isNaN(Number(moderatePAL)) &&
    !Number.isNaN(Number(intensePAL)) &&
    (Number(lowPAL) + Number(moderatePAL) + Number(intensePAL)) !== 100)
    ? { step2Suman100Validator: true } : null;
};
