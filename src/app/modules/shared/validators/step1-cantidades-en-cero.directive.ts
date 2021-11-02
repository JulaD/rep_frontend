import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/*
  En el paso 1, no se permite que ambas cantidades sean cero, dado que esto no agrega ningun valor.
  Avisa cuando se ingresa cero en ambas cantidades.
  Avisa cuando se ingresan ambas medianas pero no cantidades.

  Avisa cuando se ingresa cero en la cantidad de una fila y la otra fila esta limpia.
*/
export const step1CantidadesEnCeroValidator: ValidatorFn = (control: AbstractControl):
ValidationErrors | null => {
  const cantFemenino = control.get('cantFemenino');
  const cantMasculino = control.get('cantMasculino');
  const medianaFemenino = control.get('medianaFemenino');
  const medianaMasculino = control.get('medianaMasculino');

  return cantFemenino && cantMasculino && medianaFemenino && medianaMasculino
    && ((
      Number(cantFemenino.value) === 0 && Number(cantMasculino.value) === 0
      && medianaFemenino.value !== '' && medianaMasculino.value !== ''
    ) || (
      (Number(cantFemenino.value) === 0 && medianaFemenino.value !== ''
      && cantMasculino.value === '' && medianaMasculino.value === '')
      || (Number(cantMasculino.value) === 0 && medianaMasculino.value !== ''
      && cantFemenino.value === '' && medianaFemenino.value === '')
    ))
    ? { step1CantidadesEnCero: true } : null;
};
