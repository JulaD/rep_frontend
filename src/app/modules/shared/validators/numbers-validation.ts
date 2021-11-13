import { ValidatorFn, Validators } from '@angular/forms';

/*
 Acepta un numero entero >= 0 con un + opcional
 */
export const numeroEnteroPositivoValidator: ValidatorFn = Validators.pattern(/^\+?[0-9]+$/);

/*
 Acepta un numero entero > 0 con un + opcional
 */
export const numeroEnteroMayorCeroValidator: ValidatorFn = Validators.pattern(/^\+?0*[1-9][0-9]*$/);

/*
 El regex es un real positivo con parte decimal opcional
 Acepta
*/
export const numeroFloatValidator: ValidatorFn = Validators.pattern(/^\+?\d+((\.|,)\d+)?$/);

/*
 El regex es ^(un entero > 0)|(un decimal >= 1)|(un decimal > 0 y < 1)$
 Acepta punto o coma como separador decimal
 Acepta signo de mas al inicio
 */
export const numeroFloatMayorCeroValidator: ValidatorFn = Validators.pattern(/^\+?((0*[1-9][0-9]*)|(0*[1-9][0-9]*(\.|,)[0-9]+)|(0+(\.|,)0*[1-9][0-9]*))$/);

export function NumberForForms(num: any): number {
  return Number(String(num).replace(',', '.'));
}
