import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EventModel } from '../../../models/event';




@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = environment.URL;

  constructor( private http: HttpClient) { }

createEvent( event: EventModel ): Observable<any> {
  console.log(event);

  return this.http.post(`${this.baseUrl}/event/new`, event);
}

get(id:number): Observable<any> {
return this.http.get(`${this.baseUrl}/event/find/${id}`);
}

update(id: number, event: EventModel ): Observable<any> {
return this.http.put(`${this.baseUrl}/event/update/${id}`, event);
}

delete(id: number): Observable<any> {
return this.http.delete(`${this.baseUrl}/event/delete/${id}`);
}




}
