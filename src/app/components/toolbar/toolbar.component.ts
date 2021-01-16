import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Subscription } from 'rxjs';
import { News } from 'src/app/Models/interfaces';

import { SettingsService } from 'src/app/services/settings.service';
import { subscribeOn } from 'rxjs/operators';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  favoritesList: News[] = [];
  hideAuthors: boolean;
  badge: number = 0;
  unsb: Subscription;
  newTitle: string;
  @Input() sideNav: MatSidenav;

  constructor(
    private fav: FavoritesService,

    private sett: SettingsService
  ) {}

  ngOnInit(): void {
    this.fav.numberOfFavorites.subscribe((n) => {
      this.badge = n;
    });

    this.unsb = this.fav.emitFavorite.subscribe((num) => {
      console.log('heart', num);
      this.badge += num;
    });

    this.sett.getSettings().subscribe((data) => {
      this.hideAuthors = data.authors.includes('Hide authors section')
        ? true
        : false;
      this.newTitle =
        data.title == null || this.newTitle == '' ? 'blogger news' : data.title;
      console.log('newtitle', this.newTitle);
    });
  }

  ngOnDestroy() {
    // this.unsb.unsubscribe();
  }
}
