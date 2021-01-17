import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthService } from './services/auth.service';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuth: boolean;
  @ViewChild('sideNav') side: ElementRef;
  constructor(private auth: AuthService, private fav: FavoritesService) {
    this.auth.authState().subscribe((user) => {
      if (user) {
        this.isAuth = true;
        console.log(user, 'login', this.isAuth);
      } else {
        this.isAuth = false;
        console.log(user, 'logout', this.isAuth);
      }
    });
    this.fav.getFavorites().subscribe();
  }

  public onLogout(isLogout: boolean) {
    this.isAuth = isLogout;
  }
}
