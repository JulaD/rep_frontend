import { Component, OnInit } from '@angular/core';
import DefaultWeightDTO from 'src/app/interfaces/DefaultWeightDTO';
import DefaultExtraDataDTO from 'src/app/interfaces/DefaultExtraDataDTO';
import EquationConstantDTO from 'src/app/interfaces/EquationConstantDTO';
import { compareFranjaEtaria } from 'src/app/enums/FranjaEtaria';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
// import ExtraDataDTO from 'src/app/interfaces/ExtraDataDTO';
// import swal from 'sweetalert';
import { ValuesService } from '../../../../../services/values.service';

@Component({
  selector: 'app-configuracion-valores',
  templateUrl: './configuracion-valores.component.html',
  styleUrls: ['./configuracion-valores.component.css'],
})

export class ConfiguracionValoresComponent implements OnInit {
  weightsMen: DefaultWeightDTO[] = [];

  weightsWomen: DefaultWeightDTO[] = [];

  selectedWeightMen: DefaultWeightDTO;

  selectedWeightWomen: DefaultWeightDTO;

  nafMinors: DefaultExtraDataDTO[] = [];

  nafAdults: DefaultExtraDataDTO[] = [];

  selectedNafMinor: DefaultExtraDataDTO;

  selectedNafMinorMeasurement: string;

  selectedNafAdult: DefaultExtraDataDTO;

  selectedNafAdultMeasurement: string;

  pregnancyPopulation: DefaultExtraDataDTO[] = [];

  pregnancyEnergy: DefaultExtraDataDTO[] = [];

  selectedPregnancyPopulation: DefaultExtraDataDTO;

  selectedPregnancyEnergy: DefaultExtraDataDTO;

  equationConstants: EquationConstantDTO[] = [];

  constructor(
    public valuesService: ValuesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.init('', '', '', '', '', '');
  }

