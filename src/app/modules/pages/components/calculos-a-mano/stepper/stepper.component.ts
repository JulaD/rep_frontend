import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import AdultPAL from 'src/app/interfaces/AdultPALDTO';
import ExtraData from 'src/app/interfaces/ExtraDataDTO';
import IndividualMaternity from 'src/app/interfaces/IndividualMaternityDTO';
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
    const step2Data: MinorPAL = this.step2Access.sendData();
    const step3Data: AdultPAL = this.step3Access.sendData();
    // placeholder mientras se implementa el paso 4 (al backend no le gustaba undefined)
    const step4Data: IndividualMaternity = {pregnantWomen: 0, lactatingWomen: 0}

    const extraData: ExtraData = {minorPAL: step2Data,
      adultPAL: step3Data,
      maternity18To29: step4Data,
      maternity30To59: step4Data }
      
    this.rest.addCalculation(step1Data, extraData)
      .subscribe((result) => {
        this.resultsService
          .setData(result);
        this.router
          .navigate(['/result']);
        // this.router
        //   .navigate(['/result'], {​​​​​​​​ 
        //     queryParams: {
        //       result: JSON.stringify(result)
        //     },
        //     skipLocationChange: true
        //   }​​​​​​​​);
    }, (err) => {
      console.log(err);
    });
  }
}
