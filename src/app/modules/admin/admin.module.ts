import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AutorizacionUsuariosComponent } from './autorizacion-usuarios/autorizacion-usuarios.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';


@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AdminComponent,
    AutorizacionUsuariosComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
