import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Subscription } from 'rxjs';
import { News } from 'src/app/Models/interfaces';

import { SettingsService } from 'src/app/services/settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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
  unsb2: Subscription;
  newTitle: string;
  @Input() authState: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @Input() sideNav: MatSidenav;

  constructor(
    private fav: FavoritesService,
    private auth: AuthService,
    private sett: SettingsService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // ! get subject for settings title

    this.sett.settingsEmit.subscribe((data) => {
      console.log(data, 'new title emit ');
      this.hideAuthors = data.authors.includes('Hide authors section')
        ? true
        : false;
      this.newTitle =
        data.title == null || this.newTitle == '' ? 'blogger news' : data.title;
      console.log('newtitle i am the title', this.newTitle);
    });

    // ! get subject for favorite number
    this.fav.numberOfFavorites.subscribe((n) => {
      this.badge = n;
    });

    this.unsb = this.fav.emitFavorite.subscribe((num) => {
      console.log('heart', num);
      this.badge += num;
    });
  }

  public onLogout() {
    this.auth.logout().then(() => {
      this.snackBar.open('Sign out ..', 'undo', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });

      this.route.navigate(['/login']);
    });
  }
  // ! unsbscribe

  ngOnDestroy() {
    this.unsb.unsubscribe();
    this.unsb2.unsubscribe();
  }
}
