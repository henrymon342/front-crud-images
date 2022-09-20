import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IglesiasRoutingModule } from './iglesias-routing.module';
import { ListaIglesiasComponent } from './lista-iglesias/lista-iglesias.component';
import { DetalleIglesiaComponent } from './detalle-iglesia/detalle-iglesia.component';


@NgModule({
  declarations: [
    ListaIglesiasComponent,
    DetalleIglesiaComponent
  ],
  imports: [
    CommonModule,
    IglesiasRoutingModule
  ]
})
export class IglesiasModule { }
