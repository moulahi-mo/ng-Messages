import { Component } from '@angular/core';
import { userInfo } from 'os';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuth: boolean;
  constructor(private auth: AuthService) {
    // this.isAuth = this.auth.authState();
    // if (this.isAuth) {
    //   console.log('user login');
    // } else {
    //   console.log('user logout');
    // }

    this.auth.authListener().subscribe((user) => {
      if (user) {
        this.isAuth = true;
        console.log(user, 'login', this.isAuth);
      } else {
        this.isAuth = false;
        console.log(user, 'logout', this.isAuth);
      }
    });
  }
  title = 'material';
  public onLogout() {
    this.auth.logout().finally(() => {
      console.log('loggout');
      this.isAuth = false;
    });
  }
}