  init(previousAgeRangeMen: string, previousAgeRangeWomen: string,
    previousNafMinorId: string, previousNafAdultId: string,
    previousPregnancyPopulationId: string, previousPregnancyEnergyId: string) {
    this.valuesService.getParameters().subscribe(
      (res) => {
        this.equationConstants = res.equationConstants;
        res.defaultWeights.forEach((weight: DefaultWeightDTO) => {
          if (weight.sex === 'Masculino') {
            this.weightsMen.push(weight);
          } else if (weight.sex === 'Femenino') {
            this.weightsWomen.push(weight);
          }
        });
        this.weightsMen.sort((a, b) => compareFranjaEtaria(a.ageRange, b.ageRange));
        this.weightsWomen.sort((a, b) => compareFranjaEtaria(a.ageRange, b.ageRange));
        res.defaultExtraData.forEach((data: DefaultExtraDataDTO) => {
          if (data.parameterType === 'NAF Adultos') {
            this.nafAdults.push(data);
          } else if (data.parameterType === 'NAF Menores') {
            this.nafMinors.push(data);
          } else if (data.parameterType === 'Embarazo y lactancia') {
            if (data.id.includes('Energy')) {
              this.pregnancyEnergy.push(data);
            } else {
              this.pregnancyPopulation.push(data);
            }
          }
        });
        if (this.weightsMen.length !== 0) {
          if (previousAgeRangeMen !== '') {
            const weightMen = this.getWeightByAgeRange(previousAgeRangeMen, 'men');
            if (weightMen !== undefined) {
              this.selectedWeightMen = weightMen;
            }
          } else {
            this.selectedWeightMen = this.weightsMen[0];
          }
        }
        if (this.weightsWomen.length !== 0) {
          if (previousAgeRangeWomen !== '') {
            const weightWomen = this.getWeightByAgeRange(previousAgeRangeWomen, 'women');
            if (weightWomen !== undefined) {
              this.selectedWeightWomen = weightWomen;
            }
          } else {
            this.selectedWeightWomen = this.weightsWomen[0];
          }
        }
        if (this.nafMinors.length !== 0) {
          if (previousNafMinorId !== '') {
            const nafMinor = this.getNafById(previousNafMinorId, 'minor');
            if (nafMinor !== undefined) {
              this.selectedNafMinor = nafMinor;
            }
          } else {
            this.selectedNafMinor = this.nafMinors[0];
          }
          this.selectedNafMinorMeasurement = this.getMeasurement('minor');
        }
        if (this.nafAdults.length !== 0) {
          if (previousNafAdultId !== '') {
            const nafAdult = this.getNafById(previousNafAdultId, 'adult');
            if (nafAdult !== undefined) {
              this.selectedNafAdult = nafAdult;
            }
          } else {
            this.selectedNafAdult = this.nafAdults[0];
          }
          this.selectedNafAdultMeasurement = this.getMeasurement('adult');
        }
        if (this.pregnancyPopulation.length !== 0) {
          if (previousPregnancyPopulationId !== '') {
            const pregnancyPop = this.getPregnancyById(previousPregnancyPopulationId, 'population');
            if (pregnancyPop !== undefined) {
              this.selectedPregnancyPopulation = pregnancyPop;
            }
          } else {
            this.selectedPregnancyPopulation = this.pregnancyPopulation[0];
          }
        }
        if (this.pregnancyEnergy.length !== 0) {
          if (previousPregnancyEnergyId !== '') {
            const pregnancyEn = this.getPregnancyById(previousPregnancyEnergyId, 'energy');
            if (pregnancyEn !== undefined) {
              this.selectedPregnancyEnergy = pregnancyEn;
            }
          } else {
            this.selectedPregnancyEnergy = this.pregnancyEnergy[0];
          }
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  getMeasurement(age: string) {
    let naf: DefaultExtraDataDTO;
    let measurement: string;
    if (age === 'minor') {
      naf = this.selectedNafMinor;
    } else {
      naf = this.selectedNafAdult;
    }
    if (naf.id.includes('PALValue')) {
      // coeficiente
      measurement = '';
    } else {
      // porcentaje
      measurement = '%';
    }
    return measurement;
  }

  toggleContenido(id: string) {
    const contenido = document.getElementById(id);
    if (contenido) {
      if (contenido.classList.contains('active')) {
        if (id === 'pesos') {
          const contenidoHombres = document.getElementById(`${id}Hombres`);
          const contenidoMujeres = document.getElementById(`${id}Mujeres`);
          if (contenidoHombres) {
            contenidoHombres.classList.remove('active');
            contenidoHombres.classList.remove('mod');
          }
          if (contenidoMujeres) {
            contenidoMujeres.classList.remove('active');
            contenidoMujeres.classList.remove('mod');
          }
        } else if (id === 'naf') {
          const contenidoMayores = document.getElementById(`${id}Menores`);
          const contenidoMenores = document.getElementById(`${id}Mayores`);
          if (contenidoMayores) {
            contenidoMayores.classList.remove('active');
            contenidoMayores.classList.remove('mod');
          }
          if (contenidoMenores) {
            contenidoMenores.classList.remove('active');
            contenidoMenores.classList.remove('mod');
          }
        } else if (id === 'embarazo') {
          const contenidoPoblacion = document.getElementById(`${id}Poblacion`);
          const contenidoEnergia = document.getElementById(`${id}Energia`);
          if (contenidoPoblacion) {
            contenidoPoblacion.classList.remove('active');
            contenidoPoblacion.classList.remove('mod');
          }
          if (contenidoEnergia) {
            contenidoEnergia.classList.remove('active');
            contenidoEnergia.classList.remove('mod');
          }
        }
      }
      contenido.classList.toggle('active');
    }
  }

  toggleSubcontenido(id: string) {
    const subcontenido = document.getElementById(id);
    if (subcontenido) {
      if (subcontenido.classList.contains('active')) {
        subcontenido.classList.remove('mod');
      }
      subcontenido.classList.toggle('active');
    }
  }

  toggleModificar(id: string) {
    const elementoModificar = document.getElementById(id);
    if (elementoModificar) {
      const inputMod = <HTMLInputElement>document.getElementById(`${id}Input`);
      if (inputMod) {
        inputMod.value = '';
      }
      elementoModificar.classList.toggle('mod');
    }
  }

  changeValue(id: string, type: string) {
    const selectElement = <HTMLInputElement>document.getElementById(id);
    if (selectElement) {
      const selectedElement = selectElement.value;
      if (type === 'men' || type === 'women') {
        const weight: DefaultWeightDTO | undefined = this
          .getWeightByAgeRange(selectedElement, type);
        if ((type === 'men') && (selectedElement !== this.selectedWeightMen.ageRange) && (weight !== undefined)) {
          this.selectedWeightMen = weight;
        } else if ((type === 'women') && (selectedElement !== this.selectedWeightMen.ageRange) && (weight !== undefined)) {
          this.selectedWeightWomen = weight;
        }
      } else if (type === 'minors' || type === 'adults') {
        const data: DefaultExtraDataDTO | undefined = this
          .getNafById(selectedElement, type);
        if ((type === 'minors') && (selectedElement !== this.selectedNafMinor.id) && (data !== undefined)) {
          this.selectedNafMinor = data;
          this.selectedNafMinorMeasurement = this.getMeasurement('minor');
        } else if ((type === 'adults') && (selectedElement !== this.selectedNafAdult.id) && (data !== undefined)) {
          this.selectedNafAdult = data;
          this.selectedNafAdultMeasurement = this.getMeasurement('adult');
        }
      } else if (type === 'energy' || type === 'population') {
        const data: DefaultExtraDataDTO | undefined = this
          .getPregnancyById(selectedElement, type);
        if ((type === 'energy') && (selectedElement !== this.selectedPregnancyEnergy.id) && (data !== undefined)) {
          this.selectedPregnancyEnergy = data;
        } else if ((type === 'population') && (selectedElement !== this.selectedPregnancyPopulation.id) && (data !== undefined)) {
          this.selectedPregnancyPopulation = data;
        }
      }
    }
  }

  getPregnancyById(id: string, type: string): DefaultExtraDataDTO | undefined {
    let values: DefaultExtraDataDTO[] = [];
    if (type === 'energy') {
      values = this.pregnancyEnergy;
    } else if (type === 'population') {
      values = this.pregnancyPopulation;
    }
    const res: DefaultExtraDataDTO | undefined = values
      .find((value) => value.id === id);
    return res;
  }

  getNafById(id: string, age: string): DefaultExtraDataDTO | undefined {
    let nafs: DefaultExtraDataDTO[] = [];
    if (age === 'minors') {
      nafs = this.nafMinors;
    } else if (age === 'adults') {
      nafs = this.nafAdults;
    }
    const res: DefaultExtraDataDTO | undefined = nafs
      .find((naf) => naf.id === id);
    return res;
  }

  getWeightByAgeRange(ageRange: string, sex: string): DefaultWeightDTO | undefined {
    let weights: DefaultWeightDTO[] = [];
    if (sex === 'men') {
      weights = this.weightsMen;
    } else if (sex === 'women') {
      weights = this.weightsWomen;
    }
    const res: DefaultWeightDTO | undefined = weights
      .find((weight) => weight.ageRange === ageRange);
    return res;
  }

  modifyWeight(sex: string) {
    let inputWeightElement: HTMLInputElement;
    let weightToModify: DefaultWeightDTO;
    const weightToModifyArray: DefaultWeightDTO[] = [];
    let sexSwal: string = '';
    let textAlert: string = '';
    if (sex === 'men') {
      inputWeightElement = <HTMLInputElement>document.getElementById('pesosHombresInput');
      weightToModify = { ...this.selectedWeightMen };
      sexSwal = 'hombres';
    } else {
      inputWeightElement = <HTMLInputElement>document.getElementById('pesosMujeresInput');
      weightToModify = { ...this.selectedWeightWomen };
      sexSwal = 'mujeres';
    }
    if (inputWeightElement) {
      let newValue = parseFloat(inputWeightElement.value);
      // eslint-disable-next-line no-restricted-globals
      if ((isNaN(newValue as any))
        || (newValue <= 0)
        || (newValue >= 1000)) {
        Swal.fire(
          '¡Valor incorrecto!',
          'El valor del peso debe ser un número positivo mayor que 0 y menor que 1000',
        );
      } else {
        // redondeo 1 decimal
        newValue = Math.round(newValue * 10) / 10;
        textAlert = `El nuevo valor de peso para ${sexSwal} de ${weightToModify.ageRange} pasará de ser ${weightToModify.value}kg a ${newValue}kg.`;
        weightToModify.value = newValue;
        weightToModifyArray.push(weightToModify);
        const inputWeightElementArray: HTMLInputElement[] = [];
        inputWeightElementArray.push(inputWeightElement);
        this.confirmModify(textAlert, weightToModifyArray, inputWeightElementArray);
      }
    }
  }

  modifyNaf(age: string) {
    let inputNafElement: HTMLInputElement;
    let nafToModify: DefaultExtraDataDTO;
    const nafToModifyArray: DefaultExtraDataDTO[] = [];
    let ageSwal: string = '';
    let nafToModifyMeasurement: string = '';
    let textAlert: string = '';
    if (age === 'adults') {
      inputNafElement = <HTMLInputElement>document.getElementById('nafMayoresInput');
      nafToModify = { ...this.selectedNafAdult };
      nafToModifyMeasurement = this.selectedNafAdultMeasurement;
      ageSwal = 'adultos';
    } else {
      inputNafElement = <HTMLInputElement>document.getElementById('nafMenoresInput');
      nafToModify = { ...this.selectedNafMinor };
      nafToModifyMeasurement = this.selectedNafMinorMeasurement;
      ageSwal = 'menores';
    }
    if (inputNafElement) {
      let newValue = parseFloat(inputNafElement.value);
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(newValue as any)) {
        Swal.fire(
          '¡Valor incorrecto!',
          'El valor debe ser un número.',
        );
      } else {
        if (nafToModifyMeasurement === '%') {
        // redondeo 1 decimal
          newValue = Math.round(newValue * 10) / 10;
        } else {
        // redondeo 2 decimales
          newValue = Math.round(newValue * 100) / 100;
        }
        if (nafToModify.id === 'ruralPopulation' || nafToModify.id === 'urbanPopulation'
        || nafToModify.id === 'urbanActivePALPercentage' || nafToModify.id === 'urbanLowPALPercentage'
        || nafToModify.id === 'ruralActivePALPercentage' || nafToModify.id === 'ruralLowPALPercentage') {
          if (newValue > 100 || newValue < 0) {
            Swal.fire(
              '¡Valor incorrecto!',
              `El valor para '${nafToModify.id}' debe ser entre 0% y 100%`,
            );
          } else {
            if (nafToModify.id === 'ruralPopulation') {
              textAlert = `El nuevo valor de '${nafToModify.id}' pasará de ser ${nafToModify.value}${nafToModifyMeasurement}
                a ${newValue}${nafToModifyMeasurement}. A su vez, el nuevo valor para 'urbanPopulation' pasará a ser
                 ${100 - newValue}${nafToModifyMeasurement}`;
            } else if (nafToModify.id === 'urbanPopulation') {
              textAlert = `El nuevo valor de '${nafToModify.id}' pasará de ser ${nafToModify.value}${nafToModifyMeasurement}
                a ${newValue}${nafToModifyMeasurement}. A su vez, el nuevo valor para 'ruralPopulation' pasará a ser
                 ${100 - newValue}${nafToModifyMeasurement}`;
            } else if (nafToModify.id === 'urbanActivePALPercentage') {
              textAlert = `El nuevo valor de '${nafToModify.id}' pasará de ser ${nafToModify.value}${nafToModifyMeasurement}
                a ${newValue}${nafToModifyMeasurement}. A su vez, el nuevo valor para 'urbanLowPALPercentage' pasará a ser
                 ${100 - newValue}${nafToModifyMeasurement}`;
            } else if (nafToModify.id === 'urbanLowPALPercentage') {
              textAlert = `El nuevo valor de '${nafToModify.id}' pasará de ser ${nafToModify.value}${nafToModifyMeasurement}
                a ${newValue}${nafToModifyMeasurement}. A su vez, el nuevo valor para 'urbanActivePALPercentage' pasará a ser
                 ${100 - newValue}${nafToModifyMeasurement}`;
            } else if (nafToModify.id === 'ruralActivePALPercentage') {
              textAlert = `El nuevo valor de '${nafToModify.id}' pasará de ser ${nafToModify.value}${nafToModifyMeasurement}
                a ${newValue}${nafToModifyMeasurement}. A su vez, el nuevo valor para 'ruralLowPALPercentage' pasará a ser
                 ${100 - newValue}${nafToModifyMeasurement}`;
            } else if (nafToModify.id === 'ruralLowPALPercentage') {
              textAlert = `El nuevo valor de '${nafToModify.id}' pasará de ser ${nafToModify.value}${nafToModifyMeasurement}
                a ${newValue}${nafToModifyMeasurement}. A su vez, el nuevo valor para 'ruralActivePALPercentage' pasará a ser
                 ${100 - newValue}${nafToModifyMeasurement}`;
            }
            nafToModify.value = newValue;
            nafToModifyArray.push(nafToModify);
            const inputNafElementArray: HTMLInputElement[] = [];
            inputNafElementArray.push(inputNafElement);
            this.confirmModify(textAlert, nafToModifyArray, inputNafElementArray);
          }
        } else {
          textAlert = `El nuevo valor de '${nafToModify.id}' para ${ageSwal} pasará de ser
            ${nafToModify.value}${nafToModifyMeasurement} a ${newValue}${nafToModifyMeasurement}.`;
          nafToModify.value = newValue;
          nafToModifyArray.push(nafToModify);
          const inputNafElementArray: HTMLInputElement[] = [];
          inputNafElementArray.push(inputNafElement);
          this.confirmModify(textAlert, nafToModifyArray, inputNafElementArray);
        }
      }
    }
  }

  modifyPregnancy(type: string) {
    let inputPregnancyElement: HTMLInputElement;
    let pregnancyToModify: DefaultExtraDataDTO;
    const pregnancyToModifyArray: DefaultExtraDataDTO[] = [];
    let pregnancyToModifyMeasurement: string = '';
    let textAlert: string = '';
    if (type === 'energy') {
      inputPregnancyElement = <HTMLInputElement>document.getElementById('embarazoEnergiaInput');
      pregnancyToModify = { ...this.selectedPregnancyEnergy };
      pregnancyToModifyMeasurement = 'kcal';
    } else {
      inputPregnancyElement = <HTMLInputElement>document.getElementById('embarazoPoblacionInput');
      pregnancyToModify = { ...this.selectedPregnancyPopulation };
      pregnancyToModifyMeasurement = 'personas';
    }
    if (inputPregnancyElement) {
      let newValue = parseFloat(inputPregnancyElement.value);
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(newValue as any) || newValue < 0) {
        Swal.fire(
          '¡Valor incorrecto!',
          'El valor debe ser un número positivo.',
        );
      } else {
        if (type === 'energy') {
          // redondeo 1 decimal
          newValue = Math.round(newValue * 10) / 10;
        } else {
          // redondeo 0 decimales
          newValue = Math.round(newValue * 1) / 1;
        }
        textAlert = `El nuevo valor de '${pregnancyToModify.id}' pasará de ser 
        ${pregnancyToModify.value} ${pregnancyToModifyMeasurement} a ${newValue} ${pregnancyToModifyMeasurement}.`;
        pregnancyToModify.value = newValue;
        pregnancyToModifyArray.push(pregnancyToModify);
        const inputPregnancyElementArray: HTMLInputElement[] = [];
        inputPregnancyElementArray.push(inputPregnancyElement);
        this.confirmModify(textAlert, pregnancyToModifyArray, inputPregnancyElementArray);
      }
    }
  }

  confirmModify(textAlert: string, parameterToModify: DefaultExtraDataDTO[] | DefaultWeightDTO[]
  | EquationConstantDTO[], inputElements: HTMLInputElement[]) {
    Swal.fire({
      title: 'Confirmar',
      text: textAlert,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.valuesService.modifyParameter(parameterToModify).subscribe(
          () => {
            /* const previousSelectedAgeRangeMen: string = this.selectedWeightMen.ageRange;
            const previousSelectedAgeRangeWomen: string = this.selectedWeightWomen.ageRange; */
            this.weightsMen = [];
            this.weightsWomen = [];
            this.nafMinors = [];
            this.nafAdults = [];
            this.pregnancyEnergy = [];
            this.pregnancyPopulation = [];
            inputElements.forEach((input) => {
              // eslint-disable-next-line no-param-reassign
              input.value = '';
            });
            // this.init(previousSelectedAgeRangeMen, previousSelectedAgeRangeWomen);
            this.init('', '', '', '', '', '');
            Swal.fire(
              '¡Éxito!',
              'Se ha modificado el valor.',
            );
          },
          (err) => {
            Swal.fire(
              '¡Error!',
              'Hubo un problema.',
            );
            console.log(err);
          },
        );
      }
    });
  }

  modifyMinorPrevalence() {
    const actualMinorLowPrevalence: DefaultExtraDataDTO | undefined = this.getNafById('minorLowPrevalence', 'minors');
    const actualMinorModeratePrevalence: DefaultExtraDataDTO | undefined = this.getNafById('minorModeratePrevalence', 'minors');
    const actualMinorIntensePrevalence: DefaultExtraDataDTO | undefined = this.getNafById('minorIntensePrevalence', 'minors');
    const minorLowPrevalenceInput: HTMLInputElement = <HTMLInputElement>document.getElementById('minorLowPrevalenceInput');
    const minorModeratePrevalenceInput: HTMLInputElement = <HTMLInputElement>document.getElementById('minorModeratePrevalenceInput');
    const minorIntensePrevalenceInput: HTMLInputElement = <HTMLInputElement>document.getElementById('minorIntensePrevalenceInput');
    let newMinorLowPrevalenceValue: number = 0;
    let newMinorModeratePrevalenceValue: number = 0;
    let newMinorIntensePrevalenceValue: number = 0;
    let incompleteInputsError: boolean = false;
    let nanOrRangeError: boolean = false;
    let over100Error: boolean = false;
    let swalText: string = '';
    if (actualMinorLowPrevalence !== undefined && actualMinorModeratePrevalence !== undefined
      && actualMinorIntensePrevalence !== undefined && minorModeratePrevalenceInput
      && minorLowPrevalenceInput && minorIntensePrevalenceInput) {
      const minorModeratePrevalenceInputValue: string = minorModeratePrevalenceInput.value;
      const minorLowPrevalenceInputValue: string = minorLowPrevalenceInput.value;
      const minorIntensePrevalenceInputValue: string = minorIntensePrevalenceInput.value;
      if (minorModeratePrevalenceInputValue === '') {
        if (minorLowPrevalenceInputValue === '' || minorIntensePrevalenceInputValue === '') {
          incompleteInputsError = true;
        } else {
          newMinorLowPrevalenceValue = parseFloat(minorLowPrevalenceInputValue);
          newMinorIntensePrevalenceValue = parseFloat(minorIntensePrevalenceInputValue);
          // eslint-disable-next-line no-restricted-globals
          if (isNaN(newMinorLowPrevalenceValue as any) || newMinorLowPrevalenceValue < 0
          // eslint-disable-next-line no-restricted-globals
          || newMinorLowPrevalenceValue > 100 || isNaN(newMinorIntensePrevalenceValue as any)
          || newMinorIntensePrevalenceValue < 0 || newMinorIntensePrevalenceValue > 100) {
            nanOrRangeError = true;
          } else {
            newMinorLowPrevalenceValue = Math.round(newMinorLowPrevalenceValue * 10) / 10;
            newMinorIntensePrevalenceValue = Math.round(newMinorIntensePrevalenceValue * 10) / 10;
            const valueSum: number = newMinorLowPrevalenceValue + newMinorIntensePrevalenceValue;
            if (valueSum > 100) {
              over100Error = true;
            } else {
              newMinorModeratePrevalenceValue = 100 - valueSum;
            }
          }
        }
      } else if (minorLowPrevalenceInputValue === '') {
        if (minorIntensePrevalenceInputValue === '') {
          incompleteInputsError = true;
        } else {
          newMinorModeratePrevalenceValue = parseFloat(minorModeratePrevalenceInputValue);
          newMinorIntensePrevalenceValue = parseFloat(minorIntensePrevalenceInputValue);
          // eslint-disable-next-line no-restricted-globals
          if (isNaN(newMinorModeratePrevalenceValue as any) || newMinorModeratePrevalenceValue < 0
          // eslint-disable-next-line no-restricted-globals
          || newMinorModeratePrevalenceValue > 100 || isNaN(newMinorIntensePrevalenceValue as any)
          || newMinorIntensePrevalenceValue < 0 || newMinorIntensePrevalenceValue > 100) {
            nanOrRangeError = true;
          } else {
            newMinorModeratePrevalenceValue = Math.round(newMinorModeratePrevalenceValue * 10) / 10;
            newMinorIntensePrevalenceValue = Math.round(newMinorIntensePrevalenceValue * 10) / 10;
            const valueSum: number = newMinorModeratePrevalenceValue
            + newMinorIntensePrevalenceValue;
            if (valueSum > 100) {
              over100Error = true;
            } else {
              newMinorLowPrevalenceValue = 100 - valueSum;
            }
          }
        }
      } else if (minorIntensePrevalenceInputValue === '') {
        newMinorModeratePrevalenceValue = parseFloat(minorModeratePrevalenceInputValue);
        newMinorLowPrevalenceValue = parseFloat(minorLowPrevalenceInputValue);
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(newMinorModeratePrevalenceValue as any) || newMinorModeratePrevalenceValue < 0
        // eslint-disable-next-line no-restricted-globals
        || newMinorModeratePrevalenceValue > 100 || isNaN(newMinorLowPrevalenceValue as any)
        || newMinorLowPrevalenceValue < 0 || newMinorLowPrevalenceValue > 100) {
          nanOrRangeError = true;
        } else {
          newMinorModeratePrevalenceValue = Math.round(newMinorModeratePrevalenceValue * 10) / 10;
          newMinorLowPrevalenceValue = Math.round(newMinorLowPrevalenceValue * 10) / 10;
          const valueSum: number = newMinorModeratePrevalenceValue
          + newMinorLowPrevalenceValue;
          if (valueSum > 100) {
            over100Error = true;
          } else {
            newMinorIntensePrevalenceValue = 100 - valueSum;
          }
        }
      } else {
        // no hay ningun campo vacio
        newMinorModeratePrevalenceValue = parseFloat(minorLowPrevalenceInputValue);
        newMinorLowPrevalenceValue = parseFloat(minorLowPrevalenceInputValue);
        newMinorIntensePrevalenceValue = parseFloat(minorIntensePrevalenceInputValue);
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(newMinorModeratePrevalenceValue as any) || newMinorModeratePrevalenceValue < 0
        // eslint-disable-next-line no-restricted-globals
        || newMinorModeratePrevalenceValue > 100 || isNaN(newMinorLowPrevalenceValue as any)
        || newMinorLowPrevalenceValue < 0 || newMinorLowPrevalenceValue > 100
        // eslint-disable-next-line no-restricted-globals
        || isNaN(newMinorIntensePrevalenceValue as any) || newMinorIntensePrevalenceValue < 0
        || newMinorIntensePrevalenceValue > 100) {
          nanOrRangeError = true;
        } else {
          newMinorModeratePrevalenceValue = Math.round(newMinorModeratePrevalenceValue * 10) / 10;
          newMinorLowPrevalenceValue = Math.round(newMinorLowPrevalenceValue * 10) / 10;
          newMinorIntensePrevalenceValue = Math.round(newMinorIntensePrevalenceValue * 10) / 10;
          const valueSum: number = newMinorModeratePrevalenceValue
          + newMinorLowPrevalenceValue + newMinorIntensePrevalenceValue;
          if (valueSum !== 100) {
            over100Error = true;
          }
        }
      }
      if (over100Error || nanOrRangeError || incompleteInputsError) {
        if (over100Error) {
          swalText = 'La suma de los tres campos debe ser exactamente 100%';
        } else if (nanOrRangeError) {
          swalText = 'Los valores deben ser números entre 0% y 100%';
        } else {
          swalText = 'Debe completar por lo menos dos de los campos';
        }
        Swal.fire(
          '¡Error!',
          swalText,
        );
      } else {
        // todo bien, se confirma
        swalText = `Los nuevos valores para 'minorLowPrevalence', 'minorModeratePrevalence' y 'minorIntensePrevalence'
        pasaran a ser ${newMinorLowPrevalenceValue}%, ${newMinorModeratePrevalenceValue}% y ${newMinorIntensePrevalenceValue}%
        respectivamente.`;
        const minorLowPrevalenceToModify: DefaultExtraDataDTO = { ...actualMinorLowPrevalence };
        const minorModeratePrevalenceToModify:
        DefaultExtraDataDTO = { ...actualMinorModeratePrevalence };
        const minorIntensePrevalenceToModify:
        DefaultExtraDataDTO = { ...actualMinorIntensePrevalence };
        const minorPrevalenceArray: DefaultExtraDataDTO[] = [];
        minorLowPrevalenceToModify.value = newMinorLowPrevalenceValue;
        minorModeratePrevalenceToModify.value = newMinorModeratePrevalenceValue;
        minorIntensePrevalenceToModify.value = newMinorIntensePrevalenceValue;
        minorPrevalenceArray.push(minorLowPrevalenceToModify);
        minorPrevalenceArray.push(minorModeratePrevalenceToModify);
        minorPrevalenceArray.push(minorIntensePrevalenceToModify);
        const minorPrevalenceInputsArray: HTMLInputElement[] = [];
        minorPrevalenceInputsArray.push(minorLowPrevalenceInput);
        minorPrevalenceInputsArray.push(minorModeratePrevalenceInput);
        minorPrevalenceInputsArray.push(minorIntensePrevalenceInput);
        this.confirmModify(swalText, minorPrevalenceArray, minorPrevalenceInputsArray);
      }
    } else {
      Swal.fire(
        '¡Error!',
        'Hubo un problema.',
      );
    }
  }
}
