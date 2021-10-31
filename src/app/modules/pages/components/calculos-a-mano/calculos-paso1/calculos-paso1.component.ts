/* eslint-disable no-underscore-dangle */
// import { Breakpoints } from '@angular/cdk/layout';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import FranjaEtaria, { compareFranjaEtaria } from 'src/app/enums/FranjaEtaria';
import Sexo from 'src/app/enums/Sexo';
import DefaultWeightDTO from 'src/app/interfaces/DefaultWeightDTO';
import { GrupoEtario } from 'src/app/models/grupo-etario';
import { ShowOnDirtyOrTouchedErrorStateMatcher } from 'src/app/modules/shared/dirty-or-touched-error-state-matcher';
import { NumberForForms, numeroEnteroPositivoValidator, numeroFloatMayorCeroValidator } from 'src/app/modules/shared/validators/numbers-validation';

import { step1CantidadSinMedianaValidator } from 'src/app/modules/shared/validators/step1-cantidad-sin-mediana.directive';
import { step1CantidadesEnCeroValidator } from 'src/app/modules/shared/validators/step1-cantidades-en-cero.directive';
import { step1TodoVacioValidator } from 'src/app/modules/shared/validators/step1-todo-vacio.directive';
import { ParsedDataService } from 'src/app/services/parsed-data.service';
import { AgeGroupJSON, RestService } from 'src/app/services/rest/rest.service';

const femeninoData: GrupoEtario[] = [];
const masculinoData: GrupoEtario[] = [];

@Component({
  selector: 'app-calculos-paso1',
  templateUrl: './calculos-paso1.component.html',
  styleUrls: ['./calculos-paso1.component.css'],
})
export class CalculosPaso1Component implements AfterViewInit {
  stepperLogic = {
    agesMinorPresent: false,
    agesAdultPresent: false,
    agesFemale18To29Present: false,
    agesFemale30To59Present: false,
  };

  stepValid: boolean = false;

  female18To29Pop = 0;

  female30To59Pop = 0;

  matcher = new ShowOnDirtyOrTouchedErrorStateMatcher();

  defaultWeights: DefaultWeightDTO[] | undefined;

  defaultWeightsF: Map<FranjaEtaria, number> = new Map<FranjaEtaria, number>();

  defaultWeightsM: Map<FranjaEtaria, number> = new Map<FranjaEtaria, number>();

  defaultWeightsAvailable: boolean = false;

  edades: FranjaEtaria[] = Object.values(FranjaEtaria);

  constructor(
    private errorSnackBar: MatSnackBar,
    private repetidoSnackBar: MatSnackBar,
    private parsedDataService : ParsedDataService,
    public rest: RestService,
  ) {}

  displayedColumns: string[] = ['edad', 'cantidad', 'mediana'];

  dataSourceF = new MatTableDataSource<GrupoEtario>(femeninoData);

  dataSourceM = new MatTableDataSource<GrupoEtario>(masculinoData);

  fromTemplate : boolean = false;

  @ViewChild('TablePaginatorF') paginatorF: MatPaginator;

  @ViewChild('TablePaginatorM') paginatorM: MatPaginator;

  ngOnInit() {
    console.log('Start Load Step1');
    const sheetData : GrupoEtario[] = this.parsedDataService.getData();
    if (sheetData?.length) {
      this.fromTemplate = true;
      this.initializeTable(sheetData);
    }
    this.processDefaultWeights();
    console.log('Finished Load Step1');
  }

  ngAfterViewInit() {
    this.dataSourceF.paginator = this.paginatorF;
    this.dataSourceM.paginator = this.paginatorM;
  }

  grupoEtarioForm = new FormGroup({
    edad: new FormControl('', Validators.required),
    cantFemenino: new FormControl('', numeroEnteroPositivoValidator),
    cantMasculino: new FormControl('', numeroEnteroPositivoValidator),
    medianaFemenino: new FormControl('', numeroFloatMayorCeroValidator),
    medianaMasculino: new FormControl('', numeroFloatMayorCeroValidator),
  }, {
    validators: Validators.compose([
      step1TodoVacioValidator, step1CantidadSinMedianaValidator, step1CantidadesEnCeroValidator,
    ]),
  });

