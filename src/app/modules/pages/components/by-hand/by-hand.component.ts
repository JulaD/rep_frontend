import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GrupoEtario } from "src/app/GrupoEtario"
import { compareFranjaEtaria, FranjaEtaria } from "src/app/FranjaEtaria"
import { Sexo } from "src/app/Sexo";
import { AgeGroupJSON, RestService } from "src/app/rest.service";
import { Router } from "@angular/router";
import { step1TodoVacioValidator } from "src/app/modules/shared/validators/step1-todo-vacio.directive";
import { step1CantidadSinMedianaValidator } from
  "src/app/modules/shared/validators/step1-cantidad-sin-mediana.directive";
import {MatSnackBar} from '@angular/material/snack-bar';

const femeninoData: GrupoEtario[] = []
const masculinoData: GrupoEtario[] = []
const numeroEnteroRe: RegExp = new RegExp('^[0-9]+$')
// El regex es ^(un entero > 0)|(un decimal >= 1)|(un decimal > 0 y < 1)$
const numeroFloatRe: RegExp =
  new RegExp('^(0*[1-9][0-9]*)|(0*[1-9][0-9]+.[0-9]+)|(0+.0*[1-9][0-9]*)$')

@Component({
  selector: 'app-by-hand',
  templateUrl: './by-hand.component.html',
  styleUrls: ['./by-hand.component.css']
})
export class ByHandComponent implements AfterViewInit {

  edades: FranjaEtaria[] = [
    FranjaEtaria.Meses_0,
    FranjaEtaria.Meses_1,
    FranjaEtaria.Meses_2,
    FranjaEtaria.Meses_3,
    FranjaEtaria.Meses_4,
    FranjaEtaria.Meses_5,
    FranjaEtaria.Meses_6,
    FranjaEtaria.Meses_7,
    FranjaEtaria.Meses_8,
    FranjaEtaria.Meses_9,
    FranjaEtaria.Meses_10,
    FranjaEtaria.Meses_11,
    FranjaEtaria.Anios_1,
    FranjaEtaria.Anios_2,
    FranjaEtaria.Anios_3,
    FranjaEtaria.Anios_4,
    FranjaEtaria.Anios_5,
    FranjaEtaria.Anios_6,
    FranjaEtaria.Anios_7,
    FranjaEtaria.Anios_8,
    FranjaEtaria.Anios_9,
    FranjaEtaria.Anios_10,
    FranjaEtaria.Anios_11,
    FranjaEtaria.Anios_12,
    FranjaEtaria.Anios_13,
    FranjaEtaria.Anios_14,
    FranjaEtaria.Anios_15,
    FranjaEtaria.Anios_16,
    FranjaEtaria.Anios_17,
    FranjaEtaria.Anios_18_29,
    FranjaEtaria.Anios_30_59,
    FranjaEtaria.Anios_60_mas
  ];

  displayedColumns: string[] = ['edad', 'cantidad', 'mediana'];
  
  dataSourceF = new MatTableDataSource<GrupoEtario>(femeninoData);
  dataSourceM = new MatTableDataSource<GrupoEtario>(masculinoData);

  @ViewChild('TablePaginatorF') paginatorF: MatPaginator;
  @ViewChild('TablePaginatorM') paginatorM: MatPaginator;

  ngAfterViewInit() {
    this.dataSourceF.paginator = this.paginatorF;
    this.dataSourceM.paginator = this.paginatorM;
  }

  // Aca van los items relacionados a Reactive Form:
  grupoEtarioForm = new FormGroup({
    edad: new FormControl('', Validators.required),
    cantFemenino: new FormControl('', Validators.pattern(numeroEnteroRe)),
    cantMasculino: new FormControl('', Validators.pattern(numeroEnteroRe)),
    medianaFemenino: new FormControl('', Validators.pattern(numeroFloatRe)),
    medianaMasculino: new FormControl('', Validators.pattern(numeroFloatRe))
  }, { validators: Validators.compose([step1TodoVacioValidator, step1CantidadSinMedianaValidator]) })

