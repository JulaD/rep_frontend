import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

import { CalculosPaso1Component } from
  './components/calculos-a-mano/calculos-paso1/calculos-paso1.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'calculos-paso1',
    component: CalculosPaso1Component
  }, {
    path: '',
    redirectTo: 'calculos-paso1',
    pathMatch: 'full'
  }]
}];

/*
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }]
}];
*/
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }