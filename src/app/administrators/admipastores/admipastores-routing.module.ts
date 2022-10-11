import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmipastoresComponent } from './admipastores.component';
import { MainListsComponent } from './main-lists/main-lists.component';
import { ListPastorDistritalComponent } from './list-pastor-distrital/list-pastor-distrital.component';
import { ListPastorLocalComponent } from './list-pastor-local/list-pastor-local.component';
import { ListPastorPresbiteroComponent } from './list-pastor-presbitero/list-pastor-presbitero.component';
import { CreatePastorComponent } from './create-pastor/create-pastor.component';
import { UpdatePastorComponent } from './update-pastor/update-pastor.component';
import { DetailPastorComponent } from './detail-pastor/detail-pastor.component';
import { RecordPastorComponent } from './record/record-pastor/record-pastor.component';
import { UpdateRecordPastorComponent } from './record/update-record-pastor/update-record-pastor.component';
import { CreateRecordPastorComponent } from './record/create-record-pastor/create-record-pastor.component';

const routes: Routes = [
  {
    path: '',
    component: AdmipastoresComponent,
    children: [
      {
        path: 'main-lists',
        component: MainListsComponent
      },
      {
        path: 'distrital-pastor-list',
        component: ListPastorDistritalComponent
      },
      {
        path: 'local-pastor-list',
        component: ListPastorLocalComponent
      },
      {
        path: 'presbitero-pastor-list',
        component: ListPastorPresbiteroComponent
      },
      {
        path: 'pastor-detail/:id',
        component: DetailPastorComponent
      },
      {
        path: 'pastor-update/:id',
        component: UpdatePastorComponent
      },
      {
        path: 'pastor-create',
        component: CreatePastorComponent
      },
      {
        path: 'record-pastor',
        component: RecordPastorComponent
      },
      {
        path: 'create-record-pastor/:id',
        component: CreateRecordPastorComponent
      },
      {
        path: 'update-record-pastor/:id',
        component: UpdateRecordPastorComponent
      },
      { path: '', redirectTo: 'main-lists', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmipastoresRoutingModule { }
