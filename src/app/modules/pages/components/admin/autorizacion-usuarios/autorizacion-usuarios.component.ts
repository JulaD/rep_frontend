import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../services';
import { User } from '../../../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autorizacion-usuarios',
  templateUrl: './autorizacion-usuarios.component.html',
  styleUrls: ['./autorizacion-usuarios.component.css']
})
export class AutorizacionUsuariosComponent implements OnInit {

  users: [User]

  constructor(
    public userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe (
      res => {
        this.users = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
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
