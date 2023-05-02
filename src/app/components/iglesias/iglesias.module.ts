import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IglesiasRoutingModule } from './iglesias-routing.module';
import { ListaIglesiasComponent } from './lista-iglesias/lista-iglesias.component';
import { DetalleIglesiaComponent } from './detalle-iglesia/detalle-iglesia.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CardIglesiaComponent } from './card-iglesia/card-iglesia.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    ListaIglesiasComponent,
    DetalleIglesiaComponent,
    CardIglesiaComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    IglesiasRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ]
})
export class IglesiasModule { }
