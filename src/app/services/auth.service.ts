import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  public authState(): boolean {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log(user, this.isLogin);
        this.isLogin = true;
        return this.isLogin;
      } else {
        console.log(user, this.isLogin);
        this.isLogin = false;
        return this.isLogin;
      }
    });
    return this.isLogin;
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
