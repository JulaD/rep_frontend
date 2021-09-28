import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

const numeroEnteroRe: RegExp = new RegExp('^[0-9]+$')
// El regex es ^(un entero > 0)|(un decimal >= 1)|(un decimal > 0 y < 1)$
const numeroFloatRe: RegExp =
new RegExp('^(0*[1-9][0-9]*)|(0*[1-9][0-9]+.[0-9]+)|(0+.0*[1-9][0-9]*)$')

@Component({
  selector: 'app-calculos-paso4',
  templateUrl: './calculos-paso4.component.html',
  styleUrls: ['./calculos-paso4.component.css'],
})
export class CalculosPaso4Component {

  materYLactanciaForm = new FormGroup({
    //Primer franja
    cantPrimerFranja:   new FormControl('', Validators.pattern(numeroEnteroRe)),
    embsPrimerFranja:   new FormControl({value: '', disabled: false}, Validators.pattern(numeroEnteroRe)),
    amamPrimerFranja:   new FormControl({value: '', disabled: false}, Validators.pattern(numeroEnteroRe)),
    medPrimerFranja:    new FormControl({value: '', disabled: false}, Validators.pattern(numeroFloatRe)),
    pobTotPrimerFranja: new FormControl({value: '', disabled: true}, Validators.pattern(numeroEnteroRe)),
    natPrimerFranja:    new FormControl({value: '', disabled: true}, Validators.pattern(numeroFloatRe)),
    //Checkbox
    primerFranjaDisabled: new FormControl(false),
  })
  
  onSubmit() {}
  
  enableFields(event: MatCheckboxChange) {
    if (event.checked) {
      this.materYLactanciaForm.get('pobTotPrimerFranja')?.enable();   
      this.materYLactanciaForm.get('natPrimerFranja')?.enable();
      this.materYLactanciaForm.get('embsPrimerFranja')?.disable(); 
      this.materYLactanciaForm.get('amamPrimerFranja')?.disable();   
      this.materYLactanciaForm.get('medPrimerFranja')?.disable();     
    } else {
      this.materYLactanciaForm.get('pobTotPrimerFranja')?.disable();   
      this.materYLactanciaForm.get('natPrimerFranja')?.disable();
      this.materYLactanciaForm.get('embsPrimerFranja')?.enable(); 
      this.materYLactanciaForm.get('amamPrimerFranja')?.enable();   
      this.materYLactanciaForm.get('medPrimerFranja')?.enable();  
    }
  }

}
