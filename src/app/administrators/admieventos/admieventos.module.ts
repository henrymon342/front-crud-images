import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmieventosRoutingModule } from './admieventos-routing.module';
import { AdmieventosComponent } from './admieventos.component';


@NgModule({
  declarations: [
    AdmieventosComponent
  ],
  imports: [
    CommonModule,
    AdmieventosRoutingModule
  ]
})
export class AdmieventosModule { }
