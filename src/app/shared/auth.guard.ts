import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.isLogin) {
      // this.route.navigate(['/']);
      return true;
    } else {
      // this.route.navigate(['/login']);
      return false;
    }

    // return this.auth.authState().pipe(
    //   map((user) => {
    //     if (user) {
    //       return true;
    //     } else {
    //       this.route.navigate(['/login']);
    //       return false;
    //     }
    //   })
    // );
  }
}
