import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permisos-usuarios',
  templateUrl: './permisos-usuarios.component.html',
  styleUrls: ['./permisos-usuarios.component.css']
})
export class PermisosUsuariosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mostrarAceptados() {
    var section = document.querySelector('section');
    if (section != null){
      section.classList.add("active");
    }
  }
  mostrarPendientes() {
    var section = document.querySelector('section');
    if (section != null){
      section.classList.remove("active");
    }
  }

}
