import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Settings } from '../Models/interfaces';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settingsEmit = new Subject<Settings>();
  docId: string = 'mySet';
  constructor(private afire: AngularFirestore) {}

  public addSettings(set: Settings) {
    this.settingsEmit.next(set);
    return this.afire.doc<Settings>(`settings/${this.docId}`).set(set);
  }
  public getSettings(): Observable<Settings> {
    return from(
      this.afire.doc<Settings>(`settings/${this.docId}`).valueChanges()
    ).pipe(
      tap((data) => {
        this.settingsEmit.next(data);
      })
    );
  }
}
