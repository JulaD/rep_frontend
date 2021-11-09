import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../services';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
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

  verify(): void {
    if (!this.token) {
      Swal.fire('¡Ups!', 'No se ha podido verificar su email.', 'error');
    }
    this.spinner.show();
    this.service
      .verifyEmail(this.token)
      .subscribe(() => {
        this.spinner.hide();
        this.router.navigate(['dashboard']);
        Swal.fire('Éxito!', 'Email verificado.', 'success');
      }, () => {
        this.spinner.hide();
        this.router.navigate(['dashboard']);
        Swal.fire('¡Ups!', 'No se ha podido verificar su email.', 'error');
      });
  }
}
