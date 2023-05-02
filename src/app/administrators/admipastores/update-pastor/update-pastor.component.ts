import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Image } from '../../../models/image';
import { Pastor } from '../../../models/pastor';
import { ImageService } from '../../../services/image.service';
import { DialogService } from '../../administrator/admiusuarios/services/dialog.service';
import { AsignaturaService } from '../services/asignatura.service';
import { PastorService } from '../services/pastor.service';
import * as html2pdf from 'html2pdf.js';
import { Global } from '../../../services/global';


@Component({
  selector: 'app-update-pastor',
  templateUrl: './update-pastor.component.html',
  styleUrls: ['./update-pastor.component.scss']
})
export class UpdatePastorComponent implements OnInit {

@ViewChild("content1", {static: false}) contenido!: ElementRef;

  CATEGORIES: string[] = ['LOCAL', 'DISTRITAL', 'PRESBITERO']
  PLACES_MEMB: string[] = ['IGLESIA', 'OTRO'];
  IGLESIAS: string[] = Global.IGLESIAS;
  YEARS = this.rangeYears();
  AREAS = Global.AREAS;
  public form: FormGroup;
  titulosForm: FormGroup;
  requisitosForm: FormGroup;

  public dateReport = new Date();

  files: File[] = [];
  file: File;
  public image: Image = new Image();

  pastor:Pastor = new Pastor();
  titles: any[] = [];
  requisits: any[] = [];


  hasMaterias: boolean = false;
  seeRecord: boolean = false;

  constructor( private fb: FormBuilder,
               private toastr: ToastrService,
               private _serviceDialog: DialogService,
               private _servicePastor: PastorService,
               private _serviceImage: ImageService,
               private route: ActivatedRoute,
               private service_asignatura: AsignaturaService,
               private router: Router)
               {
                this.createForm();
               }

  ngOnInit(): void {
    this.getPastor();
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

    this.titulosForm = this.fb.group({
      diploma_ministerial: [false],
      bachiller_en_teologia: [false],
      licenciatura: [false],
      maestria: [false],
      doctorado: [false]
    });


    this.requisitosForm = this.fb.group({
      docs_personales: [false],
      carta_recomendacion: [false],
      certificado_membresia: [false],
      otros: [false]
    });
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
    if(this.checkForm()){
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
        this.editarPastor();

      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  popUpInvalidForm(){
    this.showError();
  }

  editarPastor(){
    console.log(this.form.value);
    let timerInterval: any;
    Swal.fire({
      title: 'Editando pastor!',
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

    this._servicePastor.update( this.pastor.id!, this.form.value).subscribe( async res => {
      console.log(res);
      await this.updateImage();
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

  async updateImage(){
    if( this.file == undefined ){
      console.log('No VALIDO');
    }
    else{
      console.log('VALIDO');
      // this.isDisabled = false;
      const fd = new FormData();
      fd.append('image', this.file);
      this._serviceImage.update(this.pastor.id!, fd).subscribe( res => {
        console.log(res);
      })
     }
  }

  showSuccess() {
    this.toastr.success('Satisfactoriamente!', 'Los datos se editaron');
    this.router.navigate(['auth/admipastores/main-lists']);
  }

  showError(){
    this.toastr.error('No valido!', 'Formulario', {
      positionClass: 'toast-bottom-left'
   });
  }


  getPastor() {
    const param = this.route.snapshot.params;
    this.pastor.id = param['id'];
    console.log(param['id']);
    this._servicePastor.get(this.pastor.id!).subscribe((data: Pastor) => {
      console.log(data);
      this.pastor = data;

      this.form.controls['name'].setValue(data.name);
      this.form.controls['category'].setValue(data.category);
      this.form.controls['year'].setValue(Number(data.year));
      this.form.controls['area'].setValue(data.area);
      if( this.IGLESIAS.includes(data.membresia) ){
        this.form.controls['membresia'].setValue(data.membresia);
      }else{
        this.form.controls['option_places_memb'].setValue('OTRO');
        this.form.controls['membresia'].setValue(data.membresia);
      }
      if( this.IGLESIAS.includes(data.lugardeministerio) ){
        this.form.controls['lugardeministerio'].setValue(data.lugardeministerio);
      }else{
        this.form.controls['option_places_serv'].setValue('OTRO');
        this.form.controls['lugardeministerio'].setValue(data.lugardeministerio);
      }

      this.createArrayTitles(this.pastor.titulos);
      this.createArrayRequiremend(this.pastor.requisitos);
    })

    this.getImagePastor(this.pastor.id!);
    this.getMaterias(this.pastor.id!);
  }

  getMaterias(id: number ) {
    this.service_asignatura.getByIdPastor(id).subscribe(async (res:any)  =>{
      this.hasMaterias = res.length==0?false:true;
      console.log( await res);
    })
  }

  getImagePastor(id: number ) {
    this._serviceImage.get(id).subscribe( (res:Image) => {
      console.log(res);
      this.image = res;
    })
  }

  createArrayTitles(titus?: string){
    if( !titus ){
      console.log('no existe');
    }else{
      console.log('existe');

      console.log(titus);
      var listaaux = JSON.parse(titus+'');
      for (let variable in listaaux) {
        if (listaaux[variable] === true) {
          console.log(variable);
          this.titles.push({nombre: variable, valor: true});
          this.titulosForm.controls[variable].setValue(true);
        }else{
          this.titles.push({nombre: variable, valor: false});
          this.titulosForm.controls[variable].setValue(false);
        }
      }
    }
    console.log(this.titles);
  }

  createArrayRequiremend(requis?: string){
    if( !requis ){
      console.log('no existe');
    }else{
      console.log('existe');

      console.log(requis);
      var listaaux = JSON.parse(requis+'');
      for (let variable in listaaux) {
        if (listaaux[variable] === true) {
          console.log(variable);
          this.requisits.push({nombre: variable, valor: true});
          this.requisitosForm.controls[variable].setValue(true);
        }else{
          this.requisits.push({nombre: variable, valor: false});
          this.requisitosForm.controls[variable].setValue(false);
        }
      }
    }
    console.log(this.requisits);
  }

  generaPDF(){
    var element = document.getElementById('content1');
    var opt = {
      margin:       .5,
      filename:     'boleta'+this.pastor.name+'.pdf',
      image:        { type: 'jpg', quality: 0.95 },
      html2canvas:  { useCORS: true, scale: 2, dpi: 300, letterRendering: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
  }

}
