import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Pastor } from '../../../models/pastor';

@Injectable({
  providedIn: 'root'
})
export class PastorService {

  private baseUrl = environment.URL;

  constructor( private http: HttpClient) { }

  createPastor( user: Pastor ): Observable<any> {
      return this.http.post(`${this.baseUrl}/pastores/new`, user);
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/pastores/all`);
  }

  get(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pastores/find/${id}`);
  }

  update(id: number, data: Pastor): Observable<any> {
    return this.http.put(`${this.baseUrl}/pastores/update/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pastores/delete/${id}`);
  }

  getPastorByCategory(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pastores/findByCategory`, data);
  }
}
