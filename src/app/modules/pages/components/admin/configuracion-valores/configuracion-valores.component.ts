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
  
  toggleContenido(id: string) {
    var contenido = document.getElementById(id);
    if (contenido) {
      if (contenido.classList.contains('active')) {
        var contenidoHombres = document.getElementById(id + 'Hombres');
        var contenidoMujeres = document.getElementById(id + 'Mujeres');
        if (contenidoHombres) {
          contenidoHombres.classList.remove("active");
        }
        if (contenidoMujeres) {
          contenidoMujeres.classList.remove("active");
        }
      }
      contenido.classList.toggle('active');
    }
  }
  toggleSubcontenido(id: string) {
    var subcontenido = document.getElementById(id);
    if (subcontenido) {
      if (subcontenido.classList.contains('active')) {
        subcontenido.classList.remove("mod");
      }
      subcontenido.classList.toggle('active');
    }
  }
  toggleModificar(id: string) {
    var elementoModificar = document.getElementById(id);
    if (elementoModificar) {
      elementoModificar.classList.toggle('mod');
    }
  }
}
