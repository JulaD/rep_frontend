import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { AutorizacionUsuariosComponent } from './autorizacion-usuarios/autorizacion-usuarios.component';
// import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { PermisosUsuariosComponent } from './permisos-usuarios/permisos-usuarios.component';
import { ConfiguracionValoresComponent } from './configuracion-valores/configuracion-valores.component';
import { AdminRouterComponent } from './admin-router/admin-router.component';
import { AngularMaterialModule } from '../../../../material/angular-material.module';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  declarations: [
    AdminComponent,
    AutorizacionUsuariosComponent,
    PermisosUsuariosComponent,
    ConfiguracionValoresComponent,
    AdminRouterComponent,
  ],
  imports: [
    RouterModule,
    // SharedModule,
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
  ],
})
export class AdminModule { }
