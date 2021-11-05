import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services';
import { Register } from '../../../models/user.model';
// import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css'],
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
      name: new FormControl(null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      email: new FormControl(null,
        [Validators.email, Validators.required, Validators.maxLength(60)]),
      organization: new FormControl(null,
        [Validators.required, Validators.maxLength(50)]),
      password: new FormControl(null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      passwordConf: new FormControl(null, Validators.required),
    });
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  register() {
    // solo deja llamar a esta funcion en caso de que todos los campos sean validos
    const values: Register = this.registerForm.value;
    if (values.password !== values.passwordConf) {
      this.message = 'Las contraseñas no coinciden';
      this.alertaSuccess = false;
      this.alertaError = true;
    } else {
      this.authService.register(values).subscribe(
        () => {
          // limpia los inputs
          this.registerForm.reset();
          this.message = '¡Usuario creado exitosamente! Su cuenta permanecera inactiva hasta que sea aceptado por un Administrador.';
          this.alertaSuccess = true;
          this.alertaError = false;
        },
        (err) => {
          console.error(err);
          if (err.status === 412) {
            this.message = 'Este correo electrónico ya está en uso';
          } else {
            this.message = 'Hubo un problema';
          }
          this.alertaError = true;
          this.alertaSuccess = false;
        },
      );
    }
  }

  login() {
    const values = this.loginForm.value;
    this.authService.login(values).subscribe(
      () => {
        // limpia los inputs
        this.registerForm.reset();
        this.router.navigate(['']);
      },
      (err) => {
        if (err.status === 401) {
          this.message = 'Su cuenta aún no ha sido autorizada por un Administrador';
        } else if (err.status === 400 || err.status === 404) {
          this.message = 'Correo electrónico o contraseña incorrectas';
        } else {
          this.message = 'Hubo un problema';
        }
        this.alertaError = true;
        this.alertaSuccess = false;
        console.error(err);
      },
    );
  }

  dashboard() {
    this.router.navigate(['']);
  }

  /* efectuarIngreso(res: any) {
    this.authService.usuarioActual = res.usuario;
    localStorage.setItem('Token', res.token);
    localStorage.setItem('RefreshToken', res.refreshToken);
    this.router.navigate(['']);
  } */

  cerrarAlerta() {
    this.alertaSuccess = false;
    this.alertaError = false;
  }

  toggleForm() {
    const container = document.querySelector('.container');
    const section = document.querySelector('section');
    if (container != null && section != null) {
      container.classList.toggle('active');
      section.classList.toggle('active');
    }
  }
}
