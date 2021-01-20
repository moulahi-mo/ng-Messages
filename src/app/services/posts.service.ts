import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Post } from '../Models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private afstore: AngularFirestore) {}

  public addPost(post: Post): Observable<any> {
    return from(this.afstore.collection('posts').add(post));
  }
}
