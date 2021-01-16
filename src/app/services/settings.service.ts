import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Settings } from '../Models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  docId: string = 'mySet';
  constructor(private afire: AngularFirestore) {}

  public addSettings(set: Settings) {
    return this.afire.doc<Settings>(`settings/${this.docId}`).set(set);
  }
  public getSettings(): Observable<Settings> {
    return this.afire.doc<Settings>(`settings/${this.docId}`).valueChanges();
  }
}
