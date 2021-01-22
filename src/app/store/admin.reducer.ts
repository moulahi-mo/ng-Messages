import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import * as appActions from './admin.action';

export interface State {
  isAdmin: boolean;
}

export const initialeState: State = {
  isAdmin: false,
};

export const adminReducer = createReducer(
  initialeState,
  on(appActions.isAdminOn, (state) => ({ ...state, isAdmin: true }))
);

export function isAdminReducer(state: State, action: Action) {
  return adminReducer(state, action);
}
