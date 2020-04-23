import {Injectable} from '@angular/core';
import {isNull, has} from 'lodash';
import {BehaviorSubject, Subject} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private currentSettings$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
  }

  private getSettings() {
    if (isNull(localStorage.getItem('settings'))) {
      localStorage.setItem('settings', JSON.stringify({}));
    }
    return JSON.parse(localStorage.getItem('settings'));
  }

  private setSettingsAndNotify(settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
    this.refreshCurrentSettingsFromLocalStorage();
  }

  public refreshCurrentSettingsFromLocalStorage() {
    this.currentSettings$.next(this.getSettings());
  }

  liveSettings() {
    if (this.currentSettings$.value === null) {
      this.refreshCurrentSettingsFromLocalStorage();
    }
    return this.currentSettings$.asObservable().pipe(
      shareReplay({bufferSize: 1, refCount: true})
    );
  }

  liveSettingsFromModule(moduleName: string) {
    return this.liveSettings().pipe(map(modules => (modules[moduleName] || {})));
  }

  setItem(moduleName: string, key: string, value: any) {
    const settings = this.getSettings();
    if (!has(settings, moduleName)) {
      settings[moduleName] = {};
    }
    settings[moduleName][key] = value;
    this.setSettingsAndNotify(settings);
  }

  patchItems(moduleName: string, items: any) {
    const settings = this.getSettings();
    if (!has(settings, moduleName)) {
      settings[moduleName] = {};
    }
    settings[moduleName] = items;
    this.setSettingsAndNotify(settings);
  }
}
