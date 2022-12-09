import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmiiglesiasRoutingModule } from './admiiglesias-routing.module';
import { AdmiiglesiasComponent } from './admiiglesias.component';
import { MaterialModule } from '../../../../Material/material.module';
import { SharedModule } from '../../../shared/shared.module';
import { CreateIglesiaComponent } from './create-iglesia/create-iglesia.component';
import { DetailIglesiaComponent } from './detail-iglesia/detail-iglesia.component';
import { ListIglesiaComponent } from './list-iglesia/list-iglesia.component';
import { MainListIglesiaComponent } from './main-list-iglesia/main-list-iglesia.component';
import { UpdateIglesiaComponent } from './update-iglesia/update-iglesia.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    AdmiiglesiasComponent,
    CreateIglesiaComponent,
    DetailIglesiaComponent,
    ListIglesiaComponent,
    MainListIglesiaComponent,
    UpdateIglesiaComponent
  ],
  imports: [
    CommonModule,
    AdmiiglesiasRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatTimepickerModule,
    NgxDropzoneModule
  ]
})
export class AdmiiglesiasModule { }
