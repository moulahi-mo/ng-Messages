import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../Models/interfaces';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  restApi: string =
    'https://portfolio-messages-780f3-default-rtdb.firebaseio.com/';
  // term: string = 'google';
  // url: string = `http://newsapi.org/v2/everything?q=${this.term}&sortBy=popularity&apiKey=8b546a54510e4cfc9c94c8710cb2a7de`;

  constructor(private http: HttpClient) {}

  public fetchNews(t: string = 'trends'): Observable<News[]> {
    return this.http.get<News[]>(
      `http://newsapi.org/v2/everything?q=${t}&sortBy=popularity&apiKey=8b546a54510e4cfc9c94c8710cb2a7de`
    );
  }
  public fetchNewsByCategory(c: string = 'general'): Observable<News[]> {
    return this.http.get<News[]>(
      `https://newsapi.org/v2/top-headlines?category=${c}&apiKey=8b546a54510e4cfc9c94c8710cb2a7de`
    );
  }
}
