import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { ImageService } from './services/image.service';
import { HttpClient } from '@angular/common/http';


// const URL = 'http://localhost:3000/upload';
const URL = 'http://localhost:3000/api/images/new';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  uploadedFiles: [] = [];

  files: File[] = [];
  file: File;


  constructor(private toastr: ToastrService, private image_service: ImageService, private http: HttpClient) { }

  ngOnInit() {

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

  subirImagenDrop(){
    let formData = new FormData();
    formData.append("image", this.file, this.file['name']);
    formData.append("idAsociado", '11');

    console.log(this.file['name']);

    this.image_service.uploadImage( formData ).subscribe( res =>{
      console.log( res );
    })
  }





  fileChange(element: any) {
    this.uploadedFiles = element.target.files;
    console.log(this.uploadedFiles);

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
}
