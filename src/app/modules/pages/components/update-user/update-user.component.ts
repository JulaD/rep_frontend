import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../../../models';
import { AuthService } from '../../../../services';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  logged: Partial<User> | undefined;

  user: User;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    organization: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.minLength(6), Validators.maxLength(50)]),
    repeat: new FormControl('', [Validators.minLength(6), Validators.maxLength(50)]),
  });

  constructor(
    private service: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.logged = this.service.getUser();
    if (!this.logged) {
      this.router.navigate(['']);
    }
    this.getUser();
  }

  getUser(): void {
    this.service
      .getBackUser(this.logged?.id)
      .subscribe((user: User) => {
        this.user = user;
        this.form.setValue({
          ...this.form.value,
          name: this.user.name,
          organization: this.user.organization,
        });
      }, () => {
        this.router.navigate(['']);
      });
  }

  onConfirm(): void {
    if (this.form.value.password || this.form.value.repeat) {
      if (!this.form.value.password || !this.form.value.repeat) {
        Swal.fire('¡Ups!', 'Para actualizar su contraseña debe proveerla repetida.', 'info');
      } else if (this.form.value.password !== this.form.value.repeat) {
        Swal.fire('¡Ups!', 'Las contraseñas no coinciden.', 'info');
      } else {
        this.updateUser();
      }
    } else {
      this.updateUser();
    }
  }

  updateUser(): void {
    this.spinner.show();
    this.service
      .updateUser(this.user.id, this.form.value)
      .subscribe((updated: User) => {
        this.form.reset();
        this.user = updated;
        this.form.setValue({
          ...this.form.value,
          name: this.user.name,
          organization: this.user.organization,
        });
        Swal.fire('Éxito!', 'Usuario actualizado.', 'success');
      }, () => {
        Swal.fire('¡Ups!', 'No se ha podido actualizar su usuario.', 'error');
      });
  }
}
