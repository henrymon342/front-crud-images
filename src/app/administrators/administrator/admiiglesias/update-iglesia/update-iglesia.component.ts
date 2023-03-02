import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Pastor } from '../../../../models/pastor';
import { Global } from '../../../../services/global';
import { IglesiaService } from '../services/iglesia.service';
import { Iglesia } from '../../../../models/iglesia';
import { PastorService } from '../../../admipastores/services/pastor.service';
import { ImageService } from '../../../../services/image.service';
import { Image } from '../../../../models/image';
@Component({
  selector: 'app-update-iglesia',
  templateUrl: './update-iglesia.component.html',
  styleUrls: ['./update-iglesia.component.scss']
})
export class UpdateIglesiaComponent implements OnInit {

  public form: FormGroup;
  public IGLESIAS: string[] = Global.IGLESIAS;
  public ZONAS: string[] = Global.ZONAS;
  public PASTORES: Pastor[] = [];
  public DAYS: string[] = Global.DIAS;
  public startDate = new Date(1990, 0, 1);
  files: File[] = [];
  file: File;
  public iglesia: Iglesia = new Iglesia();
  public churchImage: Image = new Image();

  constructor( private toastr: ToastrService,
               private fb: FormBuilder,
               private route: ActivatedRoute,
               private _iglesiaService: IglesiaService,
               private _pastorService: PastorService,
               private _imageService: ImageService,
               private router: Router ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getChurch();
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
      zona: ['', [Validators.required]]
    })
  }

  getChurch() {
    const param = this.route.snapshot.params;
    const id = param['id'];
    console.log( id );
    this._iglesiaService.get(id).subscribe( res => {
      this.iglesia = res as Iglesia;
      console.log(res);
      this.form.controls['nombre'].setValue(this.iglesia.nombre);
      this.form.controls['ubicacion'].setValue(this.iglesia.ubicacion);
      this.form.controls['fundacion'].setValue(this.iglesia.fundacion);
      this.form.controls['superdni'].setValue(this.iglesia.superdni);
      this.form.controls['presimni'].setValue(this.iglesia.presimni);
      this.form.controls['presijni'].setValue(this.iglesia.presijni);

      this.form.controls['diacentral'].setValue(this.iglesia.diacentral);
      this.form.controls['horacentralini'].setValue(new Date(this.iglesia.horacentralini));
      this.form.controls['horacentralfin'].setValue(new Date(this.iglesia.horacentralfin));

      this.form.controls['diajni'].setValue(this.iglesia.diajni);
      this.form.controls['horajniini'].setValue(new Date(this.iglesia.horajniini));
      this.form.controls['horajnifin'].setValue(new Date(this.iglesia.horajnifin));

      this.form.controls['zona'].setValue(this.iglesia.zona);

      this.getPastores(this.iglesia.idPastor);
    });
    this.getImageChurch(id);
  }

  getImageChurch(id: number ) {
    this._imageService.get(id).subscribe( (res) => {
      console.log(res);
      this.churchImage = res;
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

  replaceFileImage(){
    this.files.splice(0,1); // index =0 , remove_count = 1
  }

  alertCheckForm(){
    console.log(this.form.value);
    if(this.checkForm()){
      this.popUpValidForm();
    }
    else{
      this.popUpInvalidForm();
    }
  }

  popUpInvalidForm(){
    console.log(' form invalid! image is missing');
    this.toastr.error('No valido!', 'Formulario', {
      positionClass: 'toast-bottom-left'
    });
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
        this.updateIglesia();

      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  updateIglesia(){
    this._iglesiaService.update( this.iglesia.id!, this.form.value).subscribe( async res => {
      console.log(res);
      await this.updateImage();
      this.showSuccess();
    })
  }

  async updateImage(){
    if( this.file == undefined ){
      console.log('No VALIDO');
    }
    else{
      console.log('VALIDO');
      const fd = new FormData();
      fd.append('image', this.file);
      this._imageService.update(this.iglesia.id!, fd).subscribe( res => {
        console.log(res);
      })
     }
  }

  showSuccess() {
    this.toastr.success('Satisfactoriamente!', 'Iglesia creada');
    this.router.navigate(['auth/administrador/admi-iglesias/main-list']);
  }

  onRemove(event:any): void {
    this.files.pop();
  }

  getPastores( idPas: number){
    this._pastorService.getAll().subscribe( (res: any) => {
      console.log(res);
      this.PASTORES = res;
      this.PASTORES.sort(
        function (a, b) {
          // A va primero que B
          if (a.name < b.name)
              return -1;
          // B va primero que A
          else if (a.name > b.name)
              return 1;
          // A y B son iguales
          else
              return 0;
      }
      );
      this.form.controls['idPastor'].setValue( idPas );
    })
  }
}
