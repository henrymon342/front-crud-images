import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private baseUrl = 'http://localhost:3000/api';
  private baseUrl = environment.URL;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data', //     <-- IMPORTANT
      'Accept': 'application/json'
    })
  };


  constructor( private http: HttpClient) { }


  authentication( data: any ): Observable<any>{
    return this.http.post(`${this.baseUrl}/auth/signin`, data );
  }



}
