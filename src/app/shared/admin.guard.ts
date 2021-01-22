import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as appActions from '../store/admin.action';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  admin$: Observable<boolean>;
  constructor(private store: Store<{ adminReducer: boolean }>) {
    this.admin$ = this.store.select('adminReducer');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.admin$) {
      return true;
    } else {
      return false;
    }
  }
}
