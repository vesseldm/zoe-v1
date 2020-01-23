import { UserStateModel } from '../models/user.state.model';

export class AddUser {
  static readonly type = '[User] Add user';
  constructor(public payload: UserStateModel) { }
}

export class AddSocialUser {
  static readonly type = '[User] Add  Social user';
  constructor(public payload: string) { }
}

export class LoginUser {
  static readonly type = '[User] Login User';
  constructor(public payload: any) { }
}

export class SaveProfileUserForm {
  static readonly type = '[User] Save User Form';
  constructor() { }
}
