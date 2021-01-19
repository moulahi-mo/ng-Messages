import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { News } from '../Models/interfaces';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  emitFavorite = new Subject<number>();
  numberOfFavorites = new Subject<number>();
  keyIndex: any[] = [];
  constructor(private afStore: AngularFirestore) {}

  public addToFavorite(item: News): Observable<any> {
    return from(
      this.afStore.doc<News>(`favorites/${item.uuid}`).set(item)
    ).pipe(
      map(() => {
        //! subject
        this.emitFavorite.next(1);
      })
    );
  }
  public removeFavorite(id: string): Observable<any> {
    //! subject
    this.emitFavorite.next(-1);
    return from(this.afStore.doc<News>(`favorites/${id}`).delete());
  }

  public getFavorites(): Observable<any[]> {
    return this.afStore
      .collection('favorites', (ref) => ref.orderBy('addedDate', 'desc'))
      .valueChanges()
      .pipe(
        tap((res) => {
          console.log(res);
          //! subject
          this.numberOfFavorites.next(res.length);
        })
      );
  }
}
