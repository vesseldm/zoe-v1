import { UserIngredientPreference } from './../models/user.state.model';
import { Ingredient } from './../models/ingredients.state.model';
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

export class GetIngredientPreferences {
  static readonly type = '[User] Get IngredientPreferences';
  constructor() { }
}

export class SaveProfileUserForm {
  static readonly type = '[User] Save User Form';
  constructor() { }
}

export class IngredientLiked {
  static readonly type = '[User] Ingredient Liked';
  constructor(public ingredient: UserIngredientPreference) { }
}

export class IngredientDisliked {
  static readonly type = '[User] Ingredient disliked';
  constructor(public ingredient: Ingredient) { }
}
