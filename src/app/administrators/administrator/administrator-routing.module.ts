import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator.component';

const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent
  },
  {
    path: 'admi-usuarios',
    loadChildren: () => import('./admiusuarios/admiusuarios.module').then(m => m.AdmiusuariosModule)
  },
  {
    path: 'admi-iglesias',
    loadChildren: () => import('./admiiglesias/admiiglesias.module').then(m => m.AdmiiglesiasModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
