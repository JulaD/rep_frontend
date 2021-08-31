import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: boolean = false;
  submitted: boolean = false;
  hide: boolean = true;

  auth = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required
    ]))
  });

  get emailFormControl() {
    return this.auth.get('email') as FormControl;
  }
  
  constructor(
    private service: AuthService
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    // this.submitted = true;
    // this.service
    //   .login(this.auth.value)
    //   .subscribe((data: any) => {
    //     if (data?.user) {
    //       //this.router.navigate(['dashboard']);
    //     }
    //     this.submitted = false;
    //   }, (error: any) => {
    //     this.auth.reset();
    //     this.error = true;
    //     this.submitted = false;
    //   });
  }
}