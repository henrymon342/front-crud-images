import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { MaterialModule } from '../../Material/material.module';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RecursosComponent } from './recursos/recursos.component';
import { EnquecreemosComponent } from './enquecreemos/enquecreemos.component';
import { MinisteriosComponent } from './ministerios/ministerios.component';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    RecursosComponent,
    EnquecreemosComponent,
    MinisteriosComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    NgxDropzoneModule,
    FileUploadModule,
    MatExpansionModule
  ]
})
export class HomeModule { }
