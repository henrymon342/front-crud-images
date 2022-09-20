import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmiusuariosComponent } from './admiusuarios.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserEventComponent } from './list-user-event/list-user-event.component';
import { ListUserPastorComponent } from './list-user-pastor/list-user-pastor.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  {
    path: '',
    component: AdmiusuariosComponent,
    children: [
      {
        path: 'user-event-list',
        component: ListUserEventComponent
      },
      {
        path: 'user-pastor-list',
        component: ListUserPastorComponent
      },
      {
        path: 'user-detail',
        component: DetailUserComponent
      },
      {
        path: 'user-update',
        component: UpdateUserComponent
      },
      {
        path: 'user-create',
        component: CreateUserComponent
      },
      { path: '', redirectTo: 'user-event-list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmiusuariosRoutingModule { }
