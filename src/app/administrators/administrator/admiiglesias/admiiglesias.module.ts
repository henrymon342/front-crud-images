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
    ReactiveFormsModule
  ]
})
export class AdmiiglesiasModule { }
