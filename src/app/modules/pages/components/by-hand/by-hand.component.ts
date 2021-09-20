import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GrupoEtario } from "src/app/GrupoEtario"
import { FranjaEtaria } from "src/app/FranjaEtaria"
import { Sexo } from "src/app/Sexo";
import { AgeGroupJSON, RestService } from "src/app/rest.service";
import { Router } from "@angular/router";
import { step1TodoVacioValidator } from "src/app/modules/shared/validators/step1-todo-vacio.directive";
import { step1CantidadSinMedianaValidator } from
  "src/app/modules/shared/validators/step1-cantidad-sin-mediana.directive";

const FEMENINO_DATA: GrupoEtario[] = []
const MASCULINO_DATA: GrupoEtario[] = []
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
  
  dataSourceF = new MatTableDataSource<GrupoEtario>(FEMENINO_DATA);
  dataSourceM = new MatTableDataSource<GrupoEtario>(MASCULINO_DATA);

  @ViewChild('TablePaginatorF') paginatorF: MatPaginator;
  @ViewChild('TablePaginatorM') paginatorM: MatPaginator;

  ngAfterViewInit() {
    this.dataSourceF.paginator = this.paginatorF;
    this.dataSourceM.paginator = this.paginatorM;
  }

  // Aca pongo las cosas de Reactive Form
  grupoEtarioForm = new FormGroup({
    edad: new FormControl('', Validators.required),
    cantFemenino: new FormControl('', Validators.pattern(numeroEnteroRe)),
    cantMasculino: new FormControl('', Validators.pattern(numeroEnteroRe)),
    medianaFemenino: new FormControl('', Validators.pattern(numeroFloatRe)),
    medianaMasculino: new FormControl('', Validators.pattern(numeroFloatRe))
  }, { validators: Validators.compose([step1TodoVacioValidator, step1CantidadSinMedianaValidator]) })

  cantFemenino :number = 0;
  cantMasculino :number = 0;

  onSubmit() {
    // Datos Femenino
    if (this.grupoEtarioForm.get('medianaFemenino')?.value != '') {
      if (this.grupoEtarioForm.get('cantFemenino')?.value === '') {
        this.cantFemenino = 0;
      } else {
        this.cantFemenino = this.grupoEtarioForm.get('cantFemenino')?.value
      }
      FEMENINO_DATA.push(new GrupoEtario(
        this.grupoEtarioForm.get('edad')?.value,
        Sexo.Femenino,
        this.grupoEtarioForm.get('medianaFemenino')?.value,
        this.cantFemenino));
      this.dataSourceF._updateChangeSubscription();
    }
    // Datos Masculino
    if (this.grupoEtarioForm.get('medianaMasculino')?.value != '') {
      if (this.grupoEtarioForm.get('cantMasculino')?.value === '') {
        this.cantMasculino = 0;
      } else {
        this.cantMasculino = this.grupoEtarioForm.get('cantMasculino')?.value
      }
      MASCULINO_DATA.push(new GrupoEtario(
        this.grupoEtarioForm.get('edad')?.value,
        Sexo.Masculino,
        this.grupoEtarioForm.get('medianaMasculino')?.value,
        this.cantMasculino));
      this.dataSourceM._updateChangeSubscription();
    }
  }

  constructor(public rest: RestService, private router: Router) { }

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
    this.rest.addCalculation(this.prepareData(FEMENINO_DATA, MASCULINO_DATA)).subscribe((result) => {
      
      this.router.navigate(['/result'], { queryParams: {result: JSON.stringify(result)}, skipLocationChange: true}​​​​​​​​);

    }, (err) => {
      console.log(err);
    });
  }
}
