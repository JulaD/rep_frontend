import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion-valores',
  templateUrl: './configuracion-valores.component.html',
  styleUrls: ['./configuracion-valores.component.css']
})
export class ConfiguracionValoresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  togglePesos() {
    var contenidoPesos = document.getElementsByClassName('pesos');
    if (contenidoPesos) {
      contenidoPesos[0].classList.toggle('active');
    }
  }
  togglePesosHombres() {
    var contenidoPesosHombres = document.getElementsByClassName('pesosHombres');
    if (contenidoPesosHombres) {
      contenidoPesosHombres[0].classList.toggle('active');
    }
  }
  togglePesosMujeres() {
    var contenidoPesosMujeres = document.getElementsByClassName('pesosMujeres');
    if (contenidoPesosMujeres) {
      contenidoPesosMujeres[0].classList.toggle('active');
    }
  }
}
