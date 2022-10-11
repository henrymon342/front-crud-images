import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmieventosComponent } from './admieventos.component';
import { MainListsComponent } from '../admieventos/main-lists/main-lists.component'
import { ListEventDniComponent } from './list-event-dni/list-event-dni.component';
import { ListEventMniComponent } from './list-event-mni/list-event-mni.component';
import { ListEventJniComponent } from './list-event-jni/list-event-jni.component';
import { DetailEventComponent } from './detail-event/detail-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { CreateEventComponent } from './create-event/create-event.component';
const routes: Routes = [
  {
    path: '',
    component: AdmieventosComponent,
    children: [
      {
        path: 'main-lists',
        component: MainListsComponent
      },
      {
        path: 'dni-event-list',
        component: ListEventDniComponent
      },
      {
        path: 'mni-event-list',
        component: ListEventMniComponent
      },
      {
        path: 'jni-event-list',
        component: ListEventJniComponent
      },
      {
        path: 'event-detail/:id',
        component: DetailEventComponent
      },
      {
        path: 'event-update/:id',
        component: UpdateEventComponent
      },
      {
        path: 'pastor-create',
        component: CreateEventComponent
      },
      { path: '', redirectTo: 'main-lists', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmieventosRoutingModule { }
