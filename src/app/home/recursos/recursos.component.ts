import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { PastorService } from '../../administrators/admipastores/services/pastor.service';
import { firstValueFrom } from 'rxjs';
import { Pastor } from '../../models/pastor';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.scss']
})
export class RecursosComponent implements OnInit {

  uploadedFiles: [] = [];
  files: File[] = [];
  file: File;

  constructor( private image_service: ImageService,
               private _servicePastor: PastorService ) { }

  ngOnInit(): void {
  }

  onSelect(event: any) {
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

  subirImagenDrop(){
    let formData = new FormData();
    formData.append("image", this.file, this.file['name']);
    formData.append("idAsociado", '11');

    console.log(this.file['name']);

    this.image_service.createImage( formData ).subscribe( res =>{
      console.log( res );
    })
  }

  upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("image", this.uploadedFiles[i], this.uploadedFiles[i]['name']);
    }

        formData.append("idAsociado", '11');

    this.image_service.uploadImage( formData ).subscribe( res =>{
      console.log( res );
    })
  }

  fileChange(element: any) {
    this.uploadedFiles = element.target.files;
    console.log(this.uploadedFiles);
  }

  async crearPastor(){

    const pas = {
                  name: "PRUEBA NUMERO 30",
                  category: "DISTRITAL",
                  year: "2000",
                  area: "Educación",
                  membresia: "BELLA VISTA",
                  lugardeministerio: "BELLA VISTA",
                  titulos: "",
                  requisitos: "{\"docs_personales\":false,\"carta_recomendacion\":false,\"certificado_membresia\":false,\"otros\":false}",
                  // createdAt: "2023-02-06T15:40:41.000Z",
                  // id: "87fbfab8-ac1b-4acf-8027-d07733f79672",
                  // updatedAt: "2023-02-08T02:51:01.000Z",
    };

    try
    {
      //  if( this.file != null ){
      //   await firstValueFrom(this._servicePastor.createPastor( pas ))
      //   .then((value) => {
      //     console.log(value);
      //     this.asociarImagen(value.id);
      //     }).catch((err)=>{
      //       console.log('ERROR AL CREAR PASTOR');
      //       console.log(err);
      //     });
      //  }
      //  else{
      //   console.log('ES NECESARIO LA IMAGEN');

      //  }
    }
    catch(Error)
    {
      console.log('ERROR AL CREAR PASTOR');
      console.error(Error);
    }
  }

  async asociarImagen( idadjunto: number ){
    // try
    // {
      let formData = new FormData();
      formData.append("image", this.file, this.file['name']);
      formData.append("idAsociado", idadjunto.toString() );
      console.log(this.file['name']);

      await firstValueFrom(this.image_service.createImage( formData ))
      .then((value) => {
        console.log(value);
        this.getImage(value.newImagen.idAsosiado);
      })
      .catch((err)=>{
        console.log('ERROR AL GUARDAR IMAGEN');
        console.log(err);
      });
    // }
    // catch(Error)
    // {
    //     console.log('ERROR AL CREAR PASTOR');

    //     console.error(Error);
    // }
  }


  async getImage(id:number){

    await firstValueFrom(this.image_service.get( id ))
    .then((value) => {
      console.log(value);

    })
    .catch((err)=>{
      console.log('ERROR AL OBTENER IMAGEN');
      console.log(err);
    });

  }
}
