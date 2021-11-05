import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {
  Component, Input, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Ajv, { ValidateFunction } from 'ajv';
import FranjaEtaria from 'src/app/enums/FranjaEtaria';
import Sexo from 'src/app/enums/Sexo';
import AdultPAL from 'src/app/interfaces/AdultPALDTO';
import DefaultExtraDataDTO from 'src/app/interfaces/DefaultExtraDataDTO';
import ExtraData from 'src/app/interfaces/ExtraDataDTO';
import IndividualMaternity from 'src/app/interfaces/IndividualMaternityDTO';
import MinorPAL from 'src/app/interfaces/MinorPALDTO';
import PopulationMaternity from 'src/app/interfaces/PopulationMaternityDTO';
import { GrupoEtario } from 'src/app/models/grupo-etario';
import { progressSchema } from 'src/app/schemas/progressSchema';
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

  // Necesario para evitar cargar hijos antes de que termine esta accion
  finishedProcessExtraData: boolean = false;

  loadedMinorPal: MinorPAL;

  defaultMinorPal: MinorPAL = {
    lowPALPrevalence: 0,
    moderatePALPrevalence: 0,
    intensePALPrevalence: 0,
  };

  loadedAdultPal: AdultPAL;

  defaultAdultPal: AdultPAL = {
    urbanPercentage: 0,
    ruralPercentage: 0,
    lowRuralPAL: 0,
    activeRuralPAL: 0,
    lowUrbanPAL: 0,
    activeUrbanPAL: 0,
  };

  loadedIndivMaternity18to29: IndividualMaternity;

  loadedPopMaternity18to29: PopulationMaternity;

  defaultMaternity18to29: PopulationMaternity = {
    countryBirthRate: 0,
    countryPopulation: 0,
    countryWomenInAgeGroup: 0,
  };

  loadedIndivMaternity30to59: IndividualMaternity;

  checkedButton: boolean;

  @ViewChild(CalculosPaso1Component)
  private step1Access: CalculosPaso1Component;

  @ViewChild(CalculosPaso2Component)
  private step2Access: CalculosPaso2Component;

  @ViewChild(CalculosPaso3Component)
  private step3Access: CalculosPaso3Component;

  @ViewChild(CalculosPaso4Component)
  private step4Access: CalculosPaso4Component;

  // Carga de progreso

  @Input()
  requiredFileType: string = '.json';

  ajv: Ajv;

  fromTemplate: boolean;

  ngOnInit() {
    this.ajv = new Ajv();
    console.log('Start Load Stepper');
    this.processExtraData();
    console.log('Finished Load Stepper');
  }

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

  prepareData() {
    const extraData: ExtraData = {
      minorPAL: undefined,
      adultPAL: undefined,
      maternity18To29: undefined,
      maternity30To59: undefined,
    };

    const { step1Data, fromTemplate } = this.step1Access.sendData();

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

    return { step1Data, extraData, fromTemplate };
  }

  onSubmit(): void {
    const { step1Data, extraData, fromTemplate } = this.prepareData();

    this.rest.addCalculation(step1Data, extraData, fromTemplate)
      .subscribe((result) => {
        this.resultsService
          .setData(result, step1Data, extraData);
        this.router
          .navigate(['/result']);
      }, (err) => {
        console.log(err);
      });
  }

  saveProgress() {
    const { step1Data, extraData } = this.prepareData();

    const progress = { step1Data, extraData };

    const date = new Date();
    const fileName : string = `ProgresoCalculoREP_${
      date.getDate()}_${
      date.getMonth() + 1}_${
      date.getFullYear()}.json`;

    const csv: string = `data:text/json;charset=utf-8,${JSON.stringify(progress)}`;
    const data = encodeURI(csv);

    const link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', fileName);
    link.click();
  }

  loadExtraData(extraData: ExtraData, women30to59: boolean) {
    if (extraData.minorPAL) {
      this.loadedMinorPal = {
        lowPALPrevalence: extraData.minorPAL.lowPALPrevalence,
        moderatePALPrevalence: extraData.minorPAL.moderatePALPrevalence,
        intensePALPrevalence: extraData.minorPAL.intensePALPrevalence,
      };
    }
    if (extraData.adultPAL) {
      this.loadedAdultPal = {
        ruralPercentage: extraData.adultPAL.ruralPercentage,
        urbanPercentage: extraData.adultPAL.urbanPercentage,
        activeRuralPAL: extraData.adultPAL.activeRuralPAL,
        lowRuralPAL: extraData.adultPAL.lowRuralPAL,
        activeUrbanPAL: extraData.adultPAL.activeUrbanPAL,
        lowUrbanPAL: extraData.adultPAL.lowUrbanPAL,
      };
    }
    if (extraData.maternity18To29) {
      const maternityKeys = Object.keys(extraData.maternity18To29);
      if (maternityKeys.includes('pregnantWomen')) {
        const maternityData: IndividualMaternity = extraData.maternity18To29 as IndividualMaternity;
        this.loadedIndivMaternity18to29 = {
          pregnantWomen: maternityData.pregnantWomen,
          lactatingWomen: maternityData.lactatingWomen,
        };
      } else if (maternityKeys.includes('countryBirthRate')) {
        const maternityData: PopulationMaternity = extraData.maternity18To29 as PopulationMaternity;
        this.loadedPopMaternity18to29 = {
          countryBirthRate: maternityData.countryBirthRate,
          countryPopulation: maternityData.countryPopulation,
          countryWomenInAgeGroup: maternityData.countryWomenInAgeGroup,
        };
      }
    }
    if (extraData.maternity30To59) {
      const maternityData: IndividualMaternity = extraData.maternity30To59 as IndividualMaternity;
      this.loadedIndivMaternity30to59 = {
        pregnantWomen: maternityData.pregnantWomen,
        lactatingWomen: maternityData.lactatingWomen,
      };
    } else if (women30to59) {
      this.checkedButton = true;
    } else {
      this.checkedButton = false;
    }
  }

  loadPopulationData(popData: AgeGroupJSON[]): boolean {
    const grupos: GrupoEtario[] = [];
    let women30to59: boolean = false;
    popData.forEach((group: AgeGroupJSON) => {
      if (Object.values(FranjaEtaria).includes(group.age as FranjaEtaria)
      && Object.values(Sexo).includes(group.sex as Sexo)) {
        if (group.age === FranjaEtaria.Anios_30_59) {
          women30to59 = true;
        }
        const grupo: GrupoEtario = {
          edad: group.age as FranjaEtaria,
          sexo: group.sex as Sexo,
          pesoMediano: group.medianWeight,
          cantidad: group.population,
        };
        grupos.push(grupo);
      } else {
        throw new Error();
      }
    });
    this.step1Access.clearTables();
    this.step1Access.initializeTable(grupos);
    return women30to59;
  }

  async onFileSelected(event: Event) {
    try {
      const element = event.currentTarget as HTMLInputElement;
      const fileList: FileList | null = element.files;
      if (fileList) {
        const ulFile = await fileList[0].text();
        const progress = JSON.parse(ulFile);
        const validateProgress = progress;
        const validator: ValidateFunction<unknown> = this.ajv.compile(progressSchema);
        if (validator(validateProgress)) {
          const women30to59 = this.loadPopulationData(progress.step1Data);
          this.loadExtraData(progress.extraData, women30to59);
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      const errorMessage = 'El archivo subido no tiene el formato correcto';
      const config : MatSnackBarConfig = new MatSnackBarConfig();
      config.verticalPosition = 'top';
      this.errorSnackBar.open(errorMessage, 'Aceptar', config);
    }
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
      case 'birthRate':
        this.defaultMaternity18to29.countryBirthRate = extraData.value;
        break;
      case 'countryPopulation':
        this.defaultMaternity18to29.countryPopulation = extraData.value;
        break;
      default:
        break;
    }
  }

  processExtraData() {
    this.rest.getDefaultExtraData()
      .subscribe(
        (data) => {
          console.log('Loading Stepper');
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
          this.finishedProcessExtraData = true;
        },
        (error) => {
          console.log(error);
          this.defaultExtraDataAvailable = false;
          const errorMessage = 'Los valores por defecto no estan disponibles';
          const config : MatSnackBarConfig = new MatSnackBarConfig();
          config.panelClass = ['error-snack-bar'];
          config.verticalPosition = 'top';
          this.finishedProcessExtraData = true;
          return this.errorSnackBar.open(errorMessage, 'Aceptar', config);
        },
      );
  }
}
