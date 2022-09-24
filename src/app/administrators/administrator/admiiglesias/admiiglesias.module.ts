import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmiiglesiasRoutingModule } from './admiiglesias-routing.module';
import { AdmiIglesiaListComponent } from './admi-iglesia-list/admi-iglesia-list.component';
import { AdmiIglesiaUpdateComponent } from './admi-iglesia-update/admi-iglesia-update.component';
import { AdmiIglesiaDetailComponent } from './admi-iglesia-detail/admi-iglesia-detail.component';
import { AdmiiglesiasComponent } from './admiiglesias.component';
import { MaterialModule } from '../../../../Material/material.module';
import { AdmiIglesiaCreateComponent } from './admi-iglesia-create/admi-iglesia-create.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [

    AdmiIglesiaListComponent,
    AdmiIglesiaUpdateComponent,
    AdmiIglesiaDetailComponent,
    AdmiiglesiasComponent,
    AdmiIglesiaCreateComponent,
  ],
  imports: [
    CommonModule,
    AdmiiglesiasRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class AdmiiglesiasModule { }
