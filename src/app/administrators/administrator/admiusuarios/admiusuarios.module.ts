import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmiusuariosRoutingModule } from './admiusuarios-routing.module';
import { AdmiusuariosComponent } from './admiusuarios.component';
import { MaterialModule } from '../../../../Material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from "./create-user/create-user.component";
import { DetailUserComponent } from './detail-user/detail-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ListUserPastorComponent } from './list-user-pastor/list-user-pastor.component';
import { ListUserEventComponent } from './list-user-event/list-user-event.component';
import { MainListsComponent } from './main-lists/main-lists.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    AdmiusuariosComponent,
    CreateUserComponent,
    DetailUserComponent,
    UpdateUserComponent,
    ListUserPastorComponent,
    ListUserEventComponent,
    MainListsComponent,
  ],
  imports: [
    CommonModule,
    AdmiusuariosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdmiusuariosModule { }
