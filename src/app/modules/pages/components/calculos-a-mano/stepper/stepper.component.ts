import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import AdultPAL from 'src/app/interfaces/AdultPALDTO';
import ExtraData from 'src/app/interfaces/ExtraDataDTO';
import Maternity from 'src/app/interfaces/MaternityDTO';
import MinorPAL from 'src/app/interfaces/MinorPALDTO';
import { AgeGroupJSON, RestService } from 'src/app/services/rest/rest.service';
import { ResultsService } from 'src/app/services/results.service';
import { CalculosPaso1Component } from '../calculos-paso1/calculos-paso1.component';
import { CalculosPaso2Component } from '../calculos-paso2/calculos-paso2.component';
import { CalculosPaso3Component } from '../calculos-paso3/calculos-paso3.component';
import { CalculosPaso4Component } from '../calculos-paso4/calculos-paso4.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class StepperComponent implements OnInit {
  isLinear: boolean = false;

  @ViewChild(CalculosPaso1Component)
  private step1Access: CalculosPaso1Component

  @ViewChild(CalculosPaso2Component)
  private step2Access: CalculosPaso2Component

  @ViewChild(CalculosPaso3Component)
  private step3Access: CalculosPaso3Component

  @ViewChild(CalculosPaso4Component)
  private step4Access: CalculosPaso4Component

  ngOnInit() { }

  constructor(
    public rest: RestService,
    private resultsService: ResultsService,
    private router: Router
  ) {}

  onSubmit(): void {
    let extraData: ExtraData = {
      minorPAL: undefined,
      adultPAL: undefined,
      maternity18To29: undefined,
      maternity30To59: undefined
    }

    const step1Data: AgeGroupJSON[] = this.step1Access.sendData();

    if (this.step1Access.stepperLogic.agesMinorPresent) {
      extraData.minorPAL = this.step2Access.sendData();
    }
    if (this.step1Access.stepperLogic.agesAdultPresent) {
      extraData.adultPAL = this.step3Access.sendData();
    }
    if (this.step1Access.stepperLogic.agesFemale18To29Present ||
      this.step1Access.stepperLogic.agesFemale30To59Present) {
      const step4Data = this.step4Access.sendData();
      if (this.step1Access.stepperLogic.agesFemale18To29Present) {
        extraData.maternity18To29 = step4Data.maternity18to29;
      }
      if (this.step1Access.stepperLogic.agesFemale30To59Present) {
        extraData.maternity30To59 = step4Data.maternity30to59;
      }
    }
      
    this.rest.addCalculation(step1Data, extraData)
      .subscribe((result) => {
        this.resultsService
          .setData(result);
        this.router
          .navigate(['/result']);
    }, (err) => {
      console.log(err);
    });
    // luego de obtener el resultado, vacio las tablas
    this.step1Access.clearTables();
  }

  isStepperValid(): boolean {
    const step1Valid: boolean = this.step1Access.stepValid;
    let step2Valid: boolean = true;
    let step3Valid: boolean = true;
    let step4Valid: boolean = true;
    if (this.step1Access.stepperLogic.agesMinorPresent) {
      step2Valid = this.step2Access?.minorPALForm.valid;
    }
    if (this.step1Access.stepperLogic.agesAdultPresent) {
      step3Valid = this.step3Access?.adultPALForm.valid;
    }
    if (this.step1Access.stepperLogic.agesFemale18To29Present ||
      this.step1Access.stepperLogic.agesFemale30To59Present) {
      step4Valid = this.step4Access?.materYLactanciaForm.valid
    }
    return step1Valid && step2Valid && step3Valid && step4Valid;
  }
}
