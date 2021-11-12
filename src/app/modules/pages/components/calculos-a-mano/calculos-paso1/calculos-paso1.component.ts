/* eslint-disable no-underscore-dangle */
// import { Breakpoints } from '@angular/cdk/layout';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
import { DeleteRowDialog } from './delete-row-dialog/delete-row-dialog.component';
import { OverwriteDialog } from './overwrite-dialog/overwrite-dialog.component';

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

  usingDefaultData = { female: false, male: false };

  edades: FranjaEtaria[] = Object.values(FranjaEtaria);

  constructor(
    private errorSnackBar: MatSnackBar,
    private repetidoSnackBar: MatSnackBar,
    private parsedDataService : ParsedDataService,
    public rest: RestService,
    public overwriteDialog: MatDialog,
    public deleteRowDialog: MatDialog,
  ) {}

  displayedColumns: string[] = ['edad', 'cantidad', 'mediana', 'borrar'];

  dataSourceF = new MatTableDataSource<GrupoEtario>(femeninoData);

  dataSourceM = new MatTableDataSource<GrupoEtario>(masculinoData);

  fromTemplate : boolean = false;

  @ViewChild('TablePaginatorF') paginatorF: MatPaginator;

  @ViewChild('TablePaginatorM') paginatorM: MatPaginator;

  ngOnInit() {
    const groupData : GrupoEtario[] = this.parsedDataService.getGroupData();
    if (groupData?.length) {
      this.fromTemplate = this.parsedDataService.isFromTemplate();
      this.initializeTable(groupData);
    }
    this.processDefaultWeights();
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
    const franja: FranjaEtaria = this.grupoEtarioForm.get('edad')?.value;
    const cantFemenino: number = Number(this.grupoEtarioForm.get('cantFemenino')?.value);
    const cantMasculino: number = NumberForForms(this.grupoEtarioForm.get('cantMasculino')?.value);
    const medianaFemenino: number = NumberForForms(this.grupoEtarioForm.get('medianaFemenino')?.value);
    const medianaMasculino: number = NumberForForms(this.grupoEtarioForm.get('medianaMasculino')?.value);

    // Reviso si la la franja etaria ya tiene datos en la tabla
    const indexF = femeninoData.findIndex((element: GrupoEtario) => element.edad === franja);
    const indexM = masculinoData.findIndex((element: GrupoEtario) => element.edad === franja);
    if (indexF > -1 || indexM > -1) { // Si la franja ya esta en la tabla
      // evaluo si los nuevos datos no afectarian la tabla al sobrescribir
      if ((
        (cantFemenino === 0 && medianaFemenino === 0) // el campo femenino esta vacio
        || (cantFemenino === 0 && indexF === -1)
        || (indexF > -1
          && cantFemenino === femeninoData[indexF].cantidad
          && medianaFemenino === femeninoData[indexF].pesoMediano)
      )
      && (
        (cantMasculino === 0 && medianaMasculino === 0) // el campo masculino esta vacio
        || (cantMasculino === 0 && indexM === -1) // Cantidad en cero pero no estaba en la tabla
        || (indexM > -1
          && cantMasculino === masculinoData[indexM].cantidad
          && medianaMasculino === masculinoData[indexM].pesoMediano)
      )) {
        // presento mensaje de error
        const errorMessage = 'Atención: Ya agrego estos datos';
        const config : MatSnackBarConfig = new MatSnackBarConfig();
        config.verticalPosition = 'bottom';
        config.duration = 7000;
        this.repetidoSnackBar.open(errorMessage, 'Aceptar', config);
      // si los datos son distintos
      } else {
        // preparo los datos para el cuadro de dialogo
        const grupoFemeninoActual: GrupoEtario = {
          edad: franja,
          sexo: Sexo.Femenino,
          pesoMediano: (indexF > -1 ? femeninoData[indexF].pesoMediano : 0),
          cantidad: (indexF > -1 ? femeninoData[indexF].cantidad : 0),
        };
        const grupoMasculinoActual: GrupoEtario = {
          edad: franja,
          sexo: Sexo.Masculino,
          pesoMediano: (indexM > -1 ? masculinoData[indexM].pesoMediano : 0),
          cantidad: (indexM > -1 ? masculinoData[indexM].cantidad : 0),
        };
        const grupoFemeninoNuevo: GrupoEtario = {
          edad: franja,
          sexo: Sexo.Femenino,
          pesoMediano: medianaFemenino !== 0 ? medianaFemenino : grupoFemeninoActual.pesoMediano,
          cantidad: medianaFemenino !== 0 ? cantFemenino : grupoFemeninoActual.cantidad,
        };
        if (cantFemenino === 0 && medianaFemenino !== 0) {
          grupoFemeninoNuevo.pesoMediano = 0;
        }
        const grupoMasculinoNuevo: GrupoEtario = {
          edad: franja,
          sexo: Sexo.Masculino,
          pesoMediano: medianaMasculino !== 0 ? medianaMasculino : grupoMasculinoActual.pesoMediano,
          cantidad: medianaMasculino !== 0 ? cantMasculino : grupoMasculinoActual.cantidad,
        };
        if (cantMasculino === 0 && medianaMasculino !== 0) {
          grupoMasculinoNuevo.pesoMediano = 0;
        }
        // abro el dialogo, y si recibo una respuesta afirmativa, sobrescribo el valor actual
        this.openOverwriteDialog(grupoFemeninoActual, grupoMasculinoActual,
          grupoFemeninoNuevo, grupoMasculinoNuevo);
      }
    } else {
      // Datos Femenino (ignoro datos con cantidad = 0 o vacio)
      if (medianaFemenino !== 0 && cantFemenino !== 0) { // hay datos para agregar a Femenino
        const grupoFem : GrupoEtario = new GrupoEtario(
          this.grupoEtarioForm.get('edad')?.value,
          Sexo.Femenino,
          medianaFemenino,
          cantFemenino,
        );
        this.addFem(grupoFem);
      }
      // Datos Masculino (ignoro datos con cantidad = 0 o vacio)
      if (medianaMasculino !== 0 && cantMasculino !== 0) { // hay datos para agregar a Masculino
        const grupoMasc : GrupoEtario = new GrupoEtario(
          this.grupoEtarioForm.get('edad')?.value,
          Sexo.Masculino,
          medianaMasculino,
          cantMasculino,
        );
        this.addMasc(grupoMasc);
      }
      this.clearInputFields();
      this.grupoEtarioForm.markAsPristine();
    }
  } // onSubmit

  addFem(grupo: GrupoEtario) {
    // eslint-disable-next-line no-param-reassign
    grupo.pesoMediano = parseFloat(grupo.pesoMediano.toFixed(1));
    femeninoData.push(grupo);
    femeninoData.sort((a, b) => compareFranjaEtaria(a.edad, b.edad));
    this.dataSourceF._updateChangeSubscription();
    this.stepValid = true;
    this.updateFemale18to59Pop(grupo.edad, grupo.cantidad);
    this.updateStepperLogicOnInsert(grupo.edad, grupo.sexo);
  }

  addMasc(grupo: GrupoEtario) {
    // eslint-disable-next-line no-param-reassign
    grupo.pesoMediano = parseFloat(grupo.pesoMediano.toFixed(1));
    masculinoData.push(grupo);
    masculinoData.sort((a, b) => compareFranjaEtaria(a.edad, b.edad));
    this.dataSourceM._updateChangeSubscription();
    this.stepValid = true;
    this.updateStepperLogicOnInsert(grupo.edad, grupo.sexo);
  }

  clearInputFields() {
    this.grupoEtarioForm.reset({
      // si quiero tambien limpiar el campo edad, poner edad: null
      edad: '', cantFemenino: '', cantMasculino: '', medianaFemenino: '', medianaMasculino: '',
    });
    this.grupoEtarioForm.get('edad')?.markAsDirty();
  }

  // Boton de borrar datos asociados a FranjaEtaria
  borrarEdad(sexo: string, edadSel: FranjaEtaria) {
    if (sexo === 'Femenino' || sexo === 'Both') {
      // Borro en la tabla femeninoData
      const indexF = femeninoData.findIndex((element: GrupoEtario) => element.edad === edadSel);
      if (indexF > -1) {
        femeninoData.splice(indexF, 1);
        this.dataSourceF._updateChangeSubscription(); // actualizo la tabla
        this.updateFemale18to59Pop(edadSel, 0);
        this.updateStepperLogicOnRemove(edadSel, Sexo.Femenino);
      }
    }
    if (sexo === 'Masculino' || sexo === 'Both') {
      // Borro en la tabla masculinoData
      const indexM = masculinoData.findIndex((element: GrupoEtario) => element.edad === edadSel);
      if (indexM > -1) {
        masculinoData.splice(indexM, 1);
        this.dataSourceM._updateChangeSubscription(); // actualizo la tabla
        this.updateStepperLogicOnRemove(edadSel, Sexo.Masculino);
      }
    }
    this.stepValid = femeninoData.length > 0 || masculinoData.length > 0;
  } // borrarEdad

  deleteTableRow(sex: string, range: FranjaEtaria) {
    const dialogRef = this.deleteRowDialog.open(DeleteRowDialog, {
      width: 'auto',
      data: { franja: this.mostrarFranja(range), sexo: sex },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.borrarEdad(sex, range);
      }
    });
  }

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
          console.error(error);
          this.defaultWeightsAvailable = false;
          const errorMessage = 'Los valores por defecto no estan disponibles';
          const config : MatSnackBarConfig = new MatSnackBarConfig();
          config.verticalPosition = 'top';
          return this.errorSnackBar.open(errorMessage, 'Aceptar', config);
        },
      );
  }

  loadDefaultWeight(sex: String) {
    const age: FranjaEtaria = this.grupoEtarioForm.get('edad')?.value;
    if (sex === 'F') {
      this.grupoEtarioForm.get('medianaFemenino')?.setValue(this.defaultWeightsF.get(age));
    } else {
      this.grupoEtarioForm.get('medianaMasculino')?.setValue(this.defaultWeightsM.get(age));
    }
  }

  openOverwriteDialog(grupoFemeninoActual: GrupoEtario, grupoMasculinoActual: GrupoEtario,
    grupoFemeninoNuevo: GrupoEtario, grupoMasculinoNuevo: GrupoEtario) {
    const dialogRef = this.overwriteDialog.open(OverwriteDialog, {
      width: 'auto',
      data: {
        franja: this.mostrarFranja(grupoFemeninoActual.edad),
        cantFemeninoActual: grupoFemeninoActual.cantidad === 0 ? 'vacio' : grupoFemeninoActual.cantidad,
        medFemeninoActual: grupoFemeninoActual.pesoMediano === 0 ? 'vacio' : grupoFemeninoActual.pesoMediano,
        cantMasculinoActual: grupoMasculinoActual.cantidad === 0 ? 'vacio' : grupoMasculinoActual.cantidad,
        medMasculinoActual: grupoMasculinoActual.pesoMediano === 0 ? 'vacio' : grupoMasculinoActual.pesoMediano,
        cantFemeninoNuevo: grupoFemeninoNuevo.cantidad === 0 ? 'vacio' : grupoFemeninoNuevo.cantidad,
        medFemeninoNuevo: grupoFemeninoNuevo.pesoMediano === 0 ? 'vacio' : grupoFemeninoNuevo.pesoMediano,
        cantMasculinoNuevo: grupoMasculinoNuevo.cantidad === 0 ? 'vacio' : grupoMasculinoNuevo.cantidad,
        medMasculinoNuevo: grupoMasculinoNuevo.pesoMediano === 0 ? 'vacio' : grupoMasculinoNuevo.pesoMediano,
      },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.borrarEdad('Both', grupoFemeninoActual.edad);
        if (grupoFemeninoNuevo.cantidad !== 0) {
          this.addFem(grupoFemeninoNuevo);
        }
        if (grupoMasculinoNuevo.cantidad !== 0) {
          this.addMasc(grupoMasculinoNuevo);
        }
        this.clearInputFields();
      }
    });
  }

  mostrarFranja(franja: FranjaEtaria) {
    if (franja === FranjaEtaria.Meses_1) {
      return '1 mes';
    }

    if (franja === FranjaEtaria.Anios_1) {
      return '1 año';
    }

    return franja as string;
  }
} // component class
