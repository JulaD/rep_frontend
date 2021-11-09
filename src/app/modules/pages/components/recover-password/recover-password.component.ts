import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('',
      [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
  });

  constructor(
    private service: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  confirm(): void {
    const { email } = this.form.value;
    this.spinner.show();
    this.service
      .recoverPassword(email)
      .subscribe(() => {
        // Success
        this.spinner.hide();
        this.router.navigate(['dashboard']);
        Swal.fire('Éxito!', `
          Te llegará un mail a tu casilla de correo. Sigue los pasos para recuperar tu contraseña. 
          `, 'success');
      }, () => {
        // Error
        this.spinner.hide();
        this.router.navigate(['dashboard']);
        Swal.fire('¡Ups!', 'Ha sucedido un error. Vuelve a intentarlo más tarde', 'error');
      });
  }
}
