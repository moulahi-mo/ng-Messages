import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Authors } from '../Models/interfaces';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  listAuthors: any[] = [];
  author: Authors;
  constructor(private afStore: AngularFirestore, private http: HttpClient) {}

  // public fetchListJson(): Observable<Authors[]> {
  //   return this.http.get<Authors[]>(
  //     'https://jsonplaceholder.typicode.com/users'
  //   );
  // }

  // public addAuthors(list: Authors[]): Observable<any> {
  //   list.forEach((blogger) => {
  //     return this.afStore.collection('authors').add(blogger);
  //   });
  // }
  //! get authors
  public fetchAuthors(): Observable<any> {
    return this.afStore
      .collection('authors')
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => {
            // console.log(snap.payload.doc.data(), snap.payload.doc.id);
            return (this.author = {
              id: snap.payload.doc.id,
              name: snap.payload.doc.data().name,
              username: snap.payload.doc.data().username,
              email: snap.payload.doc.data().email,
              status: snap?.payload.doc.data().standard,
              isActive: snap?.payload.doc.data().isActive,
              joind: snap?.payload.doc.data().joind.toDate(),
              address: {
                street: snap.payload.doc.data().address.street,
                suite: snap.payload.doc.data().address.suite,
                city: snap.payload.doc.data().address.city,
                zipcode: snap.payload.doc.data().address.zipcode,
              },
              phone: snap.payload.doc.data().phone,
              website: snap.payload.doc.data().website,
              company: {
                name: snap.payload.doc.data().company.name,
                catchPhrase: snap.payload.doc.data().company.catchPhrase,
                bs: snap.payload.doc.data().company.bs,
              },
            });
          });
        })
      );
  }

  //! add author

  public addAuthor(person: Authors) {
    return this.afStore.collection('authors').add(person);
  }
  //! delete author
  public deleteAuthor(id: string) {
    return this.afStore.doc<Authors>(`authors/${id}`).delete();
  }
}
