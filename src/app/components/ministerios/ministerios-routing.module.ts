import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DniComponent } from './dni/dni.component';
import { JniComponent } from './jni/jni.component';
import { MniComponent } from './mni/mni.component';

const routes: Routes = [
  { path: 'jni', component: JniComponent },
  { path: 'mni', component: MniComponent },
  { path: 'dni', component: DniComponent },
  {
    path:'',
    redirectTo: 'jni',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinisteriosRoutingModule { }
