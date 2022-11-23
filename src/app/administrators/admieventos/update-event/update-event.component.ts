import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../services/event.service';
import { EventModel } from '../../../models/event';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {

  form: FormGroup;
  ShowError: boolean = false;
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

    evento: EventModel = new EventModel();

    constructor( private toastr: ToastrService,
                 private _service_event: EventService,
                 private fb: FormBuilder,
                 private route: ActivatedRoute,
                 ) {
                   this.createForm();
                 }

  ngOnInit(): void {
    this.getEvento();
  }

  getEvento(){
    const param = this.route.snapshot.params;
    this.evento.id = param['id'];
    console.log(this.evento);
    this._service_event.get(this.evento.id!).subscribe( (data: EventModel) => {
      console.log(data);
      this.evento = data;
      this.form.controls['ministerio'].setValue(data.ministerio);
      this.form.controls['titulo'].setValue(data.titulo);
      this.form.controls['modalidad'].setValue(data.modalidad);

      console.log('MODALIDAD', data.modalidad);
      this.form.controls['optionplace'].setValue(data.optionplace);
      this.form.controls['place'].setValue(data.place);

      this.form.controls['tipofecha'].setValue(data.tipofecha);
      if(data.tipofecha == 'UN DÍA'){
        this.form.controls['fechasingle'].setValue(data.fechasingle);
      }else{
        this.form.controls['fechaini'].setValue(data.fechaini);
        this.form.controls['fechafin'].setValue(data.fechafin!);
      }

      this.form.controls['horaini'].setValue(new Date(data.horaini));
      this.form.controls['horafin'].setValue(new Date(data.horafin!));

      this.form.controls['descripcion'].setValue(data.descripcion);

      const encarga2 = data.encargado?.split(',');
      console.log(encarga2);
      encarga2?.forEach((element:any) => {
        this.encargados.push(element);
      });
    })
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
    this.form.errors ? this.ShowError=true:this.ShowError=false;

    console.log('form: ', this.form.value);
    if( this.form.valid ){
      console.log('ES VALIDO');
      return true;
    }else{
      console.log('NO!, ES VALIDO');
      // this.error_text = this.form.errors!['message']
      console.log(this.form.errors!['message']);
      return false;
    }
  }

  showError(){
    this.toastr.error('No valido!', 'Formulario', {
      positionClass: 'toast-bottom-left'
   });
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


  alertCheckForm(): void {
    if( this.encargados.length ){
      this.form.controls['encargado'].setValue(this.encargados.toString());
    }
    if( this.form.valid ){
      console.log(this.form.value);
      this.updateEvent();
    }else{
      this.showError();
    }
  }

  updateEvent(): void {
    this._service_event.update(this.evento.id!, this.form.value).subscribe( res =>{
      console.log(res);
    })

    let timerInterval: any;
    Swal.fire({
      title: 'Editando Evento!',
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
        this.toastr.success('Satisfactoriamente!', 'Evento Editado');
        console.log('I was closed by the timer')
      }
    })


  }

}
