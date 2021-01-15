import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { News } from 'src/app/Models/interfaces';
import { NewsApiService } from 'src/app/services/news-api.service';
import {
  MatPaginatorDefaultOptions,
  MatPaginatorIntl,
  PageEvent,
  _MatPaginatorBase,
} from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<News>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // MatPaginator Output
  datasource: any[] = [];
  pageEvent: PageEvent;
  isFavorite: boolean = false;
  newsCard: News;
  newsList: News[] = [];
  tabs: string[] = [
    'general',
    'technology',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
  ];
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
  }

  ngAfterViewInit() {
    this.getNews('trend');
    this.paginator.page.subscribe((event) => console.log(event));
  }
  public getNews(t?: string) {
    this.nw.fetchNews(t).subscribe((data) => {
      console.log(data.articles);
      this.newsList = data.articles;
      this.datasource = this.newsList;

      this.dataSource = data.articles;
      this.dataSource.paginator = this.paginator;
      console.log('this is pagination data', this.dataSource);
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

  public getCategory(label: string) {
    console.log('tab selected');
    this.nw.fetchNewsByCategory(label).subscribe((data) => {
      console.log(data);
      this.newsList = data.articles;
    });
  }
  public getServerData(e: PageEvent) {
    // console.log(e);
    return (this.dataSource.paginator = this.paginator);
  }
}
