import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pastor } from '../../../../models/pastor';
@Component({
  selector: 'app-create-iglesia',
  templateUrl: './create-iglesia.component.html',
  styleUrls: ['./create-iglesia.component.scss']
})
export class CreateIglesiaComponent implements OnInit {

  public form: FormGroup;
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
  ZONAS: string[] = ['CIUDAD NORTE', 'CIUDAD CENTRAL', 'CIUDAD SUR', 'MINERA', 'VIACHA', 'ZONA PACAJES', 'COMANCHE', 'TAMBO QUEMADO', 'CAQUIAVIRI', 'SUCRE']
  DAYS: string[] = ['SABADO', 'DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
  PASTORES: Pastor[] = [];

  constructor( private fb: FormBuilder ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(){
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      idPastor: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      fundacion: ['', [Validators.required]],
      superdni: ['', [Validators.required]],
      presimni: ['', [Validators.required]],
      presijni: ['', [Validators.required]],
      diacentral: ['', [Validators.required]],
      horacentralini: ['', [Validators.required]],
      horacentralfin: ['', [Validators.required]],
      diajni: ['', [Validators.required]],
      horajniini: ['', [Validators.required]],
      horajnifin: ['', [Validators.required]],
      zona: ['', [Validators.required]],

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

  alertCheckForm(){
    console.log(this.form.value);
  }
}
