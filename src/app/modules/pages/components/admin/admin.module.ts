import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { AutorizacionUsuariosComponent } from './autorizacion-usuarios/autorizacion-usuarios.component';
// import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { PermisosUsuariosComponent } from './permisos-usuarios/permisos-usuarios.component';
import { ConfiguracionValoresComponent } from './configuracion-valores/configuracion-valores.component';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  declarations: [
    AdminComponent,
    AutorizacionUsuariosComponent,
    PermisosUsuariosComponent,
    ConfiguracionValoresComponent,
  ],
  imports: [
    RouterModule,
    // SharedModule,
    CommonModule,
    AdminRoutingModule,
  ],
})
export class AdminModule { }
