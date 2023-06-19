import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserGuard } from '../guards/user.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'administrador',
    loadChildren: () => import('../administrators/administrator/administrator.module').then(m => m.AdministratorModule),
    canActivate: [ UserGuard ]
  },
  {
    path: 'admipastores',
    loadChildren: () => import('../administrators/admipastores/admipastores.module').then(m => m.AdmipastoresModule),
    canActivate: [ UserGuard ]
  },
  {
    path: 'admieventos',
    loadChildren: () => import('../administrators/admieventos/admieventos.module').then(m => m.AdmieventosModule),
    canActivate: [ UserGuard ]

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'',
    redirectTo: 'administrador',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
