import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/*
  En el paso 1, no se permite que los campos de cantidad y mediana sean vacios
*/
export const step1TodoVacioValidator: ValidatorFn = (control: AbstractControl):
ValidationErrors | null => {
  const cantFemenino = control.get('cantFemenino');
  const cantMasculino = control.get('cantMasculino');
  const medianaFemenino = control.get('medianaFemenino');
  const medianaMasculino = control.get('medianaMasculino');

  return cantFemenino && cantMasculino && medianaFemenino && medianaMasculino
    && cantFemenino.value === '' && cantMasculino.value === ''
    && medianaFemenino.value === '' && medianaMasculino.value === ''
    ? { step1TodoVacio: true } : null;
};
