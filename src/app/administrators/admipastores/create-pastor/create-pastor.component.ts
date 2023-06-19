import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Global } from '../../../services/global';
import { ImageService } from '../../../services/image.service';
import { PastorService } from '../services/pastor.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ChangeService } from '../../../services/change.service';


export interface Son {
  name: string;
  age: number;
  // state: number;
}

const ELEMENT_DATA: Son[] = [];

@Component({
  selector: 'app-create-pastor',
  templateUrl: './create-pastor.component.html',
  styleUrls: ['./create-pastor.component.scss']
})
export class CreatePastorComponent implements OnInit {

  CATEGORIES: string[] = ['LOCAL', 'DISTRITAL', 'PRESBITERO']
  ESTADO_CIVIL: string[] = ['SOLTERO', 'CASADO', 'VIUDO', 'DIVORCIADO'];
  PLACES_MEMB: string[] = ['IGLESIA', 'OTRO'];
  IGLESIAS: string[] = Global.IGLESIAS;

  YEARS = Global.rangeYears();
  AREAS = Global.AREAS;
  form: FormGroup;

  titulosForm = this.fb.group({
    diploma_ministerial: false,
    bachiller_en_teologia: false,
    licenciatura: false,
    maestria: false,
    doctorado: false
  });

  requisitosForm = this.fb.group({
    docs_personales: false,
    carta_recomendacion: false,
    certificado_membresia: false,
    otros: false
  });


  files: File[] = [];
  file: File;

  public isDisabled: boolean = false;

  nuevo_hijo: string;
  hijos: string[] = [];

//////////////////////////

  public formHijos: FormGroup;

  public formEducacion: FormGroup;

  constructor( private fb: FormBuilder,
               private toastr: ToastrService,
               private _servicePastor: PastorService,
               private _serviceImage: ImageService,
               private router:Router,
               public _location: Location,
               private _changeService: ChangeService) {
              }

  ngOnInit(): void {
    console.log(this.IGLESIAS);
    this.createForm();

    this.formHijos = this.fb.group({
      Rows: this.fb.array([this.initRows()])
    });

    this.formEducacion = this.fb.group({
      Rows: this.fb.array([this.initRowsE()])
    });
  }

  ////////////////
  get formArr() {
    return this.formHijos.get("Rows") as FormArray;
  }

  initRows() {
    return this.fb.group({
      name: [""],
      age: [""],
      health: true,
      obs: [""]
    });
  }

