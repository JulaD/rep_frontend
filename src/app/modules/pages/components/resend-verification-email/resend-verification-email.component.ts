import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resend-verification-email',
  templateUrl: './resend-verification-email.component.html',
  styleUrls: ['./resend-verification-email.component.css'],
})
export class ResendVerificationEmailComponent implements OnInit {
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
      .resendVerification(email)
      .subscribe(() => {
        // Success
        this.spinner.hide();
        this.router.navigate(['dashboard']);
        Swal.fire('Éxito!', `
          Te llegará un mail a tu casilla de correo. Sigue los pasos para verificar tu email. 
          `, 'success');
      }, () => {
        // Error
        this.spinner.hide();
        this.router.navigate(['dashboard']);
        Swal.fire('¡Ups!', 'Ha sucedido un error. Vuelve a intentarlo más tarde', 'error');
      });
  }
}
