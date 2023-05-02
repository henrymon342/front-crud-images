import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEventsComponent } from './list-events/list-events.component';
import { DetailEventComponent } from './detail-event/detail-event.component';
import { EventosComponent } from './eventos.component';

const routes: Routes = [
  { path: 'list-events', component: ListEventsComponent },
  { path: 'detail-event', component: DetailEventComponent },
  { path: 'event', component: EventosComponent },
  {
    path:'',
    redirectTo: 'list-events',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
