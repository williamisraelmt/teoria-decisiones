import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {IReport} from '../models/report';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  URL = environment.BASE_API_URL + '/event';

  constructor(private httpClient: HttpClient) {
  }

  getEventTypes(){
    return this.httpClient.get<{data: any[]}>(`${this.URL}/event-types`).pipe(
      map(r => r.data)
    );
  }

  getAll() {
    return this.httpClient.get<{data: any[]}>(this.URL).pipe(
      map(r => r.data)
    );
  }

  create(event: string): Observable<any> {
    return this.httpClient.post<{ data: any }>(this.URL, event);
  }
}
