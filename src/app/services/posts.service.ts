import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../Models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private afstore: AngularFirestore) {}

  public addPost(post: Post): Observable<any> {
    return from(this.afstore.collection('posts').add(post));
  }
  public getPostById(id: string): Observable<any> {
    return this.afstore.doc(`posts/${id}`).valueChanges();
  }
  public getPosts(): Observable<any> {
    return this.afstore
      .collection('posts', (ref) => ref.orderBy('date', 'desc'))

      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => {
            console.log(snap.payload.doc.id, snap.payload.doc.data().title);
            return {
              id: snap.payload.doc.id,
              title: snap.payload.doc.data().title,
              body: snap.payload.doc.data().body,
              author: snap.payload.doc.data().author,
              date: snap.payload.doc.data().date,
              image: snap.payload.doc.data().image,
              indexImg: snap.payload.doc.data().indexImg,
            };
          });
        })
      );
  }

  public deletePost(id: string) {
    return this.afstore.doc(`posts/${id}`).delete();
  }
  public updatePost(post: Post) {
    return from(this.afstore.doc(`posts/${post.id}`).update(post));
  }
}
