import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { EventService } from '../../../administrators/admieventos/services/event.service';
import { EventModel } from '../../../models/event';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss']
})
export class DetailEventComponent implements OnInit {

  public evento: EventModel = new EventModel();
  public ENCARGADOS: string[] = [];
  private start: string = '';

  private clock: any;
  private now: any;
  private TIMER = timer(0, 1000);

  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;

  end: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;

  public hasFinished = false;
  public REALIZADO = 'REALIZADO'.split('');

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.evento = data;
    console.log(data);
    const timeBegin = data.tipofecha == 'VARIOS DÍAS'?data.horaini:data.fechasingle;
    let res = new Date(timeBegin);
    res.setDate(res.getDate() + 1);
    if( res.getDate() < new Date().getDate() ) {
      console.log('ES MENOR');
      this.timerStarting(res);
      this.hasFinished = false;
    }else{
      console.log('ES mayor');
      this.hasFinished = true;
    }

    if( data.encargado ){
      this.ENCARGADOS = data.encargado.split(',');
    }
  }

  ngOnInit(): void {
  }

  timerStarting( timeBegin: Date ):void{
    this.clock = this.TIMER.subscribe(t => {
      this.now = new Date();
      const localTime = timeBegin;
      const fecha_nueva = localTime + "T04:00:00.000Z";
      this.end = new Date(timeBegin);
      // this.end = new Date('01/01/' + (this.now.getFullYear() + 1) +' 00:00');
      this.showDate();
    });
  }

  showDate(){
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
  }


  // getEvento( id: any ) {
  //   this._eventService.get(id).subscribe( res => {
  //     this.evento = res;
  //     this.ENCARGADOS = this.evento.encargado.split(',');
  //     console.log(res);

  //     var fecha_tope: any = '';
  //     if( this.evento.tipofecha == 'Solo un día' ){
  //       fecha_tope = this.evento.fecha;
  //       const ver_fecha = moment(fecha_tope)
  //       if( ver_fecha.isBefore(moment()) ){
  //         console.log('ESTE EVENTO YA PASO');
  //         this.hasFinished = true;
  //       }
  //     }else{
  //       fecha_tope = this.evento.fechafin;
  //       const ver_fecha2 = moment(fecha_tope)
  //       if( ver_fecha2.isBefore(moment()) ){
  //         console.log('ESTE EVENTO YA PASO');
  //         this.hasFinished = true;
  //       }
  //     }

  //     this.iniciarContador(fecha_tope);
  //   })
  // }



  // iniciarContador( fecha_tope: any ){
  //   this.clock = this.source.subscribe(t => {
  //     this.now = new Date();
  //     console.log(this.evento.fechaini);
  //     var localTime = moment(fecha_tope).add(1, 'days').format('YYYY-MM-DD');
  //     const fecha_nueva = localTime + "T04:00:00.000Z";
  //     this.end = new Date(fecha_nueva);
  //     // this.end = new Date('01/01/' + (this.now.getFullYear() + 1) +' 00:00');
  //     this.showDate();
  //   });
  // }


  ngOnDestroy() {
    if ( this.TIMER ) {
      this.clock.unsubscribe()
    }
  }

}
