import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  public setToLocal(name: string, item: any) {
    localStorage.setItem(name, JSON.stringify(item));
  }

  public getLocal(name: string) {
    localStorage.getItem(name) !== null
      ? localStorage.getItem(JSON.parse(name))
      : false;
  }

  public removeLocal(name: string) {
    localStorage.removeItem(name);
  }
}