  addNewRow() {
    this.formArr.push(this.initRows());
    console.log(this.formHijos.value);

  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  /////////////////////
  get formArrE() {
    return this.formEducacion.get("Rows") as FormArray;
  }

  initRowsE() {
    return this.fb.group({
      nivel: [""],
      nombreinst: [""],
      gestiongraduacion: [""],
      grado: [""]
    });
  }

  addNewRowE() {
    this.formArrE.push(this.initRowsE());
    console.log(this.formEducacion.value);

  }

  deleteRowE(index: number) {
    this.formArrE.removeAt(index);
  }

  changeState(){
    this._changeService.toggle();
  }

  createForm(): void{
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      fecha_nac: ['', [Validators.required]],
      lugar_nac: ['', [Validators.required]],
      estado_civil: ['', [Validators.required]],
      nombre_esposa: ['', [Validators.required]],
      fecha_nac_esposa: ['', [Validators.required]],
      lugar_nac_esposa: ['', [Validators.required]],
      // hijos: ['', [Validators.required]],
      category: ['LOCAL', [Validators.required]],
      year: ['', [Validators.required]],
      dado_en: ['', [Validators.required]],
      area: ['', [Validators.required]],
      membresia: ['', [Validators.required]],
      lugardeministerio: ['', [Validators.required]],
      titulos: [''],
      requisitos: [''],
      data_family: ['', [Validators.required]],
      educacion: [''],
      option_places_memb: ['IGLESIA', [Validators.required]], // esta variable es auxiliar
      option_places_serv: ['IGLESIA', [Validators.required]], // esta variable es auxiliar
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

  changeValueCategory(){
   // hacer algo en caso de categorias
    this.checkForm();
  }

  clearOtherInputMem(){
    //LIMPIAR EL CAMPO CORRESPONDIENTE
    // this.form.controls['miembroen'].setValue('');
  }

  clearOtherInputServ(){
    //LIMPIAR EL CAMPO CORRESPONDIENTE
    // this.form.controls['miembroen'].setValue('');
  }

  alertCheckForm(){
    if( this.form.value.category != 'PRESBITERO' ){
      this.form.controls['requisitos'].setValue(JSON.stringify(this.requisitosForm.value));
    }else{
      this.form.controls['requisitos'].setValue('');
    }

    if( this.form.value.category == 'PRESBITERO' ){
      this.form.controls['titulos'].setValue(JSON.stringify(this.titulosForm.value));
    }else{
      this.form.controls['titulos'].setValue('');
    }

    this.form.controls['data_family'].setValue(JSON.stringify(this.formHijos.value.Rows));
    this.form.controls['educacion'].setValue(JSON.stringify(this.formEducacion.value.Rows));

    console.log(this.form.value);
    console.log(this.file);

    if(this.checkForm() && this.file!=undefined){
      this.popUpValidForm();
    }
    else{
      this.popUpInvalidForm();
    }
  }

  popUpValidForm(){
    Swal.fire({
      title: 'Esta seguro de crear un nuevo Pastor?',
      showDenyButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.isDisabled = true;
        this.crearPastor();
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  popUpInvalidForm(){
    this.showError('formulario no valido');
  }

  async crearPastor(){
    let timerInterval: any;
    Swal.fire({
      title: 'Creando pastor!',
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
    })

    const pas = this.form.value;
    try
    {
       if( this.file != null ){
        await firstValueFrom(this._servicePastor.createPastor( pas ))
        .then((value) => {
          console.log(value);
          this.asociarImagen(value.id);

          }).catch((err)=>{
            console.log('ERROR AL AÑADIR PASTOR');
            console.log(err);
            this.showError('no se pudo añadir pastor');
          });
       }
       else{
        console.log('ES NECESARIO LA IMAGEN');
        this.showError('es necesario la imagen de pastor');
       }

      }
      catch(Error)
      {
        console.log('ERROR AL AÑADIR PASTOR');
        console.error(Error);
        this.showError('hubo un problema al añadir pastor');
      }
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

  // async subirImagenDrop(id: string){
  //   let formData = new FormData();
  //   formData.append("image", this.file, this.file['name']);
  //   formData.append("idAsociado", id);
  //   console.log(this.file['name']);
  //   this._serviceImage.createImage( formData ).subscribe(async res =>{
  //     console.log('LOG OF IMAGE UPLOAD', await res );
  //   })
  // }

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
		this.router.navigateByUrl("/auth/admipastores/main-lists", { skipLocationChange: true }).then(() => {
		this.router.navigate([decodeURI(this._location.path())]);
		});
    window.location.reload();
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

  // showSuccess() {
  //   this.toastr.success('Satisfactoriamente!', 'Pastor creado');
  //   window.location.reload();
  // }

  showError( message: string ){
    this.toastr.error( message, 'Error', {
      positionClass: 'toast-bottom-left'
    });
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

  addHijo(){
    if( this.nuevo_hijo == '' ){
      return;
    }
    this.hijos.push(this.nuevo_hijo);
    this.nuevo_hijo = '';
    this.form.value.encargado = this.hijos;
  }

  borrarItemHijo( index: number){
    var arr_nuevo:any = [];
    for (let i = 0; i < this.hijos.length; i++) {
      if( i != index ){
        arr_nuevo.push(this.hijos[i])
      }
    }
    this.hijos = arr_nuevo;
    this.form.value.encargado = this.hijos;
  }
}



