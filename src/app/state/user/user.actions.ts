import { UserStateModel } from '../models/user.state.model';

export class AddUser {
  static readonly type = '[User] Add user';
  constructor(public payload: UserStateModel) { }
}

export class AddSocialUser {
  static readonly type = '[User] Add  Socail user';
  constructor(public payload: string) { }
}
