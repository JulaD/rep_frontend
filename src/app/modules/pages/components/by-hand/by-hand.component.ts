import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GrupoEtario } from "src/app/models/grupo-etario"
import { FranjaEtaria } from "src/app/enums/FranjaEtaria"
import { Sexo } from "src/app/enums/Sexo";
import { AgeGroupJSON, RestService } from "src/app/services/rest/rest.service";
import { Router } from "@angular/router";
import { AgeGroupService } from "src/app/services/age-group.service";
import { ResultsService } from "src/app/services/results.service";

@Component({
  selector: 'app-by-hand',
  templateUrl: './by-hand.component.html',
  styleUrls: ['./by-hand.component.css']
})
export class ByHandComponent implements AfterViewInit {

  edades: FranjaEtaria[];
  displayedColumns: string[] = ['edad', 'cantidad', 'mediana'];
  
  dataSourceF = new MatTableDataSource<GrupoEtario>(FEMENINO_DATA);
  dataSourceM = new MatTableDataSource<GrupoEtario>(MASCULINO_DATA);

  @ViewChild('TablePaginatorF') paginatorF: MatPaginator;
  @ViewChild('TablePaginatorM') paginatorM: MatPaginator;

  constructor(
    public rest: RestService, 
    private router: Router,
    private ageGroupService: AgeGroupService,
    private resultsService: ResultsService
  ) { }

  ngOnInit() {
    this.edades = this.ageGroupService.getAgeGroups();
  }

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
    this.rest.addCalculation(
      this.prepareData(FEMENINO_DATA, MASCULINO_DATA))
      .subscribe((result) => {
        this.resultsService
          .setData(result);
        this.router
          .navigate(['/result']);
        // this.router
        //   .navigate(['/result'], {​​​​​​​​ 
        //     queryParams: {
        //       result: JSON.stringify(result)
        //     },
        //     skipLocationChange: true
        //   }​​​​​​​​);
    }, (err) => {
      console.log(err);
    });
  }
}

const FEMENINO_DATA: GrupoEtario[] = []
const MASCULINO_DATA: GrupoEtario[] = []