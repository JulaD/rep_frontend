import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit {
  form = new FormGroup({
    password: new FormControl('',
      [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    repeat: new FormControl('',
      [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
  });

  token: string;

  constructor(
    private service: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => {
        this.token = params?.token;
        if (!this.token) {
          this.router.navigate(['dashboard']);
        }
      });
  }

  confirm(): void {
    const { password, repeat } = this.form.value;
    if (password !== repeat) {
      Swal.fire('¡Ups!', 'Las contraseñas no coinciden.', 'info');
    } else {
      this.spinner.show();
      this.service
        .updatePassword(this.form.value, this.token)
        .subscribe(() => {
          this.spinner.hide();
          this.router.navigate(['dashboard']);
          Swal.fire('Éxito!', 'Contraseña actualizada.', 'success');
        }, () => {
          this.spinner.hide();
          this.router.navigate(['dashboard']);
          Swal.fire('¡Ups!', 'No se ha podido actualizar su contraseña.', 'error');
        });
    }
  }
}
