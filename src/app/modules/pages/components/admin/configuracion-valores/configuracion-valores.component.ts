import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion-valores',
  templateUrl: './configuracion-valores.component.html',
  styleUrls: ['./configuracion-valores.component.css'],
})

export class ConfiguracionValoresComponent implements OnInit {
  // constructor() { }

  ngOnInit(): void {
  }

  toggleContenido(id: string) {
    const contenido = document.getElementById(id);
    if (contenido) {
      if (contenido.classList.contains('active')) {
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
}
