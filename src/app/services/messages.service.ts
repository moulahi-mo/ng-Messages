import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../Models/interfaces';
@Injectable({
  providedIn: 'root',
})
export class MessagesService implements OnInit {
  constructor(private db: AngularFirestore) {}
  ngOnInit() {}

  public getMessages(): Observable<any> {
    return (
      this.db
        .collection('messages')
        // .valueChanges()
        // .subscribe((data) => {
        //   this.messages = data;
        //   console.log(this.messages);
        // });
        .snapshotChanges()
        .pipe(
          map((snaps) => {
            return snaps.map((snap) => {
              return {
                id: snap.payload.doc.id,
                name: snap.payload?.doc.data().name,
                amount: snap.payload?.doc.data().amount,
              };
            });
          })
        )
    );
  }
  public addMessage(msg: Message) {
    this.db.collection('messages').add(msg);
  }

  public deleteMessage(id: string) {
    this.db.doc<Message>(`messages/${id}`).delete();
  }
  public updateMessage(msg: Message): Observable<any> {
    const up = this.db
      .doc<Message>(`messages/${msg.id}`)
      .update({ date: msg.date });
    return from(up);
  }
  public setMessage(msg: Message) {
    this.db.doc<Message>(`messages/${msg.id}`).set(msg);
  }
}
