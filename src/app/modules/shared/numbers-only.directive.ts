import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/** Cantidad y Mediana solo pueden ser numeros */
export function valOnlyNumbers(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // const forbidden = nameRe.test(control.value);
    //return forbidden ? {valOnlyNumbers: {value: control.value}} : null;
    return null;
  };
}