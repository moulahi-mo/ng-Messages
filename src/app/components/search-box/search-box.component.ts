import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { News } from 'src/app/Models/interfaces';
import { NewsApiService } from 'src/app/services/news-api.service';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  @Input() index: number;
  @Output() onSearch: EventEmitter<string> = new EventEmitter();
  @Output() onFetch: EventEmitter<News[]> = new EventEmitter();
  searchForm: FormGroup;
  fetchForm: FormGroup;
  news: News[] = [];
  tags: string[] = [];
  isError: string = null;
  listSearch: News[] = [];
  constructor(private nw: NewsApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    //! init reactive forms
    this.fetchForm = this.fb.group({
      query: [null, Validators.required],
    });
    this.searchForm = new FormGroup({
      term: new FormControl(null),
    });

    this.initArticles();
  }
  //! init fetching articles articles
  public initArticles(t?: string) {
    this.nw.fetchNews(t).subscribe((news) => {
      this.news = news.articles;
      const list = news.articles.map((article) => {
        let m = article.title;
        return m;
      });
      console.log(list);
      this.tags = [...list];
      console.log(this.tags);
    });
  }

  //! search inside articles
  public onSubmit() {
    let val = this.searchForm.value.term.toLowerCase().trim();
    this.onSearch.emit(val);
    console.log(val, this.news);
  }
  //! search for new keyword
  public onFetching() {
    let q = this.fetchForm.value.query.toLowerCase().trim();
    console.log(q);
    this.nw.fetchNews(q).subscribe(
      (data) => {
        this.listSearch = data.articles;
        console.log(this.listSearch);
        this.onFetch.emit(this.listSearch);
        this.fetchForm.reset();
      },
      (err) => (this.isError = err)
    );
  }
}
