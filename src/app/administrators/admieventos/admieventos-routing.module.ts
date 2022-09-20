import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmieventosComponent } from './admieventos.component';

const routes: Routes = [
  {
    path: '',
    component: AdmieventosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmieventosRoutingModule { }
