import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { endOfDay, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject } from 'rxjs';
import { EventService } from '../../../administrators/admieventos/services/event.service';
import { EventModel } from '../../../models/event';
import { Global } from '../../../services/global';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() evento: EventModel;
  public hasFinished: boolean = false;

  public COLORS = Global.colors;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  eventos: CalendarEvent[] = [];
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;
  public allEvents:EventModel[] = [];

  public locale: string = 'es';
  constructor( private _eventService: EventService ) {
  }

  ngOnInit(): void {
    const date = new Date();
    this.getEventbyMonth(date);
    // this.getEvents();

  }

  getEventbyMonth( fecha: Date):void {
    console.log(fecha.getFullYear());
    console.log(fecha.getMonth());
    const nromes = fecha.getMonth();
    const gestion = fecha.getFullYear();
    this._eventService.findByMonth({ nromes, gestion }).subscribe( (res: EventModel[]) =>{
      console.log(res);
      this.allEvents = res as EventModel[];
      this.allEvents.forEach( evento => {
        let colorEvent = this.getMinisteryColor(evento);
        let objetofechas = this.getDatesEvents(evento);
        console.log('COLOR', colorEvent);
        console.log('OBJETO FECHAS', objetofechas);
        const obj = objetofechas['end'] || {};
        this.eventos = [

          {
            id: evento.id,
            start: startOfDay(new Date(objetofechas['start'])),
            end: endOfDay(new Date(obj)),
            title: evento.titulo,
            color: colorEvent,
            allDay: true,
            meta: evento.id,
            resizable: {
              beforeStart: true,
              afterEnd: true
            }
          }
        ];
      });
    })
  }

  getDatesEvents( evento: EventModel ):{}{
    if( evento.tipofecha == 'VARIOS DÍAS' ){
      return { start: startOfDay(new Date(evento.fechaini!)), end: endOfDay(new Date(evento.fechafin!)) };
    }else{
      return { start: startOfDay(new Date(evento.fechaini!)) };
    }
  }

  getMinisteryColor(evento: EventModel): any {
    switch ( evento.ministerio ) {
      case 'JNI':
        return this.COLORS.orange;
      case 'MNI':
        return this.COLORS.green;
      case 'DNI':
        return this.COLORS.blue;
      default:
        return '';
    }
  }

  closeOpenMonthViewDay():void {
    this.getEventbyMonth(this.viewDate);
  }

  getEvents() {
    console.log('CARGANDO ACTIVIDADES...');

    var modelEvent:any[] = [];
    const nromes = this.viewDate.getMonth();
    const gestion = this.viewDate.getFullYear();
    this._eventService.findByMonth({nromes, gestion}).subscribe( async (res: EventModel[]) =>{
      this.allEvents = res;
      console.log(res);

      this.allEvents.forEach((element: EventModel) => {
        console.log(element);
        //COLORES
        let colorToEvent = '';
        if( element.ministerio == 'JNI' ){
          colorToEvent = this.COLORS.orange;
        }
        if( element.ministerio == 'MNI' ){
          colorToEvent = this.COLORS.green;
        }
        if( element.ministerio == 'DNI' ){
          colorToEvent = this.COLORS.blue;
        }
        // if( element.ministerio == 'externo' ){
        //   colorToEvent = this.COLORS.red;
        // }


        if( element.tipofecha == 'VARIOS DÍAS' ){
          // FECHAS
          console.log('varios dias', element.fechaini);
          console.log('varios dias', element.fechafin);

          const dateIni = new Date(element.fechaini!).toISOString().slice(0, 10);
          const dateFin = new Date(element.fechafin!).toISOString().slice(0, 10);
          console.log('varios dias', dateIni);
          console.log('varios dias', dateFin);

          const fecha_nueva1 = dateIni + "T04:00:00.000Z";
          const fecha_nueva2 = dateFin + "T04:00:00.000Z";

          console.log('varios dias', new Date(fecha_nueva1));
          console.log('varios dias', new Date(fecha_nueva2));


          // var nueva_fecha1 = new Date('2023-03-06T04:00:00.000Z');
          // var nueva_fecha2 = new Date('2023-03-06T04:00:00.000Z');

          modelEvent.push({
            id: element.id,
            start: startOfDay(new Date(fecha_nueva1)),
            end: endOfDay(new Date(fecha_nueva2)),
            title: element.titulo,
            color: colorToEvent,
            allDay: true,
            meta: element.id
          })
        }else{
          const dateIni = new Date(element.fechasingle!).toISOString().slice(0, 10);
          const fecha_nueva1 = dateIni + "T04:00:00.000Z";

          modelEvent.push({
            id: element.id,
            start: startOfDay(new Date(fecha_nueva1)),
            title: element.titulo,
            color: colorToEvent,
            allDay: true,
            meta: element.id
          })
        }
      });
    });
    this.eventos = modelEvent;
    this.refresh.next();
    return modelEvent;

    return [{
      id: 1234,
      start: startOfDay(new Date()),
      title: 'TITULO DE PRUEBA',
      color: this.COLORS.yellow,
      allDay: true
    },
    {
      id: 12312314,
      start: startOfDay(new Date()),
      end: new Date(),
      title: 'PRUEBA ACTIVIDA JNI',
      color: this.COLORS.yellow,
      allDay: true
    },
    {
      id: 124514,
      start: subDays(startOfDay(new Date()), 1),
      title: 'PRUEBA ACTIVIDA MNI',
      color: this.COLORS.green,
      allDay: true
    },
    {
      id: 354634,
      start: subDays(startOfDay(new Date()), 2),
      title: 'PRUEBA ACTIVIDA DNI',
      color: this.COLORS.blue,
      allDay: true
    },  ];
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('action', action);
    console.log('event', event);
    // this.openDialog('3000ms', '1500ms', event)
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {

    this.eventos = this.eventos.map((iEvent) => {
      if (iEvent === event) {
        console.log(event);
        console.log(newStart);
        console.log(newEnd);

        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

}

