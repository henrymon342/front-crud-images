import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // {
  //   path: 'iglesias',
  //   loadChildren: () => import('./components/iglesias/iglesias.module').then(m => m.IglesiasModule)
  // },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  // {
  //   path: 'ministerios',
  //   loadChildren: () => import('./components/ministerios/ministerios.module').then(m => m.MinisteriosModule)
  // },
  // {
  //   path: 'ministerios',
  //   loadChildren: () => import('./components/ministerios/ministerios.module').then(m => m.MinisteriosModule)
  // },
  {
    path:'',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
