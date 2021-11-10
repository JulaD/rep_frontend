import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AngularMaterialModule } from '../../../../material/angular-material.module';
import { AdminRouterComponent } from './admin-router/admin-router.component';
import { AdminRoutingModule } from './admin-routing.module';
// import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AutorizacionUsuariosComponent } from './autorizacion-usuarios/autorizacion-usuarios.component';
import { ConfiguracionValoresComponent } from './configuracion-valores/configuracion-valores.component';
import { FaqFormComponent } from './faq-form/faq-form.component';
import { FaqsComponent } from './faqs/faqs.component';
import { PermisosUsuariosComponent } from './permisos-usuarios/permisos-usuarios.component';
import { AuditoriaComponent } from './auditoria/auditoria.component';

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
    FaqsComponent,
    FaqFormComponent,
    AuditoriaComponent,
  ],
  imports: [
    RouterModule,
    // SharedModule,
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxChartsModule,
  ],
})
export class AdminModule { }