  onSubmit() {
    // Revisar si la la franja etaria ya tiene datos en la tabla
    let repetido: Boolean = false;
    const franja: string = this.grupoEtarioForm.get('edad')?.value;

    repetido = masculinoData.some((group: GrupoEtario) => group.edad === franja);
    if (!repetido) {
      repetido = femeninoData.some((group: GrupoEtario) => group.edad === franja);
    }
    if (repetido) {
      // presento mensaje de error
      this.repetidoSnackBar.open(
        'ERROR: Ya existen datos ingresados para esta franja etaria', 'Aceptar',
      );
    } else {
      // Datos Femenino (ignoro datos con cantidad = 0 o vacio)
      const cantFemenino: number = NumberForForms(this.grupoEtarioForm.get('cantFemenino')?.value);
      if (this.grupoEtarioForm.get('medianaFemenino')?.value !== '' && cantFemenino !== 0) { // hay datos para agregar a Femenino
        const grupoFem : GrupoEtario = new GrupoEtario(
          this.grupoEtarioForm.get('edad')?.value,
          Sexo.Femenino,
          NumberForForms(this.grupoEtarioForm.get('medianaFemenino')?.value),
          cantFemenino,
        );
        this.addFem(grupoFem);
      }
      // Datos Masculino (ignoro datos con cantidad = 0 o vacio)
      const cantMasculino: number = NumberForForms(this.grupoEtarioForm.get('cantMasculino')?.value);
      if (this.grupoEtarioForm.get('medianaMasculino')?.value !== '' && cantMasculino !== 0) { // hay datos para agregar a Masculino
        const grupoMasc : GrupoEtario = new GrupoEtario(
          this.grupoEtarioForm.get('edad')?.value,
          Sexo.Masculino,
          NumberForForms(this.grupoEtarioForm.get('medianaMasculino')?.value),
          cantMasculino,
        );
        this.addMasc(grupoMasc);
      }
    }
  } // onSubmit

  addFem(grupo: GrupoEtario) {
    femeninoData.push(grupo);
    femeninoData.sort((a, b) => compareFranjaEtaria(a.edad, b.edad));
    this.dataSourceF._updateChangeSubscription();
    this.stepValid = true;
    this.updateFemale18to59Pop(grupo.edad, grupo.cantidad);
    this.updateStepperLogicOnInsert(grupo.edad, grupo.sexo);
  }

  addMasc(grupo: GrupoEtario) {
    masculinoData.push(grupo);
    masculinoData.sort((a, b) => compareFranjaEtaria(a.edad, b.edad));
    this.dataSourceM._updateChangeSubscription();
    this.stepValid = true;
    this.updateStepperLogicOnInsert(grupo.edad, grupo.sexo);
  }

  // Boton de borrar datos asociados a FranjaEtaria
  borrarEdad() {
    // la edad actualmente seleccionada en grupoEtarioForm
    const edadSel: FranjaEtaria = this.grupoEtarioForm.get('edad')?.value;

    // Borro en la tabla femeninoData
    const indexF = femeninoData.findIndex((element: GrupoEtario) => element.edad === edadSel);
    if (indexF > -1) {
      femeninoData.splice(indexF, 1);
      this.dataSourceF._updateChangeSubscription(); // actualizo la tabla
      this.updateFemale18to59Pop(edadSel, 0);
      this.updateStepperLogicOnRemove(edadSel, Sexo.Femenino);
    }
    // Borro en la tabla femeninoData
    const indexM = masculinoData.findIndex((element: GrupoEtario) => element.edad === edadSel);
    if (indexM > -1) {
      masculinoData.splice(indexM, 1);
      this.dataSourceM._updateChangeSubscription(); // actualizo la tabla
      this.updateStepperLogicOnRemove(edadSel, Sexo.Masculino);
    }
    this.stepValid = femeninoData.length > 0 || masculinoData.length > 0;
  } // borrarEdad

  // Envio de datos al backend
  prepareData(dataFem:GrupoEtario[], dataMasc :GrupoEtario[]): AgeGroupJSON[] {
    const res: AgeGroupJSON[] = [];

    dataFem.forEach((group: GrupoEtario) => {
      const elem :AgeGroupJSON = {
        age: group.edad,
        sex: group.sexo,
        medianWeight: group.pesoMediano,
        population: group.cantidad,
      };
      res.push(elem);
    });

    dataMasc.forEach((group: GrupoEtario) => {
      const elem :AgeGroupJSON = {
        age: group.edad,
        sex: group.sexo,
        medianWeight: group.pesoMediano,
        population: group.cantidad,
      };
      res.push(elem);
    });

    return res;
  }

  sendData(): {step1Data: AgeGroupJSON[], fromTemplate: boolean} {
    return {
      step1Data: this.prepareData(femeninoData, masculinoData),
      fromTemplate: this.fromTemplate,
    };
  }

  // Inicaliza la tabla de resultados
  initializeTable(grupos: GrupoEtario[]) {
    grupos.forEach((grupo) => {
      switch (grupo.sexo) {
        case Sexo.Masculino:
          this.addMasc(grupo);
          break;
        case Sexo.Femenino:
          this.addFem(grupo);
          break;
        default:
          break;
      }
    });
  }

