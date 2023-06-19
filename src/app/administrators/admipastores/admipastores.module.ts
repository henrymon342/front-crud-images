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
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RecordPastorComponent } from './record/record-pastor/record-pastor.component';
import { UpdateRecordPastorComponent } from './record/update-record-pastor/update-record-pastor.component';
import { CreateRecordPastorComponent } from './record/create-record-pastor/create-record-pastor.component';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

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
    RecordPastorComponent,
    UpdateRecordPastorComponent,
    CreateRecordPastorComponent,
  ],
  imports: [
    CommonModule,
    AdmipastoresRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatNativeDateModule,
    MatTimepickerModule,
    MatTableModule,
    MatSlideToggleModule,
    MatButtonToggleModule
  ],
})
export class AdmipastoresModule { }
