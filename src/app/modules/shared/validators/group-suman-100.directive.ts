import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NumberForForms } from './numbers-validation';

/*
 control.value devuelve un objeto {key: value, ...}
 Los FormGroups tienen este esquema:
   {inputKey_1: inputValue_1, ..., inputKey_n: inputValue_n, (otros controles)}
 La funcion toma como entrada la cantidad de inputs que tiene el FormGroup y los recorre.
 Los inputs son porcentajes y deben sumar 100, o dan este error de validacion.
 */
export function groupSuman100Validator(inputsQuantity: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const arrInputs = Object.values(control.value);

    let allNumbers: boolean = true;
    let suma: number = 0;
    let numInput: number = 0;

    for (let i = 0; i < inputsQuantity; i += 1) {
      numInput = NumberForForms(arrInputs[i]);
      allNumbers = !Number.isNaN(numInput);
      if (!allNumbers) {
        break;
      } else {
        suma += numInput;
      }
    }

    return (allNumbers && suma !== 100)
      ? { groupSuman100: true } : null;
  };
}