  updateStepperLogicOnInsert(age: FranjaEtaria, sex: Sexo) {
    if (compareFranjaEtaria(age, FranjaEtaria.Anios_6) >= 0
      && compareFranjaEtaria(age, FranjaEtaria.Anios_17) <= 0) {
      this.stepperLogic.agesMinorPresent = true;
    } else if (compareFranjaEtaria(age, FranjaEtaria.Anios_18_29) >= 0) {
      this.stepperLogic.agesAdultPresent = true;
      if (compareFranjaEtaria(age, FranjaEtaria.Anios_18_29) === 0 && sex === Sexo.Femenino) {
        this.stepperLogic.agesFemale18To29Present = true;
      } else if (compareFranjaEtaria(age, FranjaEtaria.Anios_30_59) === 0
      && sex === Sexo.Femenino) {
        this.stepperLogic.agesFemale30To59Present = true;
      }
    }
  }

  updateStepperLogicOnRemove(age: FranjaEtaria, sex: Sexo) {
    if (compareFranjaEtaria(age, FranjaEtaria.Anios_6) >= 0
      && compareFranjaEtaria(age, FranjaEtaria.Anios_17) <= 0) {
      this.stepperLogic.agesMinorPresent = femeninoData.some((
        group:GrupoEtario,
      ) => compareFranjaEtaria(group.edad, FranjaEtaria.Anios_6) >= 0
          && compareFranjaEtaria(group.edad, FranjaEtaria.Anios_17) <= 0)
        || masculinoData.some((
          group: GrupoEtario,
        ) => compareFranjaEtaria(group.edad, FranjaEtaria.Anios_6) >= 0
          && compareFranjaEtaria(group.edad, FranjaEtaria.Anios_17) <= 0);
    } else if (compareFranjaEtaria(age, FranjaEtaria.Anios_18_29) >= 0) {
      if (compareFranjaEtaria(age, FranjaEtaria.Anios_18_29) === 0 && sex === Sexo.Femenino) {
        this.stepperLogic.agesFemale18To29Present = false;
      } else if (compareFranjaEtaria(age, FranjaEtaria.Anios_30_59) === 0
      && sex === Sexo.Femenino) {
        this.stepperLogic.agesFemale30To59Present = false;
      }
      this.stepperLogic.agesAdultPresent = femeninoData.some((
        group: GrupoEtario,
      ) => compareFranjaEtaria(group.edad, FranjaEtaria.Anios_18_29) >= 0)
        || masculinoData.some((
          group: GrupoEtario,
        ) => compareFranjaEtaria(group.edad, FranjaEtaria.Anios_18_29) >= 0);
    }
  }

  updateFemale18to59Pop(age: FranjaEtaria, population: number) {
    switch (age) {
      case FranjaEtaria.Anios_18_29:
        this.female18To29Pop = population;
        break;
      case FranjaEtaria.Anios_30_59:
        this.female30To59Pop = population;
        break;
      default:
        break;
    }
  }

  clearTables() {
    femeninoData.splice(0, femeninoData.length);
    this.dataSourceF._updateChangeSubscription();

    masculinoData.splice(0, masculinoData.length);
    this.dataSourceM._updateChangeSubscription();
  }

  processDefaultWeights() {
    this.rest.getDefaultWeights()
      .subscribe(
        (data) => {
          console.log('Loading Step1');
          this.defaultWeightsAvailable = true;
          this.defaultWeights = data;
          this.defaultWeights?.forEach((weight: DefaultWeightDTO) => {
            if (weight.sex === 'Femenino') {
              this.defaultWeightsF.set(weight.ageRange, weight.value);
            } else if (weight.sex === 'Masculino') {
              this.defaultWeightsM.set(weight.ageRange, weight.value);
            }
          });
        },
        (error) => {
          console.log(error);
          this.defaultWeightsAvailable = false;
          const errorMessage = 'Los valores por defecto no estan disponibles';
          const config : MatSnackBarConfig = new MatSnackBarConfig();
          config.verticalPosition = 'top';
          return this.errorSnackBar.open(errorMessage, 'Aceptar', config);
        },
      );
  }

  ageSelected(age: FranjaEtaria) {
    if (this.defaultWeightsAvailable) {
      this.grupoEtarioForm.get('medianaFemenino')?.setValue(this.defaultWeightsF.get(age));
      this.grupoEtarioForm.get('medianaMasculino')?.setValue(this.defaultWeightsM.get(age));
    }
  }
} // component class
