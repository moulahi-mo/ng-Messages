import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthService } from './services/auth.service';
import { FavoritesService } from './services/favorites.service';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuth: boolean;
  @ViewChild('sideNav') side: ElementRef;
  constructor(
    private auth: AuthService,
    private fav: FavoritesService,
    private sett: SettingsService
  ) {
    this.auth.authState().subscribe((user) => {
      if (user) {
        this.isAuth = true;
        //! start favorites/settings services to get infos for navbar and sidebar
        this.fav.getFavorites().subscribe();
        this.sett.getSettings().subscribe();
        console.log(user, 'login', this.isAuth);
      } else {
        this.isAuth = false;
        console.log(user, 'logout', this.isAuth);
      }
    });
  }

  public onLogout(isLogout: boolean) {
    this.isAuth = isLogout;
  }
}
