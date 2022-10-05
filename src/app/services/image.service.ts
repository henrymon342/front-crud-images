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

//////////////

createImage( data: any ): Observable<any> {
  return this.http.post(`${this.baseUrl}/image/new`, data);
}

get(id:number): Observable<any> {
return this.http.get(`${this.baseUrl}/image/find/${id}`);
}

update(id: number, data: any ): Observable<any> {
return this.http.put(`${this.baseUrl}/image/update/${id}`, data);
}

delete(id: number): Observable<any> {
return this.http.delete(`${this.baseUrl}/image/delete/${id}`);
}

// getPastorByCategory(data:any): Observable<any> {
// return this.http.post(`${this.baseUrl}/pastores/findByCategory`, data);
// }




}
