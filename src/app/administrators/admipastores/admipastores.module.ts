import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmipastoresRoutingModule } from './admipastores-routing.module';
import { AdmipastoresComponent } from './admipastores.component';
import { MaterialModule } from '../../../Material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { MainListsComponent } from './main-lists/main-lists.component';
import { CreatePastorComponent } from './create-pastor/create-pastor.component';
import { DetailPastorComponent } from './detail-pastor/detail-pastor.component';
import { ListPastorPresbiteroComponent } from './list-pastor-presbitero/list-pastor-presbitero.component';
import { ListPastorDistritalComponent } from './list-pastor-distrital/list-pastor-distrital.component';
import { ListPastorLocalComponent } from './list-pastor-local/list-pastor-local.component';
import { UpdatePastorComponent } from './update-pastor/update-pastor.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdmipastoresComponent,
    MainListsComponent,
    CreatePastorComponent,
    DetailPastorComponent,
    ListPastorPresbiteroComponent,
    ListPastorDistritalComponent,
    ListPastorLocalComponent,
    UpdatePastorComponent,
  ],
  imports: [
    CommonModule,
    AdmipastoresRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class AdmipastoresModule { }
