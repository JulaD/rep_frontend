import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AutorizacionUsuariosComponent } from './autorizacion-usuarios/autorizacion-usuarios.component';
import { PermisosUsuariosComponent } from './permisos-usuarios/permisos-usuarios.component';

const routes: Routes = [{
  path: 'admin',
  component: AdminComponent,
  children: [{
    path: 'autorizacion',
    component: AutorizacionUsuariosComponent
  }, {
    path: 'permisos',
    component: PermisosUsuariosComponent
  }, {
    path: '',
    redirectTo: 'autorizacion-usuarios',
    pathMatch: 'full'
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
