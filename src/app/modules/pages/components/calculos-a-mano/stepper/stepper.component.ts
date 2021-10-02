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
})
export class StepperComponent implements OnInit {
  isLinear = false;

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
    const step1Data: AgeGroupJSON[] = this.step1Access.sendData();

    // Inicializo con datos hardcodeados hasta que se implementen los datos por defecto
    let step2Data: MinorPAL = {lowPALPrevalence: 0, moderatePALPrevalence: 0, intensePALPrevalence: 0}
    let step3Data: AdultPAL = {urbanPercentage: 100, activeUrbanPAL: 0, lowUrbanPAL: 100,
      ruralPercentage: 0, activeRuralPAL: 100, lowRuralPAL: 0}
    let step4Data: Maternity = {maternity18to29: {pregnantWomen: 0, lactatingWomen: 0},
      maternity30to59: {pregnantWomen: 0, lactatingWomen: 0}}

    if (this.step1Access.stepperLogic.agesMinorPresent) {
      step2Data = this.step2Access.sendData();
    }
    if (this.step1Access.stepperLogic.agesAdultPresent) {
      step3Data = this.step3Access.sendData();
    }
    if (this.step1Access.stepperLogic.agesFemale18To29Present ||
      this.step1Access.stepperLogic.agesFemale30To59Present) {
      step4Data = this.step4Access.sendData();
    }
    
    const extraData: ExtraData = {minorPAL: step2Data,
      adultPAL: step3Data,
      maternity18To29: step4Data.maternity18to29,
      maternity30To59: step4Data.maternity30to59 }
      
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
}
