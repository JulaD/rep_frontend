import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NumberForForms } from './numbers-validation';

/*
  En el paso 1, no se permite que ambas cantidades sean cero, dado que esto no agrega ningun valor
  Avisa cuando se ingresa cero en ambas cantidades
  Avisa cuando se ingresan ambas medianas pero no cantidades
*/
export const step1CantidadesEnCeroValidator: ValidatorFn = (control: AbstractControl):
ValidationErrors | null => {
  const cantFemenino = control.get('cantFemenino');
  const cantMasculino = control.get('cantMasculino');
  const medianaFemenino = control.get('medianaFemenino');
  const medianaMasculino = control.get('medianaMasculino');

  return cantFemenino && cantMasculino && medianaFemenino && medianaMasculino
    && NumberForForms(cantFemenino.value) === 0
    && NumberForForms(cantMasculino.value) === 0
    && medianaFemenino.value !== '' && medianaMasculino.value !== ''
    ? { step1CantidadesEnCero: true } : null;
};
