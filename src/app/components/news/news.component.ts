import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/Models/interfaces';
import { NewsApiService } from 'src/app/services/news-api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  newsCard: News;
  newsList: News[] = [];
  constructor(private nw: NewsApiService) {}

  ngOnInit(): void {
    this.newsCard = {
      author: null,
      title: null,
      content: null,
      publishedAt: null,
      url: null,
      urlToImage: null,
    };
    this.getNews();
  }

  public getNews() {
    this.nw.fetchNews().subscribe((data) => {
      console.log(data.articles);
      this.newsList = data.articles;
    });
  }
  public searchArticle(val: string) {
    this.newsList.forEach((art, index) => {
      if (
        art.content.toLowerCase().trimEnd().includes(val) ||
        art.author.toLowerCase().trimEnd().includes(val) ||
        art.title.toLowerCase().trimEnd().includes(val) ||
        art.publishedAt.toString().toLowerCase().trimEnd().includes(val)
      ) {
        document.getElementById(index.toString()).classList.remove('d-none');
        console.log('is here');
      } else {
        document.getElementById(`${index}`).classList.add('d-none');
        console.log('is Not here');
      }
    });
  }
  public searchForNewArticle(list: News[]) {
    console.log(list);
    this.newsList = list;
  }
}
