import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManualsComponent } from './components/manuals/manuals.component';
import { TemplatesComponent } from './components/templates/templates.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ManualsComponent,
    TemplatesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
