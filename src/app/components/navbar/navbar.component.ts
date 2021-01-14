import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLogout: boolean = false;
  @Output() onSignOut: EventEmitter<boolean> = new EventEmitter();
  @Input() sideNav: MatSidenav;
  @Input() authState: boolean;
  // @Output()
  constructor(
    private auth: AuthService,
    private route: Router,
    private _flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.authState = true;
    console.log(this.authState);
  }

  public onLogout() {
    this.auth.logout().finally(() => {
      this._flashMessagesService.show('We are Logged out redirecting ..!', {
        cssClass: 'alert-dark text-center ',
        timeout: 3000,
      });

      this.route.navigate(['/login']);
      console.log('loggout');
      this.onSignOut.emit(false);
    });
  }
}
