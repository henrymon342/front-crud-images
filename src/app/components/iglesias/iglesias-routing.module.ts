import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaIglesiasComponent } from './lista-iglesias/lista-iglesias.component';
import { DetalleIglesiaComponent } from './detalle-iglesia/detalle-iglesia.component';

const routes: Routes = [
  { path: 'lista-iglesias', component: ListaIglesiasComponent },
  { path: 'detalle-iglesia', component: DetalleIglesiaComponent },
  {
    path:'',
    redirectTo: 'lista-iglesias',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IglesiasRoutingModule { }
