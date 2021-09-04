import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculosPaso1Component } from './components/calculos-a-mano/calculos-paso1/calculos-paso1.component';
import { CalculosPaso2Component } from './components/calculos-a-mano/calculos-paso2/calculos-paso2.component';
import { CalculosPaso3Component } from './components/calculos-a-mano/calculos-paso3/calculos-paso3.component';
import { CalculosPaso4Component } from './components/calculos-a-mano/calculos-paso4/calculos-paso4.component';
import { StepperComponent } from './components/calculos-a-mano/stepper/stepper.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManualsComponent } from './components/manuals/manuals.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
  {
    path: 'calculos',
    component: StepperComponent  
    },
  {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'manuals',
    component: ManualsComponent
  }, {
    path: 'templates',
    component: TemplatesComponent
  }, {
    path: '',
    redirectTo: 'dashboard',
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
export class PagesRoutingModule { }