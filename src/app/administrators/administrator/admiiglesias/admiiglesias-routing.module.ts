import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmiiglesiasComponent } from './admiiglesias.component';
import { AdmiIglesiaListComponent } from './admi-iglesia-list/admi-iglesia-list.component';
import { AdmiIglesiaDetailComponent } from './admi-iglesia-detail/admi-iglesia-detail.component';
import { AdmiIglesiaUpdateComponent } from './admi-iglesia-update/admi-iglesia-update.component';
import { AdmiIglesiaCreateComponent } from './admi-iglesia-create/admi-iglesia-create.component';

const routes: Routes = [
  {
    path: '',
    component: AdmiiglesiasComponent,
    children: [
      {
        path: 'admi-iglesia-list',
        component: AdmiIglesiaListComponent
      },
      {
        path: 'admi-iglesia-detail',
        component: AdmiIglesiaDetailComponent
      },
      {
        path: 'admi-iglesia-update',
        component: AdmiIglesiaUpdateComponent
      },
      {
        path: 'admi-iglesia-create',
        component: AdmiIglesiaCreateComponent
      },
      { path: '', redirectTo: 'admi-iglesia-list', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmiiglesiasRoutingModule { }
