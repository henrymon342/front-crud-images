import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmieventosRoutingModule } from './admieventos-routing.module';
import { AdmieventosComponent } from './admieventos.component';
import { SharedModule } from '../../shared/shared.module';
import { MainListsComponent } from './main-lists/main-lists.component';
import { ListEventJniComponent } from './list-event-jni/list-event-jni.component';
import { ListEventDniComponent } from './list-event-dni/list-event-dni.component';
import { ListEventMniComponent } from './list-event-mni/list-event-mni.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { DetailEventComponent } from './detail-event/detail-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { MaterialModule } from '../../../Material/material.module';


@NgModule({
  declarations: [
    AdmieventosComponent,
    MainListsComponent,
    ListEventJniComponent,
    ListEventDniComponent,
    ListEventMniComponent,
    CreateEventComponent,
    DetailEventComponent,
    UpdateEventComponent
  ],
  imports: [
    CommonModule,
    AdmieventosRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class AdmieventosModule { }
