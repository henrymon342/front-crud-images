import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmipastoresComponent } from './admipastores.component';

const routes: Routes = [
  {
    path: '',
    component: AdmipastoresComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmipastoresRoutingModule { }
