import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {IReport} from '../models/report';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  URL = environment.BASE_API_URL + '/report';

  constructor(private httpClient: HttpClient) {
  }

  get(code: string): Observable<IReport> {
    return this.httpClient.get<{ data: IReport }>(`${this.URL}/${code}`).pipe(
      map(r => r.data)
    );
  }

  getAll(): Observable<IReport[]> {
    return this.httpClient.get<{ data: IReport[] }>(this.URL).pipe(
      map(r => r.data)
    );
  }

  getData(settings) {
    return this.httpClient.post<any>(this.URL + '/data', settings).pipe(
      map(r => r.data)
    );
  }

  getChartData(settings) {
    return this.httpClient.post<any>(this.URL + '/chart-data', settings).pipe(
      map(r => r.data)
    );
  }

  getEvents(settings) {
    return this.httpClient.post<any>(this.URL + '/events', settings).pipe(
      map(r => r.data)
    );
  }

  getWidgetsData(settings) {
    return this.httpClient.post<any>(this.URL + '/widgets-data', settings).pipe(
      map(r => r.data)
    );
  }
}
