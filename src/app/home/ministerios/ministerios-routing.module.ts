import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JniComponent } from './jni/jni.component';
import { MinisteriosComponent } from './ministerios.component';
import { MniComponent } from './mni/mni.component';
import { DniComponent } from './dni/dni.component';

const routes: Routes = [
  {
    path: '',
    component: MinisteriosComponent,
    children: [
      {
        path: 'jni', component: JniComponent
      },
      {
        path: 'mni', component: MniComponent
      },
      {
        path: 'dni', component: DniComponent
      },
      {
        path:'',
        redirectTo: 'jni',
        pathMatch: 'full'
      }
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinisteriosRoutingModule { }
