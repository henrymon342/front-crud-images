import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { EventService } from '../../../administrators/admieventos/services/event.service';
import { EventModel } from '../../../models/event';
import { Global } from '../../../services/global';
import { MatDialog } from '@angular/material/dialog';
import { DetailEventComponent } from '../detail-event/detail-event.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

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

  constructor( private _eventService: EventService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }


  asignarColor(){
    if( this.evento.ministerio == 'JNI' ){
      return { 'background-image': "linear-gradient(0deg, rgba(254,208,73) 0%, rgba(254,208,73) 100%)" };
    }
    if( this.evento.ministerio == 'MNI' ){
      return { 'background-image': "linear-gradient(0deg, rgb(31, 138, 112) 0%,  rgb(31, 138, 112) 100%)" };
    }
    if( this.evento.ministerio == 'DNI' ){
    return { 'background-image': "linear-gradient(0deg, rgb(0, 66, 90) 0%, rgb(0, 66, 90) 100%)" };
    }
    return { 'background-image': "linear-gradient(0deg, rgb(155, 25, 51) 0%, rgb(255, 45, 87) 100%)" };
  }


  seeDetail(evento: EventModel): void{
    console.log(evento);
    this.openDialog('3000ms', '1500ms', evento)
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, evento: EventModel): void {
    const parametros = {
      width: '90vw',
      enterAnimationDuration,
      exitAnimationDuration,
      data: evento,
      panelClass: 'dialog',
      maxHeight: '90vh'
    };
    this.dialog.open(DetailEventComponent, parametros );
  }
}
