import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { User } from '../Models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private afstore: AngularFirestore) {}

  public addUser(user: User): Observable<any> {
    return from(this.afstore.doc(`users/${user.id}`).set(user));
  }

  public getUser(id: string): Observable<any> {
    return this.afstore.doc(`users/${id}`).valueChanges();
  }
}
