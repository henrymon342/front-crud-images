import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.URL;

  constructor( private http: HttpClient) { }

  createUser( user: User ): Observable<any> {
      return this.http.post(`${this.baseUrl}/administrador/new`, user);
  }

  get(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/administrador/find/${id}`);
  }

  getUserByType(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/administrador/findActivitiesUser`, data);
  }

  update(id: number, data:any): Observable<any> {
    return this.http.put(`${this.baseUrl}/administrador/update/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/administrador/delete/${id}`);
  }
}
