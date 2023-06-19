import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { EventModel } from '../../../models/event';
import { EventService } from '../../../administrators/admieventos/services/event.service';
import { Global } from '../../../services/global';
import { MatDialog } from '@angular/material/dialog';
import {
  addDays,
  addHours,
  endOfDay,
  endOfMonth,
  format,
  startOfDay,
  subDays,
} from 'date-fns';
import { DetailEventComponent } from '../detail-event/detail-event.component';
@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit {

  viewDate: Date = new Date();
  viewDate1: Date = new Date();

  view: CalendarView = CalendarView.Month;
  view1: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  public allEvents:EventModel[] = [];
  getEvents(){

    var modelEvent:any[] = [];

    const nromes = this.viewDate.getMonth();
    const gestion = this.viewDate.getFullYear();
    console.log('FECHA_ACTUAL', this.viewDate);
    console.log('NUMERO DE MES', nromes);

    this._eventService.findByMonth({nromes, gestion}).subscribe( async (res: EventModel[]) =>{
      console.log(res);
      this.allEvents = res;
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

    return modelEvent;
  }

  events: CalendarEvent[] = [];

  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;

  public locale: string = 'es';
  public monthEvents:EventModel[] = [];


  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];


  private COLORS = Global.colors;

  // events: CalendarEvent[] = [
  //   {
  //     start: startOfDay(new Date('2023-03-13T04:00:00.000Z')),
  //     end: new Date('2023-03-14T04:00:00.000Z'),
  //     title: 'A 2 day event',
  //     color: this.COLORS.yellow,
  //     actions: this.actions
  //   },
  //   {
  //     start: startOfDay(new Date('2023-03-13T04:00:00.000Z')),
  //     end: new Date('2023-03-14T04:00:00.000Z'),
  //     title: 'A 2 day event',
  //     color: this.COLORS.blue,
  //     actions: this.actions
  //   },
  //   {
  //     start: startOfDay(new Date('2023-03-13T04:00:00.000Z')),
  //     end: new Date('2023-03-14T04:00:00.000Z'),
  //     title: 'A 2 day event',
  //     color: this.COLORS.green,
  //     actions: this.actions
  //   },
  //   // {
  //   //   start: startOfDay(new Date()),
  //   //   title: 'An event with no end date',
  //   //   color: this.COLORS.blue,
  //   //   actions: this.actions
  //   // },
  //   // {
  //   //   start: subDays(endOfMonth(new Date()), 3),
  //   //   end: addDays(endOfMonth(new Date()), 3),
  //   //   title: 'A long event that spans 2 months',
  //   //   color: this.COLORS.blue
  //   // },
  //   // {
  //   //   start: addHours(startOfDay(new Date()), 2),
  //   //   end: new Date(),
  //   //   title: 'A draggable and resizable event',
  //   //   color: this.COLORS.yellow,
  //   //   actions: this.actions,
  //   //   resizable: {
  //   //     beforeStart: true,
  //   //     afterEnd: true
  //   //   },
  //   //   draggable: true
  //   // }
  // ];

  public seeCalendar: boolean = true;
  constructor( private _eventService: EventService, public dialog: MatDialog) {

    this.dayClicked({ date: new Date(), events: [] });
  }

  ngOnInit(): void {
    this.mesInteractivo(new Date());
    this.setCalendar();
  }

  setCalendar(){
    this.events = this.getEvents();
    this.refresh.next();
  }

  mesInteractivo(viewDate: Date){
    let nromes = viewDate.getMonth();
    let gestion = viewDate.getFullYear();
    console.log('fecha --> ', viewDate);

    this._eventService.findByMonth({nromes, gestion}).subscribe( async res =>{
      this.monthEvents = await res;
      console.log(res);
    });
  }

  changeStatusCalendar(): void{
    this.seeCalendar = this.seeCalendar?false:true;
    console.log(this.seeCalendar);

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date, events);
    if(events.length == 0){
      this.getEvents();
    }
    this.refresh.next();
    // if (isSameMonth(date, this.viewDate)) {
    //   if (
    //     (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
    //     events.length === 0
    //   ) {
    //     this.activeDayIsOpen = false;
    //   } else {
    //     this.activeDayIsOpen = true;
    //   }
    //   this.viewDate = date;
    // }
  }

  setView(view: CalendarView) {
    console.log(view);
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('action', action);
    console.log('event', event);
    this.openDialog('3000ms', '1500ms', event)
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, event: any): void {

    const parametros = {width: '90vw',
    enterAnimationDuration,
    exitAnimationDuration,
    data: event
    };

    this.dialog.open(DetailEventComponent, parametros );
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
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

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: "smooth"});
  }
}
