import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { News } from '../Models/interfaces';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  // restApi: string =
  //   'https://portfolio-messages-780f3-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  public fetchNews(t: string = 'trends'): Observable<News[]> {
    return this.http
      .get<News[]>(
        `https://newsapi.org/v2/everything?q=${t}&sortBy=popularity&apiKey=8b546a54510e4cfc9c94c8710cb2a7de`
      )
      .pipe(catchError(this.hundleErrors));
  }
  public fetchNewsByCategory(c: string = 'general'): Observable<News[]> {
    return this.http
      .get<News[]>(
        `https://newsapi.org/v2/top-headlines?category=${c}&apiKey=8b546a54510e4cfc9c94c8710cb2a7de`
      )
      .pipe(catchError(this.hundleErrors));
  }

  private hundleErrors(error: HttpErrorResponse) {
    if (error) {
      return throwError(error.error.message);
    }
  }
}
