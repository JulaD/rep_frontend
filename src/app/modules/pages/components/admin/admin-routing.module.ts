import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AutorizacionUsuariosComponent } from './autorizacion-usuarios/autorizacion-usuarios.component';
import { PermisosUsuariosComponent } from './permisos-usuarios/permisos-usuarios.component';
import { ConfiguracionValoresComponent } from './configuracion-valores/configuracion-valores.component';
import { AdminRouterComponent } from './admin-router/admin-router.component';
import { AuditoriaComponent } from './auditoria/auditoria.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [{
    path: '',
    component: AdminRouterComponent,
  }, {
    path: 'autorizacion',
    component: AutorizacionUsuariosComponent,
  }, {
    path: 'permisos',
    component: PermisosUsuariosComponent,
  }, {
    path: 'valores',
    component: ConfiguracionValoresComponent,
  }, {
    path: 'auditoria',
    component: AuditoriaComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdminRoutingModule { }
