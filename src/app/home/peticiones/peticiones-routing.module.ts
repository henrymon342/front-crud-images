import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeticionesComponent } from './peticiones.component';
import { CreatePeticionComponent } from './create-peticion/create-peticion.component';
import { ListPeticionComponent } from './list-peticion/list-peticion.component';

const routes: Routes = [
  {
    path: '',
    component: PeticionesComponent,
    children: [
      {
        path: 'create-peticion', component: CreatePeticionComponent
      },
      {
        path: 'list-peticion', component: ListPeticionComponent
      },
      {
        path:'',
        redirectTo: 'create-peticion',
        pathMatch: 'full'
      }
    ],

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeticionesRoutingModule { }
