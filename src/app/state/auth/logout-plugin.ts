import { getActionTypeFromInstance } from '@ngxs/store';
import { Logout } from './auth.actions';

export function logoutPlugin(state, action, next) {
  // Use the get action type helper to determine the type
  if (getActionTypeFromInstance(action) === Logout.type) {
      console.log('state  from logout= ');
      console.log(state);
    // if we are a logout type, lets erase all the state
    state = {};
  }

  // return the next function with the empty state
  return next(state, action);
}