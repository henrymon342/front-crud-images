import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  TYPEUSER: string[] = ['ACTIVIDADES', 'PASTORES'];
  MINISTERIOS: string[] = ['JNI', 'MNI', 'DNI'];
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
    PLACES_MEMB: string[] = ['IGLESIA', 'OTRO'];

  form: FormGroup;
  place_choosed: string;
  error_text = '';

  closeDialog: boolean = false;
  conter: number = 0;
  constructor( private fb: FormBuilder,
               private _service_user:UserService,
               private toastr: ToastrService,
               private _serviceDialog: DialogService ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void{
    this.form = this.fb.group({
      type: ['ACTIVIDADES', [Validators.required]],
      ministerio: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      option_places_memb: ['IGLESIA', [Validators.required]], // esta variable es auxiliar
      miembroen: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirm: ['', [Validators.required]],

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


  clearOtherInput(){
    this.form.controls['miembroen'].setValue('');
  }

  changeValueMinistery(){
    if( this.form.value.type == 'PASTORES' ){
      this.form.controls['ministerio'].setValue(' ');
    }else{
      this.form.controls['ministerio'].setValue('');
    }
    this.checkForm();
  }

  validarentrada( entrada: any ){
    return this.error_text.includes('username')?true:false;
  }

  alertCheckForm(){
    console.log(this.closeDialog);

    if(this.checkForm()){
      this.popUpValidForm();

    }
    else{
      this.popUpInvalidForm();

    }
  }


  popUpValidForm(){

    Swal.fire({
      title: 'Esta seguro de crear un nuevo administrador?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.crearUsuario();

      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  popUpInvalidForm(){
    this.showError();
  }


  crearUsuario(){
    let timerInterval: any;
    Swal.fire({
      title: 'Creando Usuario!',
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

    this._service_user.createUser(this.form.value).subscribe( res => {
      console.log(res);
      this.showSuccess();
    })
  }

  showSuccess() {
    this.toastr.success('Satisfactoriamente!', 'Usuario creado');
    //////////////
    this.closeDialog = true;
    this._serviceDialog.setPersona(this.closeDialog)
  }

  showError(){
    this.toastr.error('No valido!', 'Formulario', {
      positionClass: 'toast-bottom-left'
   });
   this.closeDialog = false;
  //  this._serviceDialog.setPersona(this.closeDialog)
  }
}
