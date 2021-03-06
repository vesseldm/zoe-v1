import { UserIngredientPreference, UserRecipe } from './../models/user.state.model';
import { Ingredient } from './../models/ingredients.state.model';
import { UserStateModel } from '../models/user.state.model';
import { Recipe } from 'src/app/models/recipe';

export class AddUser {
  static readonly type = '[User] Add user';
  constructor(public payload: UserStateModel) { }
}

export class AddSocialUser {
  static readonly type = '[User] Add  Social user';
  constructor(public payload: string) { }
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
  constructor(public ingredient: UserIngredientPreference, public username: string) { }
}

export class IngredientDisliked {
  static readonly type = '[User] Ingredient disliked';
  constructor(public ingredient: UserIngredientPreference, public username: string) { }
}

export class GetUserRecipes {
  static readonly type = '[User] Get user recipes';
  constructor() { }
}

export class SelectedRecipe {
  static readonly type = '[User] Set Recipe Id';
  constructor(public recipe: UserRecipe) { }
}

export class RecipeThumbsDown {
  static readonly type = '[User] Recipe Thumbs Down';
  constructor(public recipe: UserRecipe, public username: string) { }
}

export class RecipeThumbsUp {
  static readonly type = '[User] Recipe Thumbs Up';
  constructor(public recipe: UserRecipe, public username: string) { }
}

export class RaiseIngredientsScore {
  static readonly type = '[User] RaiseIngredientsScore';
  constructor(public ingredient: UserIngredientPreference) { }
}

export class LowerIngredientsScore {
  static readonly type = '[User] LowerIngredientsScore';
  constructor(public ingredients: UserIngredientPreference[]) { }
}

export class GetUserData {
  static readonly type = '[User] get user data';
  constructor(public email: string) {}
}

export class AddRecipeToList {
  static readonly type = '[User] Add Recipe to List';
  constructor(public recipe: UserRecipe) { }
}

export class IngredientChecked {
  static readonly type = '[User] Ingredient Checked';
  constructor(public ingredient: Ingredient) { }
}

export class IngredientUnChecked {
  static readonly type = '[User] Ingredient unchecked';
  constructor(public ingredient: Ingredient) { }
}
