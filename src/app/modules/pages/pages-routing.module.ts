import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManualsComponent } from './components/manuals/manuals.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { PagesComponent } from './pages.component';

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