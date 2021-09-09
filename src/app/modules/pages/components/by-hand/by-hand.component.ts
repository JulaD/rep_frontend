import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GrupoEtario } from "src/app/GrupoEtario"
import { FranjaEtaria } from "src/app/FranjaEtaria"
import { Sexo } from "src/app/Sexo";

interface EdadCantMediana {
  edad: string;
  cantidad: number;
  mediana: number;
}

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

  @ViewChild(MatPaginator) paginatorF: MatPaginator;

  @ViewChild(MatPaginator) paginatorM: MatPaginator;

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
      this.enteredCantFemenino,
      this.enteredMedianaFemenino));
    this.dataSourceF = new MatTableDataSource<GrupoEtario>(FEMENINO_DATA);
    
    MASCULINO_DATA.push(new GrupoEtario(
      this.enteredEdad,
      Sexo.Masculino,
      this.enteredCantMasculino,
      this.enteredMedianaMasculino));
    this.dataSourceM = new MatTableDataSource<GrupoEtario>(MASCULINO_DATA);
  }
}

const FEMENINO_DATA: GrupoEtario[] = []
const MASCULINO_DATA: GrupoEtario[] = []