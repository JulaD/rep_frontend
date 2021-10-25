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

  GETMen: EquationConstantDTO[] = [];

  selectedGETMenEcuation: EquationConstantDTO[] = [];

  representativeGETMenEcuation0to5M: EquationConstantDTO[] = [];

  representativeGETMenEcuation6to11M: EquationConstantDTO[] = [];

  representativeGETMenEcuation1to17Y: EquationConstantDTO[] = [];

  selectedGETMenRange: string;

  GETWomen: EquationConstantDTO[] = [];

  selectedGETWomenEcuation: EquationConstantDTO[] = [];

  representativeGETWomenEcuation0to5M: EquationConstantDTO[] = [];

  representativeGETWomenEcuation6to11M: EquationConstantDTO[] = [];

  representativeGETWomenEcuation1to17Y: EquationConstantDTO[] = [];

  selectedGETWomenRange: string;

  TMBWomen: EquationConstantDTO[] = [];

  selectedTMBWomenEcuation: EquationConstantDTO[] = [];

  selectedTMBWomenRange: string;

  representativeTMBWomenEcuation18to29Y: EquationConstantDTO[] = [];

  representativeTMBWomenEcuation30to59Y: EquationConstantDTO[] = [];

  representativeTMBWomenEcuation60Y: EquationConstantDTO[] = [];

  TMBMen: EquationConstantDTO[] = [];

  selectedTMBMenEcuation: EquationConstantDTO[] = [];

  selectedTMBMenRange: string;

  representativeTMBMenEcuation18to29Y: EquationConstantDTO[] = [];

  representativeTMBMenEcuation30to59Y: EquationConstantDTO[] = [];

  representativeTMBMenEcuation60Y: EquationConstantDTO[] = [];

  growthMen: EquationConstantDTO[] = [];

  selectedGrowthMen: EquationConstantDTO;

  selectedGrowthWomen: EquationConstantDTO;

  growthWomen: EquationConstantDTO[] = [];

  constructor(
    public valuesService: ValuesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.init('', '', '', '', '', '', '', '', '', '', '', '');
  }

  init(previousAgeRangeMen: string, previousAgeRangeWomen: string,
    previousNafMinorId: string, previousNafAdultId: string,
    previousPregnancyPopulationId: string, previousPregnancyEnergyId: string,
    previousAgeRangeGETMen: string, previousAgeRangeGETWomen: string,
    previousAgeRangeTMBMen: string, previousAgeRangeTMBWomen: string,
    previousAgeRangeGrowthMen: string, previousAgeRangeGrowthWomen: string) {
    this.valuesService.getParameters().subscribe(
      (res) => {
        console.log(res);
        res.defaultWeights.forEach((weight: DefaultWeightDTO) => {
          if (weight.sex === 'Masculino') {
            this.weightsMen.push(weight);
          } else if (weight.sex === 'Femenino') {
            this.weightsWomen.push(weight);
          }
        });
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
        res.equationConstants.forEach((constant: EquationConstantDTO) => {
          if (constant.parameterType === 'GET') {
            if (constant.sex === 'Masculino') {
              this.GETMen.push(constant);
            } else if (constant.sex === 'Femenino') {
              this.GETWomen.push(constant);
            }
          } else if (constant.parameterType === 'TMB') {
            if (constant.sex === 'Masculino') {
              this.TMBMen.push(constant);
            } else if (constant.sex === 'Femenino') {
              this.TMBWomen.push(constant);
            }
          } else if (constant.parameterType === 'Energia para crecimiento') {
            if (constant.sex === 'Masculino') {
              this.growthMen.push(constant);
            } else if (constant.sex === 'Femenino') {
              this.growthWomen.push(constant);
            }
          }
        });
        this.representativeEcuations();
        if (this.weightsMen.length !== 0) {
          this.weightsMen.sort((a, b) => compareFranjaEtaria(a.ageRange, b.ageRange));
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
          this.weightsWomen.sort((a, b) => compareFranjaEtaria(a.ageRange, b.ageRange));
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
            const nafMinor = this.getNafById(previousNafMinorId, 'minors');
            if (nafMinor !== undefined) {
              this.selectedNafMinor = nafMinor;
            }
          } else {
            this.selectedNafMinor = this.nafMinors[0];
          }
          this.selectedNafMinorMeasurement = this.getMeasurement('minors');
        }
        if (this.nafAdults.length !== 0) {
          if (previousNafAdultId !== '') {
            const nafAdult = this.getNafById(previousNafAdultId, 'adults');
            if (nafAdult !== undefined) {
              this.selectedNafAdult = nafAdult;
            }
          } else {
            this.selectedNafAdult = this.nafAdults[0];
          }
          this.selectedNafAdultMeasurement = this.getMeasurement('adults');
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
        if (this.GETMen.length !== 0) {
          if (previousAgeRangeGETMen !== '') {
            // if (previousAgeRangeGETMen === '0 A 5 MESES') {
            //   this.selectedGETMenEcuation = this.representativeGETMenEcuation0to5M;
            // }
            if (previousAgeRangeGETMen === '6 A 11 MESES') {
              this.selectedGETMenEcuation = this.representativeGETMenEcuation6to11M;
            }
            if (previousAgeRangeGETMen === '1 A 17 AÑOS') {
              this.selectedGETMenEcuation = this.representativeGETMenEcuation1to17Y;
            }
            this.selectedGETMenRange = previousAgeRangeGETMen;
          } else {
            this.selectedGETMenEcuation = this.representativeGETMenEcuation6to11M;
            this.selectedGETMenRange = '6 A 11 MESES';
          }
        }
        if (this.GETWomen.length !== 0) {
          if (previousAgeRangeGETWomen !== '') {
            // if (previousAgeRangeGETWomen === '0 A 5 MESES') {
            //   this.selectedGETWomenEcuation = this.representativeGETWomenEcuation0to5M;
            // }
            if (previousAgeRangeGETWomen === '6 A 11 MESES') {
              this.selectedGETWomenEcuation = this.representativeGETWomenEcuation6to11M;
            }
            if (previousAgeRangeGETWomen === '1 A 17 AÑOS') {
              this.selectedGETWomenEcuation = this.representativeGETWomenEcuation1to17Y;
            }
            this.selectedGETWomenRange = previousAgeRangeGETWomen;
          } else {
            this.selectedGETWomenEcuation = this.representativeGETWomenEcuation6to11M;
            this.selectedGETWomenRange = '6 A 11 MESES';
          }
        }
        if (this.TMBMen.length !== 0) {
          if (previousAgeRangeTMBMen !== '') {
            if (previousAgeRangeTMBMen === '18 A 29 AÑOS') {
              this.selectedTMBMenEcuation = this.representativeTMBMenEcuation18to29Y;
            }
            if (previousAgeRangeTMBMen === '30 A 59 AÑOS') {
              this.selectedTMBMenEcuation = this.representativeTMBMenEcuation30to59Y;
            }
            if (previousAgeRangeTMBMen === '60+ AÑOS') {
              this.selectedTMBMenEcuation = this.representativeTMBMenEcuation60Y;
            }
            this.selectedTMBMenRange = previousAgeRangeTMBMen;
          } else {
            this.selectedTMBMenEcuation = this.representativeTMBMenEcuation18to29Y;
            this.selectedTMBMenRange = '18 A 29 AÑOS';
          }
        }
        if (this.TMBWomen.length !== 0) {
          if (previousAgeRangeTMBWomen !== '') {
            if (previousAgeRangeTMBWomen === '18 A 29 AÑOS') {
              this.selectedTMBWomenEcuation = this.representativeTMBWomenEcuation18to29Y;
            }
            if (previousAgeRangeTMBWomen === '30 A 59 AÑOS') {
              this.selectedTMBWomenEcuation = this.representativeTMBWomenEcuation30to59Y;
            }
            if (previousAgeRangeTMBWomen === '60+ AÑOS') {
              this.selectedTMBWomenEcuation = this.representativeTMBWomenEcuation60Y;
            }
            this.selectedTMBWomenRange = previousAgeRangeTMBWomen;
          } else {
            this.selectedTMBWomenEcuation = this.representativeTMBWomenEcuation18to29Y;
            this.selectedTMBWomenRange = '18 A 29 AÑOS';
          }
        }
        if (this.growthMen.length !== 0) {
          this.growthMen.sort((a, b) => compareFranjaEtaria(a.ageRange, b.ageRange));
          if (previousAgeRangeGrowthMen !== '') {
            const previousGrowthMen: EquationConstantDTO | undefined = this.getGrowthByAgeRange(previousAgeRangeGrowthMen, 'men');
            if (previousGrowthMen !== undefined) {
              this.selectedGrowthMen = previousGrowthMen;
            }
          } else {
            this.selectedGrowthMen = this.growthMen[0];
          }
        }
        if (this.growthWomen.length !== 0) {
          this.growthWomen.sort((a, b) => compareFranjaEtaria(a.ageRange, b.ageRange));
          if (previousAgeRangeGrowthWomen !== '') {
            const previousGrowthWomen: EquationConstantDTO | undefined = this.getGrowthByAgeRange(previousAgeRangeGrowthWomen, 'women');
            if (previousGrowthWomen !== undefined) {
              this.selectedGrowthWomen = previousGrowthWomen;
            }
          } else {
            this.selectedGrowthWomen = this.growthWomen[0];
          }
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  representativeEcuations() {
    // GET Men
    if (this.GETMen.length > 0) {
      this.GETMen.forEach((constant: EquationConstantDTO) => {
        // if (constant.ageRange === '0 meses') {
        //   this.representativeGETMenEcuation0to5M.push(constant);
        // }
        if (constant.ageRange === '6 meses') {
          this.representativeGETMenEcuation6to11M.push(constant);
        }
        if (constant.ageRange === '1 años') {
          this.representativeGETMenEcuation1to17Y.push(constant);
        }
      });
    }
    // GET Women
    if (this.GETWomen.length > 0) {
      this.GETWomen.forEach((constant: EquationConstantDTO) => {
        // if (constant.ageRange === '0 meses') {
        //   this.representativeGETWomenEcuation0to5M.push(constant);
        // }
        if (constant.ageRange === '6 meses') {
          this.representativeGETWomenEcuation6to11M.push(constant);
        }
        if (constant.ageRange === '1 años') {
          this.representativeGETWomenEcuation1to17Y.push(constant);
        }
      });
    }
    // TMB Men
    if (this.TMBMen.length > 0) {
      this.TMBMen.forEach((constant: EquationConstantDTO) => {
        if (constant.ageRange === '18-29 años') {
          this.representativeTMBMenEcuation18to29Y.push(constant);
        }
        if (constant.ageRange === '30-59 años') {
          this.representativeTMBMenEcuation30to59Y.push(constant);
        }
        if (constant.ageRange === '60+ años') {
          this.representativeTMBMenEcuation60Y.push(constant);
        }
      });
    }
    // TMB Women
    if (this.TMBWomen.length > 0) {
      this.TMBWomen.forEach((constant: EquationConstantDTO) => {
        if (constant.ageRange === '18-29 años') {
          this.representativeTMBWomenEcuation18to29Y.push(constant);
        }
        if (constant.ageRange === '30-59 años') {
          this.representativeTMBWomenEcuation30to59Y.push(constant);
        }
        if (constant.ageRange === '60+ años') {
          this.representativeTMBWomenEcuation60Y.push(constant);
        }
      });
    }
    // ordenar por terminos
    this.representativeGETMenEcuation0to5M.sort(
      (a, b) => (a.order < b.order ? -1 : 1),
    );
    this.representativeGETMenEcuation6to11M.sort(
      (a, b) => (a.order < b.order ? -1 : 1),
    );
    this.representativeGETMenEcuation1to17Y.sort(
      (a, b) => (a.order < b.order ? -1 : 1),
    );
    this.representativeGETWomenEcuation0to5M.sort(
      (a, b) => (a.order < b.order ? -1 : 1),
    );
    this.representativeGETWomenEcuation6to11M.sort(
      (a, b) => (a.order < b.order ? -1 : 1),
    );
    this.representativeGETWomenEcuation1to17Y.sort(
      (a, b) => (a.order < b.order ? -1 : 1),
    );
    this.representativeTMBMenEcuation18to29Y.sort(
      (a, b) => (a.order < b.order ? -1 : 1),
    );
    this.representativeTMBMenEcuation30to59Y.sort(
      (a, b) => (a.order < b.order ? -1 : 1),
    );
    this.representativeTMBMenEcuation60Y.sort(
      (a, b) => (a.order < b.order ? -1 : 1),
    );
    this.representativeTMBWomenEcuation18to29Y.sort(
      (a, b) => (a.order < b.order ? -1 : 1),
    );
    this.representativeTMBWomenEcuation30to59Y.sort(
      (a, b) => (a.order < b.order ? -1 : 1),
    );
    this.representativeTMBWomenEcuation60Y.sort(
      (a, b) => (a.order < b.order ? -1 : 1),
    );
  }

  getMeasurement(age: string) {
    let naf: DefaultExtraDataDTO;
    let measurement: string;
    if (age === 'minors') {
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
        if (id === 'pesos' || id === 'get' || id === 'tmb' || id === 'crecimiento') {
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
      } else if (type === 'getMen' || type === 'getWomen') {
        if ((type === 'getMen') && (selectedElement !== this.selectedGETMenRange)) {
          if (selectedElement === '0 A 5 MESES') {
            this.selectedGETMenEcuation = this.representativeGETMenEcuation0to5M;
          } else if (selectedElement === '6 A 11 MESES') {
            this.selectedGETMenEcuation = this.representativeGETMenEcuation6to11M;
          } else if (selectedElement === '1 A 17 AÑOS') {
            this.selectedGETMenEcuation = this.representativeGETMenEcuation1to17Y;
          }
          this.selectedGETMenRange = selectedElement;
        } else if ((type === 'getWomen') && (selectedElement !== this.selectedGETWomenRange)) {
          if (selectedElement === '0 A 5 MESES') {
            this.selectedGETWomenEcuation = this.representativeGETWomenEcuation0to5M;
          } else if (selectedElement === '6 A 11 MESES') {
            this.selectedGETWomenEcuation = this.representativeGETWomenEcuation6to11M;
          } else if (selectedElement === '1 A 17 AÑOS') {
            this.selectedGETWomenEcuation = this.representativeGETWomenEcuation1to17Y;
          }
          this.selectedGETWomenRange = selectedElement;
        }
      } else if (type === 'tmbMen' || type === 'tmbWomen') {
        if ((type === 'tmbMen') && (selectedElement !== this.selectedTMBMenRange)) {
          if (selectedElement === '18 A 29 AÑOS') {
            this.selectedTMBMenEcuation = this.representativeTMBMenEcuation18to29Y;
          } else if (selectedElement === '30 A 59 AÑOS') {
            this.selectedTMBMenEcuation = this.representativeTMBMenEcuation30to59Y;
          } else if (selectedElement === '60+ AÑOS') {
            this.selectedTMBMenEcuation = this.representativeTMBMenEcuation60Y;
          }
          this.selectedTMBMenRange = selectedElement;
        } else if ((type === 'tmbWomen') && (selectedElement !== this.selectedTMBWomenRange)) {
          if (selectedElement === '18 A 29 AÑOS') {
            this.selectedTMBWomenEcuation = this.representativeTMBWomenEcuation18to29Y;
          } else if (selectedElement === '30 A 59 AÑOS') {
            this.selectedTMBWomenEcuation = this.representativeTMBWomenEcuation30to59Y;
          } else if (selectedElement === '60+ AÑOS') {
            this.selectedTMBWomenEcuation = this.representativeTMBWomenEcuation60Y;
          }
          this.selectedTMBWomenRange = selectedElement;
        }
      } else if (type === 'growthMen' || type === 'growthWomen') {
        const growth: EquationConstantDTO | undefined = this
          .getGrowthByAgeRange(selectedElement, type);
        if ((type === 'growthMen') && (selectedElement !== this.selectedGrowthMen.ageRange) && (growth !== undefined)) {
          this.selectedGrowthMen = growth;
        } else if ((type === 'growthWomen') && (selectedElement !== this.selectedGrowthMen.ageRange) && (growth !== undefined)) {
          this.selectedGrowthWomen = growth;
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

  getGrowthByAgeRange(ageRange: string, sex: string): EquationConstantDTO | undefined {
    let growths: EquationConstantDTO[] = [];
    if (sex === 'growthMen') {
      growths = this.growthMen;
    } else if (sex === 'growthWomen') {
      growths = this.growthWomen;
    }
    const res: EquationConstantDTO | undefined = growths
      .find((growth) => growth.ageRange === ageRange);
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
        if (newValue === weightToModify.value) {
          Swal.fire(
            '¡Valor incorrecto!',
            'El valor ingresado es igual al valor actual.',
          );
        } else {
          textAlert = `El nuevo valor de peso para ${sexSwal} de ${weightToModify.ageRange} pasará de ser ${weightToModify.value}kg a ${newValue}kg.`;
          weightToModify.value = newValue;
          weightToModifyArray.push(weightToModify);
          const inputWeightElementArray: HTMLInputElement[] = [];
          inputWeightElementArray.push(inputWeightElement);
          this.confirmModify(textAlert, weightToModifyArray, inputWeightElementArray);
        }
      }
    }
  }

  modifyGrowth(sex: string) {
    let inputGrowthElement: HTMLInputElement;
    let growthToModify: EquationConstantDTO;
    const growthToModifyArray: EquationConstantDTO[] = [];
    let sexSwal: string = '';
    let textAlert: string = '';
    if (sex === 'men') {
      inputGrowthElement = <HTMLInputElement>document.getElementById('crecimientoHombresInput');
      growthToModify = { ...this.selectedGrowthMen };
      sexSwal = 'hombres';
    } else {
      inputGrowthElement = <HTMLInputElement>document.getElementById('crecimientoMujeresInput');
      growthToModify = { ...this.selectedGrowthWomen };
      sexSwal = 'mujeres';
    }
    if (inputGrowthElement) {
      let newValue = parseFloat(inputGrowthElement.value);
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(newValue as any) || newValue < 0) {
        Swal.fire(
          '¡Valor incorrecto!',
          'El valor ingresado debe ser un número positivo.',
        );
      } else {
        // redondeo 2 decimales
        newValue = Math.round(newValue * 100) / 100;
        if (newValue === growthToModify.value) {
          Swal.fire(
            '¡Valor incorrecto!',
            'El valor ingresado es igual al valor actual.',
          );
        } else {
          textAlert = `El nuevo valor energético para ${sexSwal} de ${growthToModify.ageRange} pasará de ser ${growthToModify.value}kcal/d a ${newValue}kcal/d.`;
          growthToModify.value = newValue;
          growthToModifyArray.push(growthToModify);
          const inputGrowthElementArray: HTMLInputElement[] = [];
          inputGrowthElementArray.push(inputGrowthElement);
          this.confirmModify(textAlert, growthToModifyArray, inputGrowthElementArray);
        }
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
          'El valor ingresado debe ser un número.',
        );
      } else {
        if (nafToModifyMeasurement === '%') {
        // redondeo 1 decimal
          newValue = Math.round(newValue * 10) / 10;
        } else {
        // redondeo 2 decimales
          newValue = Math.round(newValue * 100) / 100;
        }
        if (newValue === nafToModify.value) {
          Swal.fire(
            '¡Valor incorrecto!',
            'El valor ingresado es igual al valor actual.',
          );
        } else if (nafToModify.id === 'ruralPopulation' || nafToModify.id === 'urbanPopulation'
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
      pregnancyToModifyMeasurement = 'kcal/d';
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
          'El valor ingresado debe ser un número positivo.',
        );
      } else {
        if (type === 'energy') {
          // redondeo 1 decimal
          newValue = Math.round(newValue * 10) / 10;
        } else {
          // redondeo 0 decimales
          newValue = Math.round(newValue * 1) / 1;
        }
        if (newValue === pregnancyToModify.value) {
          Swal.fire(
            '¡Valor incorrecto!',
            'El valor ingresado es igual al valor actual.',
          );
        } else {
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
  }

  async confirmModify(textAlert: string, parameterToModify: DefaultExtraDataDTO[]
  | DefaultWeightDTO[] | EquationConstantDTO[], inputElements: HTMLInputElement[]) {
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
            this.weightsMen = [];
            this.weightsWomen = [];
            this.nafMinors = [];
            this.nafAdults = [];
            this.pregnancyEnergy = [];
            this.pregnancyPopulation = [];
            this.growthMen = [];
            this.growthWomen = [];
            this.GETMen = [];
            this.GETWomen = [];
            this.representativeGETMenEcuation0to5M = [];
            this.representativeGETMenEcuation6to11M = [];
            this.representativeGETMenEcuation1to17Y = [];
            this.representativeGETWomenEcuation0to5M = [];
            this.representativeGETWomenEcuation6to11M = [];
            this.representativeGETWomenEcuation1to17Y = [];
            this.TMBMen = [];
            this.TMBWomen = [];
            this.representativeTMBMenEcuation18to29Y = [];
            this.representativeTMBMenEcuation30to59Y = [];
            this.representativeTMBMenEcuation60Y = [];
            this.representativeTMBWomenEcuation18to29Y = [];
            this.representativeTMBWomenEcuation30to59Y = [];
            this.representativeTMBWomenEcuation60Y = [];
            inputElements.forEach((input) => {
              // eslint-disable-next-line no-param-reassign
              input.value = '';
            });
            this.init(this.selectedWeightMen.ageRange, this.selectedWeightWomen.ageRange,
              this.selectedNafMinor.id, this.selectedNafAdult.id,
              this.selectedPregnancyPopulation.id, this.selectedPregnancyEnergy.id,
              this.selectedGETMenRange, this.selectedGETWomenRange,
              this.selectedTMBMenRange, this.selectedTMBWomenRange,
              this.selectedGrowthMen.ageRange, this.selectedGrowthWomen.ageRange);
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
        newMinorModeratePrevalenceValue = parseFloat(minorModeratePrevalenceInputValue);
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

  modifyEcuationConstants(type:string, sex:string) {
    let actualFirstValue: EquationConstantDTO | undefined;
    let actualSecondValue: EquationConstantDTO | undefined;
    let actualThirdValue: EquationConstantDTO | undefined;
    let firstValueInput: HTMLInputElement | undefined;
    let secondValueInput: HTMLInputElement | undefined;
    let thirdValueInput: HTMLInputElement | undefined;
    let firstValue: number = NaN;
    let secondValue: number = NaN;
    let thirdValue: number = NaN;
    let actualRange: string = '';
    let swalText: string = '';
    let NaNError: boolean = false;
    let sameValuesError: boolean = false;
    if (type === 'GET') {
      if (sex === 'men') {
        actualFirstValue = this.selectedGETMenEcuation[0];
        actualSecondValue = this.selectedGETMenEcuation[1];
        actualThirdValue = this.selectedGETMenEcuation[2];
        firstValueInput = <HTMLInputElement>document.getElementById('getHombresPrimerConstanteInput');
        secondValueInput = <HTMLInputElement>document.getElementById('getHombresSegundaConstanteInput');
        thirdValueInput = <HTMLInputElement>document.getElementById('getHombresTercerConstanteInput');
        actualRange = this.selectedGETMenRange;
      } else if (sex === 'women') {
        actualFirstValue = this.selectedGETWomenEcuation[0];
        actualSecondValue = this.selectedGETWomenEcuation[1];
        actualThirdValue = this.selectedGETWomenEcuation[2];
        firstValueInput = <HTMLInputElement>document.getElementById('getMujeresPrimerConstanteInput');
        secondValueInput = <HTMLInputElement>document.getElementById('getMujeresSegundaConstanteInput');
        thirdValueInput = <HTMLInputElement>document.getElementById('getMujeresTercerConstanteInput');
        actualRange = this.selectedGETWomenRange;
      }
    } else if (type === 'TMB') {
      if (sex === 'men') {
        actualFirstValue = this.selectedTMBMenEcuation[0];
        actualSecondValue = this.selectedTMBMenEcuation[1];
        firstValueInput = <HTMLInputElement>document.getElementById('tmbHombresPrimerConstanteInput');
        secondValueInput = <HTMLInputElement>document.getElementById('tmbHombresSegundaConstanteInput');
        actualRange = this.selectedTMBMenRange;
      } else if (sex === 'women') {
        actualFirstValue = this.selectedTMBWomenEcuation[0];
        actualSecondValue = this.selectedTMBWomenEcuation[1];
        firstValueInput = <HTMLInputElement>document.getElementById('tmbMujeresPrimerConstanteInput');
        secondValueInput = <HTMLInputElement>document.getElementById('tmbMujeresSegundaConstanteInput');
        actualRange = this.selectedTMBWomenRange;
      }
    }
    if (firstValueInput) {
      firstValue = parseFloat(firstValueInput!.value);
    }
    if (secondValueInput) {
      secondValue = parseFloat(secondValueInput!.value);
    }
    if (thirdValueInput) {
      thirdValue = parseFloat(thirdValueInput!.value);
    }
    if (actualRange === '0 A 5 MESES' || actualRange === '6 A 11 MESES'
      || actualRange === '18 A 29 AÑOS' || actualRange === '30 A 59 AÑOS'
      || actualRange === '60+ AÑOS') {
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(firstValue) as any || isNaN(secondValue) as any) {
        NaNError = true;
        swalText = 'Los valores deben ser números.';
      } else {
        firstValue = Math.round(firstValue * 1000) / 1000;
        secondValue = Math.round(secondValue * 1000) / 1000;
        if (firstValue === actualFirstValue!.value && secondValue === actualSecondValue!.value) {
          sameValuesError = true;
          swalText = 'Debe modificar por lo menos uno de los campos.';
        }
      }
    } else if (actualRange === '1 A 17 AÑOS') {
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(firstValue) as any || isNaN(secondValue) as any || isNaN(thirdValue) as any) {
        NaNError = true;
        swalText = 'Los valores ingresados deben ser números.';
      } else {
        // redonde 3 cifras significativas
        firstValue = Math.round(firstValue * 1000) / 1000;
        secondValue = Math.round(secondValue * 1000) / 1000;
        thirdValue = Math.round(thirdValue * 1000) / 1000;
        if (firstValue === actualFirstValue!.value && secondValue === actualSecondValue!.value
            && thirdValue === actualThirdValue!.value) {
          sameValuesError = true;
          swalText = 'Debe modificar por lo menos uno de los campos.';
        }
      }
    }
    if (NaNError || sameValuesError) {
      Swal.fire(
        '¡Error!',
        swalText,
      );
    } else {
      // identificar valores modificados, sabemos que por lo menos hay 1
      const constantsToModify: EquationConstantDTO[] = [];
      swalText = '';
      if (actualFirstValue && firstValue !== actualFirstValue!.value) {
        const firstConstantToModify: EquationConstantDTO = { ...actualFirstValue };
        firstConstantToModify.value = firstValue;
        constantsToModify.push(firstConstantToModify);
        swalText += `El primer término cambiará su valor de ${actualFirstValue!.value}
        a ${firstConstantToModify.value}. `;
      }
      if (actualSecondValue && secondValue !== actualSecondValue!.value) {
        const secondConstantToModify: EquationConstantDTO = { ...actualSecondValue };
        secondConstantToModify.value = secondValue;
        constantsToModify.push(secondConstantToModify);
        swalText += `El segundo término cambiará su valor de ${actualSecondValue!.value}
        a ${secondConstantToModify.value}. `;
      }
      if (actualThirdValue && thirdValue !== actualThirdValue!.value) {
        const thirdConstantToModify: EquationConstantDTO = { ...actualThirdValue };
        thirdConstantToModify.value = thirdValue;
        constantsToModify.push(thirdConstantToModify);
        swalText += `El tercer término cambiará su valor de ${actualThirdValue!.value}
        a ${thirdConstantToModify.value}. `;
      }
      if (swalText === '') {
        Swal.fire(
          '¡Error!',
          'Hubo un problema',
        );
      } else {
        // en este caso no se quiere resetear inputs, le paso un arreglo vacio
        const constantInputsArray: HTMLInputElement[] = [];
        this.confirmModify(swalText, constantsToModify, constantInputsArray);
      }
    }
  }

  showDefault() {
    const section = document.querySelector('section');
    if (section != null) {
      section.classList.remove('active');
    }
  }

  showConstants() {
    const section = document.querySelector('section');
    if (section != null) {
      section.classList.add('active');
    }
  }
}
