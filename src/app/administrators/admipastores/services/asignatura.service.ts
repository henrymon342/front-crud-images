import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Pastor } from '../../../models/pastor';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private baseUrl = environment.URL;

  constructor( private http: HttpClient) { }

  create(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/asignaturas/new`, data);
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/asignaturas/all`);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/asignaturas/find/${id}`);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/asignaturas/update/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/asignaturas/delete/${id}`);
  }

  getByIdPastor(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/asignaturas/findByIdPastor`, {idFKPastor: data});
  }
}
