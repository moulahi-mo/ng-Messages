import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthService } from './services/auth.service';
import { FavoritesService } from './services/favorites.service';
import { SettingsService } from './services/settings.service';
import { UsersService } from './services/users.service';
import { Store } from '@ngrx/store';
import * as appActions from './store/admin.action';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  admin$: Observable<boolean>;
  isAuth: boolean;
  isAdmin: boolean;
  @ViewChild('sideNav') side: ElementRef;
  constructor(
    private auth: AuthService,
    private fav: FavoritesService,
    private sett: SettingsService,
    private user: UsersService,
    private store: Store<{ adminReducer: boolean }>
  ) {
    this.auth.authState().subscribe((user) => {
      if (user) {
        //! get isAdmin field state
        this.user.getUser(user.uid).subscribe((infos) => {
          this.isAdmin = infos.isAdmin;
          if (this.isAdmin) {
            console.log('admin is logged', this.isAdmin);
            this.store.dispatch(appActions.isAdminOn());
            this.admin$ = this.store.select('adminReducer');

            console.log(this.admin$, 'try catch');
          }
        });

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
