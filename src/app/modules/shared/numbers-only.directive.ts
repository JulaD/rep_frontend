import { Directive, Input } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn } from "@angular/forms";

@Directive({
  selector: '[appNumbersOnly]',
  providers: [{provide: NG_VALIDATORS, useExisting: NumbersOnlyValidatorDirective, multi: true}]
})
export class NumbersOnlyValidatorDirective implements Validator {
  @Input('appNumbersOnly') numbersOnly = 'bob';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.numbersOnly ? numbersOnlyValidator(new RegExp(this.numbersOnly))(control) : null;
  }
}

/** Cantidad y Mediana solo pueden ser numeros */
export function numbersOnlyValidator(numRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = numRe.test(control.value);
    return forbidden ? {numbersOnly: {value: control.value}} : null;
  };
}