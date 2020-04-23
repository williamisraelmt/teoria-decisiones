import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DateRangePickerService {

  private dateRange$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);

  constructor() {
  }

  setDateRange(dateRange: any[]) {
    this.dateRange$.next(dateRange);
  }

  subToDateRange() {
    return this.dateRange$.pipe(
      shareReplay({bufferSize: 1, refCount: true})
    );
  }

}
