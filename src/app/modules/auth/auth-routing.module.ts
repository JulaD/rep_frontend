import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginRegistroComponent } from './login-registro/login-registro.component';
//import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path: 'auth',
  component: AuthComponent,
  children: [{
    path: 'login',
    //component: LoginComponent
    component: LoginRegistroComponent
  }, {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }