import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../services/event.service';
import Swal from 'sweetalert2';
import { DialogService } from '../../administrator/admiusuarios/services/dialog.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  form: FormGroup;
  MINISTERIOS: string[] = ['JNI', 'MNI', 'DNI'];
  MODALIDADES = ['PRESENCIAL', 'VIRTUAL'];
  LUGARES = ['ALGUNA IGLESIA', 'OTRO LUGAR'];
  PLATAFORMAS = ['ZOOM', 'MEET', 'DISCORD', 'MICROSOFT TEAMS', 'OTRO'];
  IGLESIAS: string[] = [
    'CALLIRPA', 'CHAPICHAPINI', 'ROSAPATAYARIBAY', 'TOMATA', 'TOPOHOCO', 'TUMARAPI',// ZONA ANDINA PACAJES
    'CAQUIAVIRI', 'COLQUE ALTA', 'CHIPANAMAYA', 'LLIMPHI', 'LACALACA', 'LAURA AFETUNI', // ZONA CAQUIAVIRI
    'BAJO PANPAHASI', 'BUENOS AIRES', 'CENTRAL LA PAZ', 'EL BUEN PASTOR', 'KOINONIA', 'LA PORTADA',
    'MEMORIAL WINCHESTER', 'MIRAFLORES', 'MUNAYPATA', 'PASANKERI', 'VILLA FÁTIMA', 'ESCOBAR URIA',
    'PLAYA VERDE', 'SOPOCACHI BAJO', 'CHINCHAYA', 'CIUDADELA FERROVIARIA', // ZONA NORTE
    'ARANJUEZ', 'AVIRCATO', 'BELLA VISTA', 'CODAVISA', 'COTA COTA', '23 DE MARZO', 'MARQUIRIVI', // ZONA SUR
    'ANTARANI', 'BOTIJLACA', 'CANTUYO', 'COMANCHE', 'KELLAKELLA BAJA', 'JEKERI', 'ROSAPATA DE TULI', 'KELLAKELLA ALTA', // ZONA COMANCHE
    'CHULLUNKHAYANI', 'CONIRI', 'HILATA SAN JORGE', 'IRPUMA', 'VIACHA', 'COLQUENCHA', ' NUEVA TILATA 3',
    'TONCOPUJIO', 'MARISCAL SANTA CRUZ', // ZONA VIACHA
    'COHONI', 'TACACHÍA', 'QUILIHUAYA', // ZONA ILLIMANI
    'CALARI', 'COROCORO', 'GENERAL PANDO', 'PUTUNI', 'TUPALTUPA', 'TOTORANI', 'SICUIPATA', // ZONA MINERA
    'CALASAYA', 'CRUCERO', 'PATACAMAYA', 'CALTECA', 'CALACACHI', 'TOLOMA', // ZONA PATACAMAYA TAMBO QUEMADO
    'FE EN CRISTO', 'FILADELFIA', 'NUEVA VIDA', 'SHADDAI', 'LEUQUE', 'ALTO MUNAYPATA', 'IROCOTA'
    ];
    TIPOSFECHA = ['UN DÍA', 'VARIOS DÍAS']

    nuevo_encargado: string;
    encargados: string[] = [];
    closeDialog: boolean = false;

  constructor( private fb: FormBuilder,
               private toastr: ToastrService,
               private _service_event: EventService,
               private _serviceDialog: DialogService,
               public _router: Router,
               public _location: Location) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void{
    this.form = this.fb.group({
      ministerio: ['JNI', [Validators.required]],
      titulo: ['', [Validators.required]],
      modalidad: ['PRESENCIAL', [Validators.required]],
      optionplace: ['', [Validators.required]],
      place: ['', [Validators.required]],
      tipofecha: ['UN DÍA', [Validators.required]],
      fechasingle: [''],
      fechaini: [''],
      fechafin: [''],
      horaini: ['', [Validators.required]],
      horafin: [''],
      descripcion: ['', [Validators.required]],
      encargado: [''],
    })
  }

  checkForm(): boolean{
    console.log('form: ', this.form.value);
    if( this.form.valid ){
      console.log('ES VALIDO');
      return true;
    }else{
      console.log('NO!, ES VALIDO');
      return false;
    }
  }


  alertCheckForm(): void {
    console.log(this.closeDialog);
    if( this.encargados.length ){
      this.form.controls['encargado'].setValue(this.encargados.toString());
    }
    if( this.form.valid ){
      console.log(this.form.value);
      this.createEvent();
    }else{
      this.showError();
    }
  }

  createEvent(): void {
    let timerInterval: any;
    Swal.fire({
      title: 'Creando Evento!',
      html: `Cerrando en <b></b> milisegundos.`,
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {

        Swal.showLoading()
        let b = Swal.getHtmlContainer()!.querySelector('b')
        timerInterval = setInterval(() => {
          b!.textContent = String(Swal.getTimerLeft())
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
    this._service_event.createEvent(this.form.value).subscribe( async (res) =>{
      console.log(res);
      await this.showSuccess();
    })


  }

  async showSuccess() {
    this.toastr.success('Satisfactoriamente!', 'Usuario creado');
    //////////////
    this.closeDialog = true;
    this._serviceDialog.setPersona(true);
    window.location.reload();

  }

  adEncargado(){
    if( this.nuevo_encargado == '' ){
      return;
    }
    this.encargados.push(this.nuevo_encargado);
    this.nuevo_encargado = '';
    this.form.value.encargado = this.encargados;
  }

  borrarItemEncargado( index: number){
    var arr_nuevo:any = [];
    for (let i = 0; i < this.encargados.length; i++) {
      if( i != index ){
        arr_nuevo.push(this.encargados[i])
      }
    }
    this.encargados = arr_nuevo;
    this.form.value.encargado = this.encargados;
  }

  choseVirtualMode(){
    const virtual = this.form.value.optionplace
    console.log( this.form.value.optionplace);
    if( virtual == 'ZOOM' || virtual == 'MEET' || virtual == 'DISCORD' || virtual == 'MICROSOFT TEAMS' ){
      this.form.controls['place'].setValue( virtual );
    }else{
      this.form.controls['place'].setValue('');
    }
    this.checkForm();
  }


  typeDateChange(event: any): void{
    console.log(event);
    if( event == 'UN DÍA'){
      this.form.get('fechasingle')?.addValidators(Validators.required);
      this.form.get('fechaini')?.clearValidators();
    }else{
      this.form.get('fechaini')?.addValidators(Validators.required);
      this.form.get('fechasingle')?.clearValidators();
    }
  }

  showError(){
    this.toastr.error('No valido!', 'Formulario', {
      positionClass: 'toast-bottom-left'
   });
   this.closeDialog = false;
  }
}
