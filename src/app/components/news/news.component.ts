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
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Subject } from 'rxjs';
import { uniqueid } from '../../shared/functions';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, AfterViewInit {
  @ViewChild('heart') heart: MatIcon;
  emitFavorite = new Subject<number>();
  dataSource: MatTableDataSource<News>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  // MatPaginator Output
  close: boolean = false;
  isError: string = null;
  favList = new Set(['']);
  firestoreKey: string;
  isUpdated: boolean = false;
  item: News | any;
  datasource: any[] = [];
  pageEvent: PageEvent;
  isFavorite: boolean = false;
  index: string | number;
  newsCard: News;
  newsList: News[] = [];
  isLoading: boolean = false;
  tabs: string[] = [
    'general',
    'technology',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
  ];
  constructor(
    private nw: NewsApiService,
    private snackBar: MatSnackBar,
    private fav: FavoritesService
  ) {}

  ngOnInit(): void {
    this.fav.getFavorites().subscribe();
    this.newsCard = {
      isFav: false,
      uuid: uniqueid(),
      author: null,
      title: null,
      content: null,
      publishedAt: null,
      url: null,
      urlToImage: null,
    };
  }

  ngAfterViewInit() {
    this.getNews('trends');
    this.paginator.page.subscribe((event) => console.log(event));
  }
  public getNews(t?: string) {
    this.isLoading = true;
    this.nw.fetchNews(t).subscribe(
      (data: any) => {
        //!show the message snackbar
        this.snackBar.open('Getting articles...', 'undo', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

        this.newsList = data.articles;
        //!! adding uid for articles
        this.newsList = this.newsList.map((item) => {
          return { ...item, uuid: uniqueid(), isFav: false };
        });
        this.isLoading = false;

        this.datasource = this.newsList;

        this.dataSource = data.articles;
        this.dataSource.paginator = this.paginator;
        console.log('this is pagination data', this.dataSource);
      },
      (err) => (this.isError = err)
    );
  }
  public searchArticle(val: string) {
    this.newsList.forEach((art, index) => {
      if (
        art.content.toLowerCase().trim().includes(val) ||
        art.author.toLowerCase().trim().includes(val) ||
        art.title.toLowerCase().trim().includes(val) ||
        art.publishedAt.toString().toLowerCase().trim().includes(val)
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
    this.newsList = this.newsList.map((item) => {
      return { ...item, uuid: uniqueid(), isFav: false };
    });
  }

  public getCategory(label: string) {
    this.isLoading = true;
    //!show the message snackbar
    this.snackBar.open('Getting articles...', 'undo', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    console.log('tab selected');
    this.nw.fetchNewsByCategory(label).subscribe(
      (data: any) => {
        console.log(data);
        this.newsList = data.articles;
        this.newsList = this.newsList.map((item) => {
          return { ...item, uuid: uniqueid(), isFav: false };
        });
        this.isLoading = false;
      },
      (err) => (this.isError = err)
    );
  }
  public getServerData(e: PageEvent) {
    // console.log(e);
    return (this.dataSource.paginator = this.paginator);
  }
  public forFavorite(news: News, i: number) {
    this.isFavorite = !news.isFav;
    this.index = news.uuid;
    this.item = { ...news, id: i, addedDate: new Date() };
    //! add favorite to db if fav clicked
    if (this.isFavorite) {
      this.fav.addToFavorite(this.item).subscribe(
        (res) => {
          console.log(res, 'fav added', news.uuid);

          news.isFav = true;
          //* ppoup after adding favorite
          this.snackBar.open('added to favorites', 'undo', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: 'bottom',
          });
        },
        (err) => (this.isError = err)
      );
    }
    //! if favorie icon decoched
    else if (!this.isFavorite) {
      this.fav.removeFavorite(news.uuid).subscribe((res) => {
        console.log('removed favorite', news.uuid);

        news.isFav = false;
        //* ppoup after adding favorite
        this.snackBar.open('remove from favorites', 'undo', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: 'bottom',
        });
      });
    }
  }
}
