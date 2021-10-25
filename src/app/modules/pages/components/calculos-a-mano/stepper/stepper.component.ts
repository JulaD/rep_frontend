import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {
  Component, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import AdultPAL from 'src/app/interfaces/AdultPALDTO';
import DefaultExtraDataDTO from 'src/app/interfaces/DefaultExtraDataDTO';
import ExtraData from 'src/app/interfaces/ExtraDataDTO';
import MinorPAL from 'src/app/interfaces/MinorPALDTO';
import PopulationMaternity from 'src/app/interfaces/PopulationMaternityDTO';
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
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true },
  }],
})
export class StepperComponent implements OnInit, OnDestroy {
  isLinear: boolean = false;

  defaultExtraData: DefaultExtraDataDTO[];

  defaultExtraDataAvailable: boolean = false;

  defaultMinorPal: MinorPAL = {
    lowPALPrevalence: 0,
    moderatePALPrevalence: 0,
    intensePALPrevalence: 0,
  };

  defaultAdultPal: AdultPAL = {
    urbanPercentage: 0,
    ruralPercentage: 0,
    lowRuralPAL: 0,
    activeRuralPAL: 0,
    lowUrbanPAL: 0,
    activeUrbanPAL: 0,
  };

  defaultMaternity18to29: PopulationMaternity = {
    countryBirthRate: 0,
    countryPopulation: 0,
    countryWomenInAgeGroup: 0,
  };

  defaultMaternity30to59: PopulationMaternity = {
    countryBirthRate: 0,
    countryPopulation: 0,
    countryWomenInAgeGroup: 0,
  };

  @ViewChild(CalculosPaso1Component)
  private step1Access: CalculosPaso1Component;

  @ViewChild(CalculosPaso2Component)
  private step2Access: CalculosPaso2Component;

  @ViewChild(CalculosPaso3Component)
  private step3Access: CalculosPaso3Component;

  @ViewChild(CalculosPaso4Component)
  private step4Access: CalculosPaso4Component;

  ngOnInit() { this.processExtraData(); }

  ngOnDestroy() {
    // al salir del stepper, vacio las tablas
    this.step1Access.clearTables();
  }

  constructor(
    public rest: RestService,
    private resultsService: ResultsService,
    private router: Router,
    private errorSnackBar: MatSnackBar,
  ) {}

  onSubmit(): void {
    const extraData: ExtraData = {
      minorPAL: undefined,
      adultPAL: undefined,
      maternity18To29: undefined,
      maternity30To59: undefined,
    };

    const step1Data: AgeGroupJSON[] = this.step1Access.sendData();

    if (this.step1Access.stepperLogic.agesMinorPresent) {
      extraData.minorPAL = this.step2Access.sendData();
    }
    if (this.step1Access.stepperLogic.agesAdultPresent) {
      extraData.adultPAL = this.step3Access.sendData();
    }
    if (this.step1Access.stepperLogic.agesFemale18To29Present
      || this.step1Access.stepperLogic.agesFemale30To59Present) {
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
  }

  isStepperValid(): boolean {
    const step1Valid: boolean = this.step1Access ? this.step1Access.stepValid : false;
    let step2Valid: boolean = true;
    let step3Valid: boolean = true;
    let step4Valid: boolean = true;
    if (step1Valid) {
      if (this.step1Access.stepperLogic.agesMinorPresent) {
        step2Valid = this.step2Access?.minorPALForm.valid;
      }
      if (this.step1Access.stepperLogic.agesAdultPresent) {
        step3Valid = this.step3Access?.adultPALForm.valid;
      }
      if (this.step1Access.stepperLogic.agesFemale18To29Present
        || this.step1Access.stepperLogic.agesFemale30To59Present) {
        step4Valid = this.step4Access?.materYLactanciaForm.valid;
      }
    }
    return step1Valid && step2Valid && step3Valid && step4Valid;
  }

  processNAFMenores(extraData: DefaultExtraDataDTO) {
    switch (extraData.id) {
      case 'minorLowPrevalence':
        this.defaultMinorPal.lowPALPrevalence = extraData.value;
        break;
      case 'minorModeratePrevalence':
        this.defaultMinorPal.moderatePALPrevalence = extraData.value;
        break;
      case 'minorIntensePrevalence':
        this.defaultMinorPal.intensePALPrevalence = extraData.value;
        break;
      default:
        break;
    }
  }

  processNAFAdultos(extraData: DefaultExtraDataDTO) {
    switch (extraData.id) {
      case 'ruralPopulation':
        this.defaultAdultPal.ruralPercentage = extraData.value;
        break;
      case 'urbanPopulation':
        this.defaultAdultPal.urbanPercentage = extraData.value;
        break;
      case 'ruralActivePALPercentage':
        this.defaultAdultPal.activeRuralPAL = extraData.value;
        break;
      case 'ruralLowPALPercentage':
        this.defaultAdultPal.lowRuralPAL = extraData.value;
        break;
      case 'urbanActivePALPercentage':
        this.defaultAdultPal.activeUrbanPAL = extraData.value;
        break;
      case 'urbanLowPALPercentage':
        this.defaultAdultPal.lowUrbanPAL = extraData.value;
        break;
      default:
        break;
    }
  }

  processMaternity(extraData: DefaultExtraDataDTO) {
    switch (extraData.id) {
      case '18to29FemaleCountryPopulation':
        this.defaultMaternity18to29.countryWomenInAgeGroup = extraData.value;
        break;
      case '30to59FemaleCountryPopulation':
        this.defaultMaternity30to59.countryWomenInAgeGroup = extraData.value;
        break;
      case 'birthRate':
        this.defaultMaternity18to29.countryBirthRate = extraData.value;
        this.defaultMaternity30to59.countryBirthRate = extraData.value;
        break;
      case 'countryPopulation':
        this.defaultMaternity18to29.countryPopulation = extraData.value;
        this.defaultMaternity30to59.countryPopulation = extraData.value;
        break;
      default:
        break;
    }
  }

  processExtraData() {
    this.rest.getDefaultExtraData()
      .subscribe(
        (data) => {
          this.defaultExtraDataAvailable = true;
          this.defaultExtraData = data;
          this.defaultExtraData?.forEach((extraData: DefaultExtraDataDTO) => {
            switch (extraData.parameterType) {
              case 'NAF Menores':
                this.processNAFMenores(extraData);
                break;
              case 'NAF Adultos':
                this.processNAFAdultos(extraData);
                break;
              case 'Embarazo y lactancia':
                this.processMaternity(extraData);
                break;
              default:
                break;
            }
          });
        },
        (error) => {
          console.log(error);
          this.defaultExtraDataAvailable = false;
          const errorMessage = 'Los valores por defecto no estan disponibles';
          const config : MatSnackBarConfig = new MatSnackBarConfig();
          config.verticalPosition = 'top';
          return this.errorSnackBar.open(errorMessage, 'Aceptar', config);
        },
      );
  }
}
