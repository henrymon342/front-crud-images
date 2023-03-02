import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IglesiaService {

  private baseUrl = environment.URL;

  constructor( private http: HttpClient) { }

  create(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/iglesias/new`, data);
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/iglesias/all`);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/iglesias/find/${id}`);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/iglesias/update/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/iglesias/delete/${id}`);
  }

  getByCategory(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/iglesias/findByCategory`, data);
  }
}
