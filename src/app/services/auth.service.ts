import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Observer, throwError } from 'rxjs';
import firebase from 'firebase/app';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
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
    return this.afAuth.user.pipe(
      tap((user) => {
        this.isLogin = user ? true : false;
      })
    );
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

  public hundleErrors(error: HttpErrorResponse) {
    if (error) {
      return throwError(error.message);
    }
  }
}
