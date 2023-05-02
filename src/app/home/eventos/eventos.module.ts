import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEventsComponent } from './list-events/list-events.component';
import { DetailEventComponent } from './detail-event/detail-event.component';
import { EventosComponent } from './eventos.component';
import { EventosRoutingModule } from './eventos-routing.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';
import { MatIconModule } from '@angular/material/icon';
import { EventComponent } from './event/event.component';
import { CalendarComponent } from './calendar/calendar.component';


registerLocaleData(localeFr);
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    ListEventsComponent,
    DetailEventComponent,
    EventosComponent,
    EventComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    EventosRoutingModule,
    MatIconModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ]
})
export class EventosModule { }
