import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Subscription } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLogout: boolean = false;
  badge: number = 0;
  unsb: Subscription;
  @Output() onSignOut: EventEmitter<boolean> = new EventEmitter();
  @Input() sideNav: MatSidenav;
  @Input() authState: boolean;
  hideSignup: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  // @Output()
  constructor(
    private auth: AuthService,
    private route: Router,
    private _flashMessagesService: FlashMessagesService,
    private sett: SettingsService,
    private fav: FavoritesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(this.authState);
    this.sett.getSettings().subscribe((data) => {
      this.hideSignup = data.registration === 'restrict' ? true : false;
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
    this.auth.logout().finally(() => {
      //! show the snackbar
      this.snackBar.open(`Logging Out..`, 'undo', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.route.navigate(['/login']);
      console.log('loggout');
      this.onSignOut.emit(false);
    });
  }
  ngOnDestroy() {
    this.unsb.unsubscribe();
  }
}
