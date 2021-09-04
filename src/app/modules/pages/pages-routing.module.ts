import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculosPaso1Component } from './components/calculos-a-mano/calculos-paso1/calculos-paso1.component';
import { CalculosPaso2Component } from './components/calculos-a-mano/calculos-paso2/calculos-paso2.component';
import { CalculosPaso3Component } from './components/calculos-a-mano/calculos-paso3/calculos-paso3.component';
import { CalculosPaso4Component } from './components/calculos-a-mano/calculos-paso4/calculos-paso4.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManualsComponent } from './components/manuals/manuals.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { UploadTemplateComponent } from './components/upload-template/upload-template.component';
import { PagesComponent } from './pages.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'manuals',
    component: ManualsComponent
  }, {
    path: 'templates',
    component: TemplatesComponent
  }, {
    path: 'calculos1',
    component: CalculosPaso1Component
  }, {
    path: 'calculos2',
    component: CalculosPaso2Component
  }, {
    path: 'calculos3',
    component: CalculosPaso3Component
  }, {
    path: 'calculos4',
    component: CalculosPaso4Component
  }, {
    path: 'result',
    component: ResultComponent
  }, {
    path: 'upload-template',
    component: UploadTemplateComponent
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