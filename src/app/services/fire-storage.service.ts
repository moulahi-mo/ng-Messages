import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FireStorageService {
  constructor(private storage: AngularFireStorage) {}

  public uploadFile(filePath: string, file: any): Observable<any> {
    return from(this.storage.upload(filePath, file));
  }
}
