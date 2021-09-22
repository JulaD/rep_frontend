import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManualsComponent } from './components/manuals/manuals.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { UploadTemplateComponent } from './components/upload-template/upload-template.component';
import { PagesComponent } from './pages.component';
import { ResultComponent } from './components/result/result.component';
import { CalculosComponent } from './components/calculos/calculos.component';
import { StepperComponent } from './components/calculos-a-mano/stepper/stepper.component';
import { ByHandComponent } from './components/by-hand/by-hand.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'by-hand',
    component: ByHandComponent
  },  {
    path: 'with-template',
    component: StepperComponent
  }, {
    path: 'manuals',
    component: ManualsComponent
  }, {
    path: 'templates',
    component: TemplatesComponent
  }, {
    path: 'calculos',
    component: CalculosComponent
  }, {
    path: 'result',
    component: ResultComponent
  }, {
    path: 'upload-template',
    component: UploadTemplateComponent
  }, {
    path: 'stepper',
    component: StepperComponent
  },{
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