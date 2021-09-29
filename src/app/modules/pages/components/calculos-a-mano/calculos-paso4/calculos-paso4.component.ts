import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import IndividualMaternity from 'src/app/interfaces/IndividualMaternityDTO';
import Maternity from 'src/app/interfaces/MaternityDTO';
import PopulationMaternity from 'src/app/interfaces/PopulationMaternityDTO';
import { numeroEnteroPositivoValidator, numeroFloatMayorCeroValidator } from 'src/app/modules/shared/validators/numbers-validation';

@Component({
  selector: 'app-calculos-paso4',
  templateUrl: './calculos-paso4.component.html',
  styleUrls: ['./calculos-paso4.component.css'],
})
export class CalculosPaso4Component {

  materYLactanciaForm = new FormGroup({
    //Primer franja
    cantPrimerFranja:   new FormControl('', numeroEnteroPositivoValidator),
    embsPrimerFranja:   new FormControl({value: '', disabled: false}, numeroEnteroPositivoValidator),
    amamPrimerFranja:   new FormControl({value: '', disabled: false}, numeroEnteroPositivoValidator),
    medPrimerFranja:    new FormControl({value: '', disabled: false}, numeroFloatMayorCeroValidator),
    pobTotPrimerFranja: new FormControl({value: '', disabled: true}, numeroEnteroPositivoValidator),
    natPrimerFranja:    new FormControl({value: '', disabled: true}, numeroFloatMayorCeroValidator),
    //Segunda franja
    cantSegundaFranja:   new FormControl('', numeroEnteroPositivoValidator),
    embsSegundaFranja:   new FormControl({value: '', disabled: false}, numeroEnteroPositivoValidator),
    amamSegundaFranja:   new FormControl({value: '', disabled: false}, numeroEnteroPositivoValidator),
    medSegundaFranja:    new FormControl({value: '', disabled: false}, numeroFloatMayorCeroValidator),
    pobTotSegundaFranja: new FormControl({value: '', disabled: true}, numeroEnteroPositivoValidator),
    natSegundaFranja:    new FormControl({value: '', disabled: true}, numeroFloatMayorCeroValidator),
    //Checkbox
    primerFranjaDisabled: new FormControl(false),
    segundaFranjaDisabled: new FormControl(false),
  })
  
  onSubmit() {}
  
  enableFields(event: MatCheckboxChange, fields: number) {
    switch (fields) {
      case 1:
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
        break;
      case 2:
        if (event.checked) {
          this.materYLactanciaForm.get('pobTotSegundaFranja')?.enable();   
          this.materYLactanciaForm.get('natSegundaFranja')?.enable();
          this.materYLactanciaForm.get('embsSegundaFranja')?.disable(); 
          this.materYLactanciaForm.get('amamSegundaFranja')?.disable();   
          this.materYLactanciaForm.get('medSegundaFranja')?.disable();     
        } else {
          this.materYLactanciaForm.get('pobTotSegundaFranja')?.disable();   
          this.materYLactanciaForm.get('natSegundaFranja')?.disable();
          this.materYLactanciaForm.get('embsSegundaFranja')?.enable(); 
          this.materYLactanciaForm.get('amamSegundaFranja')?.enable();   
          this.materYLactanciaForm.get('medSegundaFranja')?.enable();  
        }
        break;

    }
   
  }
  sendData(): Maternity {
    let maternity18to29 : IndividualMaternity | PopulationMaternity;
    let maternity30to59 : IndividualMaternity | PopulationMaternity;
    //Primer franja etaria
    if (this.materYLactanciaForm.get('embsPrimerFranja')) {
      maternity18to29 = {
        pregnantWomen: this.materYLactanciaForm.get('embsPrimerFranja')?.value,
        lactatingWomen: this.materYLactanciaForm.get('amamPrimerFranja')?.value
      }
    } else {
      maternity18to29 = {
        countryWomenInAgeGroup: this.materYLactanciaForm.get('cantPrimerFranja')?.value,
        countryBirthRate: this.materYLactanciaForm.get('natPrimerFranja')?.value,
        countryPopulation: this.materYLactanciaForm.get('pobTotPrimerFranja')?.value
      }
    }
    //Segunda franja etaria
    if (this.materYLactanciaForm.get('embsSegundaFranja')) {
      maternity30to59 = {
        pregnantWomen: this.materYLactanciaForm.get('embsSegundaFranja')?.value,
        lactatingWomen: this.materYLactanciaForm.get('amamSegundaFranja')?.value
      }
    } else {
      maternity30to59 = {
        countryWomenInAgeGroup: this.materYLactanciaForm.get('cantSegundaFranja')?.value,
        countryBirthRate: this.materYLactanciaForm.get('natSegundaFranja')?.value,
        countryPopulation: this.materYLactanciaForm.get('pobTotSegundaFranja')?.value
      }
    }
    let maternity: Maternity = {maternity18to29: maternity18to29,
    maternity30to59: maternity30to59};
    return maternity
  }

}
