import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LoginComponent
  // },
  {
    path: 'administrador',
    loadChildren: () => import('../administrators/administrator/administrator.module').then(m => m.AdministratorModule)
  },
  {
    path: 'admipastores',
    loadChildren: () => import('../administrators/admipastores/admipastores.module').then(m => m.AdmipastoresModule)
  },
  {
    path: 'admieventos',
    loadChildren: () => import('../administrators/admieventos/admieventos.module').then(m => m.AdmieventosModule)
  },
  {
    path:'',
    redirectTo: 'admieventos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
