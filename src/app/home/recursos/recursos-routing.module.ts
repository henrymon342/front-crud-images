import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecursosComponent } from './recursos.component';

const routes: Routes = [
  { path: 'recursos', component: RecursosComponent },
  {
    path:'',
    redirectTo: 'recursos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursosRoutingModule { }
