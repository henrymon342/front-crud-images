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





  constructor(private toastr: ToastrService, private image_service: ImageService, private http: HttpClient) { }

  ngOnInit() {

  }


  fileChange(element: any) {
    this.uploadedFiles = element.target.files;
  }

  upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i]['name']);
    }

        formData.append("idAsociado", '11');
    this.http.post('/api/upload', formData)
    .subscribe((response) => {
         console.log('response received is ', response);
    })
}
}
