import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

export interface Parent {
  name: string;
  age: number;
  health: number;
  obs: string;
}

@Component({
  selector: 'app-update-pastor',
  templateUrl: './update-pastor.component.html',
  styleUrls: ['./update-pastor.component.scss']
})
export class UpdatePastorComponent implements OnInit {

@ViewChild("content1", {static: false}) contenido!: ElementRef;

  CATEGORIES: string[] = ['LOCAL', 'DISTRITAL', 'PRESBITERO']
  PLACES_MEMB: string[] = ['IGLESIA', 'OTRO'];
  ESTADO_CIVIL: string[] = ['SOLTERO', 'CASADO', 'VIUDO', 'DIVORCIADO'];
  IGLESIAS: string[] = Global.IGLESIAS;
  YEARS = this.rangeYears();
  AREAS = Global.AREAS;
  public form: FormGroup;
  titulosForm: FormGroup;
  requisitosForm: FormGroup;
  familyForm: FormGroup;
  estudyForm: FormGroup;

  public dateReport = new Date();

  files: File[] = [];
  file: File;
  public image: Image = new Image();

  pastor:Pastor = new Pastor();
  titles: any[] = [];
  requisits: any[] = [];
  family: any[] = [];


  hasMaterias: boolean = false;
  seeRecord: boolean = false;

  ELEMENT_DATA: Parent[] = [];
  displayedColumns: string[] = ['nro', 'name', 'age', 'health', 'obs'];
  dataSource = this.ELEMENT_DATA;
  displayedColumns2: string[] = ['nro', 'nivel', 'nombreinst', 'gestiongraduacion', 'grado'];

  constructor( private fb: FormBuilder,
               private toastr: ToastrService,
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

    this.familyForm = this.fb.group({
      Rows: this.fb.array([this.initRows()])
    });
    this.estudyForm = this.fb.group({
      Rows: this.fb.array([this.initRowsE()])
    });
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
      option_places_serv: ['IGLESIA', [Validators.required]],

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

  get formArr() {
    return this.familyForm.get("Rows") as FormArray;
  }

  initRows() {
    return this.fb.group({
      name: [""],
      age: [""],
      health: true,
      obs: [""]
    });
  }

  initDataRows(obj: any) {
    this.formArr.removeAt(0);
    this.formArr.push(
    this.fb.group({
      name: [obj.name],
      age: [obj.age],
      health: obj.health,
      obs: [obj.obs]
    }));
  }

  addNewRow() {
    this.formArr.push(this.initRows());
    console.log(this.familyForm.value);

  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  ////////////////
  get formArrE() {
    return this.estudyForm.get("Rows") as FormArray;
  }

  initRowsE() {
    return this.fb.group({
      nivel: [""],
      nombreinst: [""],
      gestiongraduacion: [""],
      grado: [""]
    });
  }

  initDataRowsE(obj: any) {
    this.formArrE.removeAt(0);
    this.formArrE.push(
    this.fb.group({
      nivel: [obj.nivel],
      nombreinst: [obj.nombreinst],
      gestiongraduacion: obj.gestiongraduacion,
      grado: [obj.grado]
    }));
  }

  addNewRowE() {
    this.formArrE.push(this.initRows());
    console.log(this.estudyForm.value);

  }

  deleteRowE(index: number) {
    this.formArrE.removeAt(index);
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
    this._servicePastor.get(this.pastor.id!).subscribe((data: Pastor) => {
      console.log(data);
      this.pastor = data;



      // data_family: ['', [Validators.required]],
      // educacion: [''],


      this.form.controls['name'].setValue(data.name);
      this.form.controls['direccion'].setValue(data.direccion);
      this.form.controls['celular'].setValue(data.celular);
      this.form.controls['correo'].setValue(data.correo);
      this.form.controls['fecha_nac'].setValue(data.fecha_nac);
      this.form.controls['lugar_nac'].setValue(data.lugar_nac);
      this.form.controls['estado_civil'].setValue(data.estado_civil);
      this.form.controls['nombre_esposa'].setValue(data.nombre_esposa);
      this.form.controls['fecha_nac_esposa'].setValue(data.fecha_nac_esposa);
      this.form.controls['lugar_nac_esposa'].setValue(data.lugar_nac_esposa);
      this.form.controls['category'].setValue(data.category);
      this.form.controls['year'].setValue(Number(data.year));
      this.form.controls['dado_en'].setValue(data.dado_en);
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
      this.createArrayFamily(this.pastor.data_family);
      this.createArrayStudy(this.pastor.educacion);
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

  createArrayFamily(person?: string){
    if( !person ){
      console.log('no existe');
    }else{
      console.log('existe');

      console.log(person);
      var listaaux = JSON.parse(person+'');
      for (let variable in listaaux) {
        console.log(listaaux[variable]);
        this.initDataRows(listaaux[variable]);
      }
    }
    console.log(this.titles);
  }

  createArrayStudy(studing?: string){
    if( !studing ){
      console.log('no existe');
    }else{
      console.log('existe');

      console.log(studing);
      var listaaux = JSON.parse(studing+'');
      for (let variable in listaaux) {
        console.log(listaaux[variable]);
        this.initDataRowsE(listaaux[variable]);
      }
    }
    console.log(this.titles);
  }

  generaPDF(){
    console.log(this.familyForm.value);

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
