import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pastor } from '../../../../models/pastor';
import { Global } from '../../../../services/global';
import { PastorService } from '../../../admipastores/services/pastor.service';
import Swal from 'sweetalert2';
import { ImageService } from '../../../../services/image.service';
import { IglesiaService } from '../services/iglesia.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeService } from '../../../../services/change.service';
import { firstValueFrom } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-iglesia',
  templateUrl: './create-iglesia.component.html',
  styleUrls: ['./create-iglesia.component.scss']
})
export class CreateIglesiaComponent implements OnInit {

  public form: FormGroup;
  public IGLESIAS: string[] = Global.IGLESIAS;
  public ZONAS: string[] = Global.ZONAS;
  public DAYS: string[] = Global.DIAS;
  public PASTORES: Pastor[] = [];

  startDate = new Date(1990, 0, 1);
  files: File[] = [];
  file: File;

  constructor( private fb: FormBuilder,
               private _iglesiaService: IglesiaService,
               private _pastorService: PastorService,
               private _serviceImage: ImageService,
               private toastr: ToastrService,
               private _changeService: ChangeService,
               public _location: Location ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getPastores();
  }

  changeState(){
    this._changeService.toggle();
  }

  createForm(): void{
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
    if(this.checkForm() && this.file!=undefined){
      this.popUpValidForm();
    }
    else{
      this.popUpInvalidForm();
    }
  }

  popUpValidForm(){
    Swal.fire({
      title: 'Esta seguro de añadir la Iglesia?',
      showDenyButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.crearIglesia();
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  popUpInvalidForm(){
    this.showError('formulario no valido');
  }

  async crearIglesia(){
    let timerInterval: any;
    Swal.fire({
      title: 'Añadiendo iglesia',
      html: `Cerrando en <b></b> milisegundos.`,
      timer: 10000,
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
        this.changeState();
      }
    });
    const igle = this.form.value;
    try
    {
      if( this.file != null ){
      await firstValueFrom(this._iglesiaService.create( igle ))
      .then((value) => {
        console.log(value);
        this.asociarImagen(value.id);

        }).catch((err)=>{
          console.log('ERROR AL AÑADIR IGLESIA');
          console.log(err);
          this.showError('no se pudo añadir la iglesia');
        });
      }
      else{
      console.log('ES NECESARIO LA IMAGEN');
      this.showError('es necesario la imagen de iglesia');
      }
    }
    catch(Error)
    {
      console.log('ERROR AL AÑADIR PASTOR');
      console.error(Error);
      this.showError('hubo un problema al añadir iglesia');
    }
  }

  getAgeFundation(): void{
    console.log(this.form.value.fundacion);
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    if(this.files.length > 1){ // checking if files array has more than one content
      this.replaceFileImage(); // replace file
      }
      this.file = this.files[0];

      var fileSize = this.file.size,
      mb = 1048576,
      final = fileSize / mb;

      if( Number(final) > 5  ) {
        console.log('THIS FILE IS SO WEIGHT');
        this.files.pop();
        this.showErrorSizeImage(final.toFixed(2));
      }
      console.log('final', Number(final)<5);
      console.log(this.file);
  }

  replaceFileImage(){
    this.files.splice(0,1); // index =0 , remove_count = 1
  }

  showErrorSizeImage( size: string): void{
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: size+ ' mb',
      text: "Imagen demasiado grande",
      footer: 'La imagen debe ser menor a 5mb',
      showConfirmButton: false,
      timer: 2500
    })
  }

  onRemove(event:any): void {
    this.files.pop();
  }

  getPastores(){
    this._pastorService.getAll().subscribe( (res: any) => {
      console.log(res);
      this.PASTORES = res;
      this.PASTORES.sort(
        function (a, b) {
          if (a.name < b.name)
              return -1;
          else if (a.name > b.name)
              return 1;
          else
              return 0;
      });
    });
  }

  showError( message: string ){
    this.toastr.error( message, 'Error', {
      positionClass: 'toast-bottom-left'
    });
  }


  async asociarImagen( idadjunto: number ){
    let formData = new FormData();
    formData.append("image", this.file, this.file['name']);
    formData.append("idAsociado", idadjunto.toString() );
    console.log(this.file['name']);
    await firstValueFrom(this._serviceImage.createImage( formData ))
    .then((value) => {
      console.log(value);
      Swal.close();
      this.refresh();
      this.changeState();
      this.getImage(value.newImagen.idAsosiado);
    })
    .catch((err)=>{
      console.log('ERROR AL GUARDAR IMAGEN');
      console.log(err);
    });
  }

  refresh(): void {
    window.location.reload();
		// this.router.navigateByUrl("/auth/administrador/admi-iglesias", { skipLocationChange: true }).then(() => {
		// console.log(decodeURI(this._location.path()));
		// this.router.navigate([decodeURI(this._location.path())]);
		// });
	}

  async getImage(id:number){
    await firstValueFrom(this._serviceImage.get( id ))
    .then((value) => {
      console.log(value);
    })
    .catch((err)=>{
      console.log('ERROR AL OBTENER IMAGEN');
      console.log(err);
    });
  }
}
