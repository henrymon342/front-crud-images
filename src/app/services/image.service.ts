import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  // private baseUrl = 'http://localhost:3000/api';
  private baseUrl = environment.URL;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data', //     <-- IMPORTANT
      'Accept': 'application/json'
    })
  };

  formData: FormData = new FormData();

  constructor( private http: HttpClient) { }


  uploadImage( data: any ): Observable<any>{

    return this.http.post(`${this.baseUrl}/create`, data );

  }
  getPrueba(){
    return this.http.get(`${this.baseUrl}/images/prueba`);
  }






  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
