import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinisteriosRoutingModule } from './ministerios-routing.module';
import { JniComponent } from './jni/jni.component';
import { MniComponent } from './mni/mni.component';
import { MatIconModule } from '@angular/material/icon';
import { DniComponent } from './dni/dni.component';


@NgModule({
  declarations: [
    JniComponent,
    MniComponent,
    DniComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MinisteriosRoutingModule,

  ]
})
export class MinisteriosModule { }
