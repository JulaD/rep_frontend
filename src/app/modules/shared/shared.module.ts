import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularMaterialModule } from '../../material/angular-material.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';

@NgModule({
  declarations: [
    SideBarComponent,
    PageNotFoundComponent,
    ToolBarComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgxSpinnerModule,
    RouterModule
  ],
  exports: [
    AngularMaterialModule,
    NgxSpinnerModule,
    SideBarComponent,
    PageNotFoundComponent,
    ToolBarComponent
  ]
})
export class SharedModule { }
