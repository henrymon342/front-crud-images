import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmiiglesiasComponent } from './admiiglesias.component';
import { MainListIglesiaComponent } from './main-list-iglesia/main-list-iglesia.component';
import { ListIglesiaComponent } from './list-iglesia/list-iglesia.component';
import { CreateIglesiaComponent } from './create-iglesia/create-iglesia.component';
import { DetailIglesiaComponent } from './detail-iglesia/detail-iglesia.component';
import { UpdateIglesiaComponent } from './update-iglesia/update-iglesia.component';

const routes: Routes = [
  {
    path: '',
    component: AdmiiglesiasComponent,
    children: [
      {
        path: 'main-list',
        component: MainListIglesiaComponent
      },
      {
        path: 'list-iglesia',
        component: ListIglesiaComponent
      },
      {
        path: 'create-iglesia',
        component: CreateIglesiaComponent
      },
      {
        path: 'detail-iglesia/:id',
        component: DetailIglesiaComponent
      },
      {
        path: 'update-iglesia/:id',
        component: UpdateIglesiaComponent
      },
      { path: '', redirectTo: 'main-list', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmiiglesiasRoutingModule { }
