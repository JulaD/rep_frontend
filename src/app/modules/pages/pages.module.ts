import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from '../../material/angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { ByHandComponent } from './components/by-hand/by-hand.component';
import { CalculosPaso1Component } from './components/calculos-a-mano/calculos-paso1/calculos-paso1.component';
import { CalculosPaso2Component } from './components/calculos-a-mano/calculos-paso2/calculos-paso2.component';
import { CalculosPaso3Component } from './components/calculos-a-mano/calculos-paso3/calculos-paso3.component';
import { CalculosPaso4Component } from './components/calculos-a-mano/calculos-paso4/calculos-paso4.component';
import { StepperComponent } from './components/calculos-a-mano/stepper/stepper.component';
import { CalculosComponent } from './components/calculos/calculos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManualsComponent } from './components/manuals/manuals.component';
import { ResultComponent } from './components/result/result.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { UploadTemplateComponent } from './components/upload-template/upload-template.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { FaqExpansionPanelComponent } from './components/faq-expansion-panel/faq-expansion-panel.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OverwriteDialog } from './components/calculos-a-mano/calculos-paso1/overwrite-dialog/overwrite-dialog.component';
import { DeleteRowDialog } from './components/calculos-a-mano/calculos-paso1/delete-row-dialog/delete-row-dialog.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ResendVerificationEmailComponent } from './components/resend-verification-email/resend-verification-email.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ManualsComponent,
    TemplatesComponent,
    CalculosPaso1Component,
    CalculosPaso2Component,
    CalculosPaso3Component,
    CalculosPaso4Component,
    ResultComponent,
    UploadTemplateComponent,
    CalculosComponent,
    StepperComponent,
    ByHandComponent,
    FaqExpansionPanelComponent,
    UpdateUserComponent,
    AboutUsComponent,
    OverwriteDialog,
    DeleteRowDialog,
    VerifyEmailComponent,
    UpdatePasswordComponent,
    RecoverPasswordComponent,
    ResendVerificationEmailComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
})
export class PagesModule { }
