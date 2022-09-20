import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorComponent } from './administrator.component';
import { MaterialModule } from '../../../Material/material.module';


@NgModule({
  declarations: [
    AdministratorComponent,
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    MaterialModule
  ]
})
export class AdministratorModule { }
