import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { AdminRoutingModule } from './modules/admin/admin-routing.module';
import { PageNotFoundComponent } from './modules/shared/components/page-not-found/page-not-found.component';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule)
}, {
  path: 'auth',
  loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
}, {
  path: 'admin',
  loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
},{
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    AdminRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
