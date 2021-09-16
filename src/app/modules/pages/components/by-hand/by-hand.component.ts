import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GrupoEtario } from "src/app/GrupoEtario"
import { FranjaEtaria } from "src/app/FranjaEtaria"
import { Sexo } from "src/app/Sexo";
import { AgeGroupJSON, RestService } from "src/app/rest.service";
import { Router } from "@angular/router";

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

  enteredEdad: FranjaEtaria;
  enteredCantFemenino: number;
  enteredCantMasculino: number;
  enteredMedianaFemenino: number;
  enteredMedianaMasculino: number;


  onSubmit(form: NgForm) {
    FEMENINO_DATA.push(new GrupoEtario(
      this.enteredEdad,
      Sexo.Femenino,
      this.enteredMedianaFemenino,
      this.enteredCantFemenino));
    this.dataSourceF._updateChangeSubscription();
    
    MASCULINO_DATA.push(new GrupoEtario(
      this.enteredEdad,
      Sexo.Masculino,
      this.enteredMedianaMasculino,
      this.enteredCantMasculino
      ));
    this.dataSourceM._updateChangeSubscription();

    console.log(form);
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
      this.router.navigate(['/result']);

      this.router.navigate(['/result'], {​​​​​​​​ queryParams: {result: JSON.stringify(result)}, skipLocationChange: true}​​​​​​​​);

    }, (err) => {
      console.log(err);
    });
  }
}

const FEMENINO_DATA: GrupoEtario[] = []
const MASCULINO_DATA: GrupoEtario[] = []