import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../../Material/material.module';
import { HomeModule } from '../home/home.module';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    MaterialModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