  onSubmit() {
    // Revisar si la la franja etaria ya tiene datos en la tabla
    let repetido: Boolean = false;
    const franja: string = this.grupoEtarioForm.get('edad')?.value;

    repetido = masculinoData.some((group: GrupoEtario)=> {
      return group.edad === franja;
    });
    if (!repetido) {
      repetido = femeninoData.some((group: GrupoEtario)=> {
        return group.edad === franja;
      });
    }
    if (repetido) {
      // presento mensaje de error
      this._snackBar.open(
        "ERROR: Ya existen datos ingresados para esta franja etaria", "Aceptar")
    } else {
      let cantFemenino: number = 0;
      let cantMasculino: number = 0;
      // Datos Femenino
      if (this.grupoEtarioForm.get('medianaFemenino')?.value != '') { // hay datos para agregar a Femenino
        if (this.grupoEtarioForm.get('cantFemenino')?.value === '') { // cantidad vacia equivale a 0
          cantFemenino = 0;
        } else {
          cantFemenino = this.grupoEtarioForm.get('cantFemenino')?.value
        }
        femeninoData.push(new GrupoEtario(
          this.grupoEtarioForm.get('edad')?.value,
          Sexo.Femenino,
          this.grupoEtarioForm.get('medianaFemenino')?.value,
          cantFemenino));
        femeninoData.sort((a,b) => {
          return compareFranjaEtaria(a.edad, b.edad)
        })
        this.dataSourceF._updateChangeSubscription();
      }
      // Datos Masculino
      if (this.grupoEtarioForm.get('medianaMasculino')?.value != '') { // hay datos para agregar a Femenino
        if (this.grupoEtarioForm.get('cantMasculino')?.value === '') { // cantidad vacia equivale a 0
          cantMasculino = 0;
        } else {
          cantMasculino = this.grupoEtarioForm.get('cantMasculino')?.value
        }
        masculinoData.push(new GrupoEtario(
          this.grupoEtarioForm.get('edad')?.value,
          Sexo.Masculino,
          this.grupoEtarioForm.get('medianaMasculino')?.value,
          cantMasculino));
          masculinoData.sort((a,b) => {
            return compareFranjaEtaria(a.edad, b.edad)
          })
        this.dataSourceM._updateChangeSubscription();
      }
    }
  } // onSubmit

  // Boton de borrar datos asociados a FranjaEtaria
  borrarEdad() {
    // la edad actualmente seleccionada en grupoEtarioForm
    const edadSel: FranjaEtaria = this.grupoEtarioForm.get('edad')?.value;
    
    // Borro en la tabla femeninoData
    const indexF = femeninoData.findIndex((element: GrupoEtario) => {
      return element.edad === edadSel;
    })
    if (indexF > -1) {
      femeninoData.splice(indexF, 1);
      this.dataSourceF._updateChangeSubscription(); // actualizo la tabla
    }
    // Borro en la tabla femeninoData
    const indexM = masculinoData.findIndex((element: GrupoEtario) => {
      return element.edad === edadSel;
    })
    if (indexM > -1) {
      masculinoData.splice(indexM, 1);
      this.dataSourceM._updateChangeSubscription(); // actualizo la tabla
    }
  }

  // Envio de datos al backend
  constructor(public rest: RestService, private router: Router, private _snackBar: MatSnackBar) { }

  prepareData(dataFem:GrupoEtario[], dataMasc :GrupoEtario[]): AgeGroupJSON[] {
    const res: AgeGroupJSON[] =[];
    
    dataFem.forEach((group: GrupoEtario)=> {
      let elem :AgeGroupJSON = {
        edad: group.edad as string,
        sexo: group.sexo as string,
        pesoMediano: group.pesoMediano,
        cantidad: group.cantidad };
      res.push(elem);
    });

    dataMasc.forEach((group: GrupoEtario)=> {
      let elem :AgeGroupJSON = {
        edad: group.edad as string,
        sexo: group.sexo as string,
        pesoMediano: group.pesoMediano,
        cantidad: group.cantidad };
      res.push(elem);
    });

    return res;
  }

  addCalculation(): void {
    this.rest.addCalculation(this.prepareData(femeninoData, masculinoData)).subscribe((result) => {
      
      this.router.navigate(['/result'], { queryParams: {result: JSON.stringify(result)}, skipLocationChange: true}​​​​​​​​);

    }, (err) => {
      console.log(err);
    });
  }
}
