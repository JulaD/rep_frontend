import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services';
import { Router } from '@angular/router';
//import { NgForm } from '@angular/forms';
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css']
})
export class LoginRegistroComponent implements OnInit {

  alertaSuccess: boolean = false;
  alertaError: boolean = false;
  message: string = '';
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      'email': new FormControl(null, [Validators.email, Validators.required, Validators.maxLength(60)]),
      'organization': new FormControl(null, [Validators.required, Validators.maxLength(60)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      'passwordConf': new FormControl(null, Validators.required),
    })
    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    })
  }

  registrar() {
    //solo deja llamar a esta funcion en caso de que todos los campos sean valdos
    const values = this.registerForm.value;
    console.log(values);
    if (values.password != values.passwordConf) {
      this.message = 'Las contraseñas no coinciden'
      this.alertaSuccess = false;
      this.alertaError = true;
    } else {
      this.message = 'Usuario creado exitosamente! Su cuenta permanecera inactiva hasta que sea aceptado por un Administrador.'
      this.alertaSuccess = true;
      this.alertaError = false;
    }
      /*else {
      this.authService.registrar(form.value).subscribe (
        res => {
          //limpia los inputs
          form.reset();
          this.message = 'Usuario creado exitosamente! Su cuenta permanecera inactiva hasta que sea aceptado por un Administrador.'
          this.alertaSuccess = true;
          this.alertaError = false;
        },
        err => {
          this.message = err.error.message;
          this.alertaError = true;
          this.alertaSuccess = false;
          console.log(err.error.message);
        }
      )
    }*/
  }

  ingresar() {
    this.router.navigate(['']);
    /*this.authService.ingresar(form.value).subscribe (
      res => {
        //limpia los inputs
        form.reset();
        this.efectuarIngreso(res);
      },
      err => {
        this.message = err.error.message;
        this.alertaError = true;
        this.alertaSuccess = false;
        console.log(err.error.message);
      }
    )*/
  }

  /*efectuarIngreso(res: any) {
    this.authService.usuarioActual = res.usuario;
    localStorage.setItem('Token', res.token);
    localStorage.setItem('RefreshToken', res.refreshToken);
    this.router.navigate(['']);
  }*/

  cerrarAlerta() {
    this.alertaSuccess = false;
    this.alertaError = false;
  }

  toggleForm() {
    var container = document.querySelector('.container');
    var section = document.querySelector('section');
    if (container != null && section != null){
      container.classList.toggle('active');
      section.classList.toggle('active');
    }
  }

}
