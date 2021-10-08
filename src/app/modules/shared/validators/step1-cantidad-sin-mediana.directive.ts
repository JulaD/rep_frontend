import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/*
  En el paso 1, no se permite que los tener datos en un campo cantidad pero sin
  datos en el campo mediana
*/
export const step1CantidadSinMedianaValidator: ValidatorFn =
  (control: AbstractControl): ValidationErrors | null => {
  const cantFemenino = control.get('cantFemenino');
  const cantMasculino = control.get('cantMasculino');
  const medianaFemenino = control.get('medianaFemenino');
  const medianaMasculino = control.get('medianaMasculino');

  return ((cantFemenino && medianaFemenino &&
    cantFemenino.value != '' && medianaFemenino.value === '') ||
    (cantMasculino && medianaMasculino &&
    cantMasculino.value != '' && medianaMasculino.value === ''))
    ? { step1CantidadSinMediana: true } : null;
};