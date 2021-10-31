import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManualsComponent } from './components/manuals/manuals.component';
import { UploadTemplateComponent } from './components/upload-template/upload-template.component';
import { PagesComponent } from './pages.component';
import { ResultComponent } from './components/result/result.component';
import { CalculosComponent } from './components/calculos/calculos.component';
import { StepperComponent } from './components/calculos-a-mano/stepper/stepper.component';
import { ByHandComponent } from './components/by-hand/by-hand.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'by-hand',
    component: ByHandComponent,
    canActivate: [UserGuard],
  }, {
    path: 'with-template',
    component: StepperComponent,
    canActivate: [UserGuard],
  }, {
    path: 'manuals',
    component: ManualsComponent,
  // }, {
  //   path: 'templates',
  //   component: TemplatesComponent,
  }, {
    path: 'calculos',
    component: CalculosComponent,
    canActivate: [UserGuard],
  }, {
    path: 'result',
    component: ResultComponent,
    canActivate: [UserGuard],
  }, {
    path: 'upload-template',
    component: UploadTemplateComponent,
    canActivate: [UserGuard],
  }, {
    path: 'stepper',
    component: StepperComponent,
    canActivate: [UserGuard],
  }, {
    path: 'update-user',
    component: UpdateUserComponent,
    canActivate: [UserGuard],
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: 'about-us',
    component: AboutUsComponent,
  }, {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then((m) => m.AdminModule),
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class PagesRoutingModule { }
