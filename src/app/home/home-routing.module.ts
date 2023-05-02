import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecursosComponent } from './recursos/recursos.component';
import { EnquecreemosComponent } from './enquecreemos/enquecreemos.component';
import { PeticionesComponent } from './peticiones/peticiones.component';
import { MinisteriosComponent } from './ministerios/ministerios.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      // {
      //   path: 'ministerios',
      //   loadChildren: () => import('../components/ministerios/ministerios.module').then(m => m.MinisteriosModule)
      // },
      {
        path: 'iglesias',
        loadChildren: () => import('../components/iglesias/iglesias.module').then(m => m.IglesiasModule)
      },
      {
        path: 'eventos',
        loadChildren: () => import('../home/eventos/eventos.module').then(m => m.EventosModule)
      },
      {
        path: 'ministerios',
        loadChildren: () => import('../home/ministerios/ministerios.module').then(m => m.MinisteriosModule)
      },
      {
        path: 'recursos', component: RecursosComponent
      },
      {
        path: 'enquecreemos', component: EnquecreemosComponent
      },
      {
        path: 'peticiones',
        loadChildren: () => import('../home/peticiones/peticiones.module').then(m => m.PeticionesModule)
      },
      // {
      //   path: 'peticiones', component: PeticionesComponent
      // },
      // {
      //   path: 'ministerios', component: MinisteriosComponent
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
