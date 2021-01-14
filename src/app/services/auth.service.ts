import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin: boolean;
  constructor(private afAuth: AngularFireAuth, private route: Router) {}

  public signUp(email: string, pass: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, pass);
  }
  public logout() {
    return this.afAuth.signOut();
  }

  public login(email: string, pass: string) {
    return this.afAuth.signInWithEmailAndPassword(email, pass);
  }

  public authState(): Observable<any> {
    return this.afAuth.user;
  }
  public authListener(): Observable<any> {
    const authState = Observable.create((observer: Observer<any>) => {
      this.afAuth.onAuthStateChanged(
        (user) => observer.next(user),
        (error) => observer.error(error),
        () => observer.complete()
      );
    });
    return authState;
  }
}
