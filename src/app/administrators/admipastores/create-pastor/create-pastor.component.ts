import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Global } from '../../../services/global';
import { ImageService } from '../../../services/image.service';
import { DialogService } from '../../administrator/admiusuarios/services/dialog.service';
import { PastorService } from '../services/pastor.service';

@Component({
  selector: 'app-create-pastor',
  templateUrl: './create-pastor.component.html',
  styleUrls: ['./create-pastor.component.scss']
})
export class CreatePastorComponent implements OnInit {

  CATEGORIES: string[] = ['LOCAL', 'DISTRITAL', 'PRESBITERO']
  PLACES_MEMB: string[] = ['IGLESIA', 'OTRO'];
  IGLESIAS: string[] = Global.IGLESIAS;

  YEARS = this.rangeYears();
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

  closeDialog: boolean = false;

  files: File[] = [];
  file: File;
  constructor( private fb: FormBuilder,
               private toastr: ToastrService,
               private _serviceDialog: DialogService,
               private _servicePastor: PastorService,
               private _serviceImage: ImageService) { }

  ngOnInit(): void {
    console.log(this.IGLESIAS);
    this.createForm();
  }




  createForm(): void{
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      category: ['LOCAL', [Validators.required]],
      year: ['', [Validators.required]],
      area: ['', [Validators.required]],
      membresia: ['', [Validators.required]],
      lugardeministerio: ['', [Validators.required]],
      titulos: [''],
      requisitos: [''],
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

  rangeYears() {
    const anios:{ anio: number }[] = [];
    for (let i = 1950; i < 2040; i++) {
      anios.push({anio: i});
    }
    return anios;
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
      // showCancelButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.crearPastor();

      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  popUpInvalidForm(){
    this.showError();
  }

  crearPastor(){
    let timerInterval: any;
    // Swal.fire({
    //   title: 'Creando pastor!',
    //   html: `Cerrando en <b></b> milisegundos.`,
    //   timer: 2000,
    //   timerProgressBar: true,
    //   didOpen: () => {

    //     Swal.showLoading()
    //     let b = Swal.getHtmlContainer()!.querySelector('b')
    //     timerInterval = setInterval(() => {
    //       b!.textContent = String(Swal.getTimerLeft())
    //     }, 100)
    //   },
    //   willClose: () => {
    //     clearInterval(timerInterval)
    //   }
    // }).then((result) => {
    //   if (result.dismiss === Swal.DismissReason.timer) {
    //     console.log('I was closed by the timer')
    //   }
    // })

    this._servicePastor.createPastor(this.form.value).subscribe( async res => {
      console.log(res);
      this.subirImagenDrop(await res.id);
      this.showSuccess();
    })
  }


  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    if(this.files.length > 1){ // checking if files array has more than one content
      this.replaceFileImage(); // replace file
      }
      this.file = this.files[0]
      console.log(this.file);
  }

  replaceFileImage(){
    this.files.splice(0,1); // index =0 , remove_count = 1
  }

  subirImagenDrop(id: string){
    let formData = new FormData();
    formData.append("image", this.file, this.file['name']);
    formData.append("idAsociado", id);
    console.log(this.file['name']);
    this._serviceImage.createImage( formData ).subscribe( res =>{
      console.log( res );
    })
  }



  showSuccess() {
    this.toastr.success('Satisfactoriamente!', 'Pastor creado');
    this.closeDialog = true;
    this._serviceDialog.setPersona(this.closeDialog)
    window.location.reload();
  }

  showError(){
    this.toastr.error('No valido!', 'Formulario', {
      positionClass: 'toast-bottom-left'
    });
   this.closeDialog = false;
  }


}



