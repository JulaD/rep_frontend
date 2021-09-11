import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autorizacion-usuarios',
  templateUrl: './autorizacion-usuarios.component.html',
  styleUrls: ['./autorizacion-usuarios.component.css']
})
export class AutorizacionUsuariosComponent implements OnInit {

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
