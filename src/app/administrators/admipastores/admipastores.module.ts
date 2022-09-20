import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmipastoresRoutingModule } from './admipastores-routing.module';
import { AdmipastoresComponent } from './admipastores.component';
import { MaterialModule } from '../../../Material/material.module';


@NgModule({
  declarations: [
    AdmipastoresComponent
  ],
  imports: [
    CommonModule,
    AdmipastoresRoutingModule,
    MaterialModule
  ]
})
export class AdmipastoresModule { }
