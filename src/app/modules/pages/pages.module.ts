import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManualsComponent } from './components/manuals/manuals.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { AngularMaterialModule } from '../../material/angular-material.module';
import { CalculosPaso1Component } from './components/calculos-a-mano/calculos-paso1/calculos-paso1.component';
import { CalculosPaso2Component } from './components/calculos-a-mano/calculos-paso2/calculos-paso2.component';
import { CalculosPaso3Component } from './components/calculos-a-mano/calculos-paso3/calculos-paso3.component';
import { CalculosPaso4Component } from './components/calculos-a-mano/calculos-paso4/calculos-paso4.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ManualsComponent,
    TemplatesComponent,
    CalculosPaso1Component,
    CalculosPaso2Component,
    CalculosPaso3Component,
    CalculosPaso4Component
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    AngularMaterialModule
  ]
})
export class PagesModule { }
