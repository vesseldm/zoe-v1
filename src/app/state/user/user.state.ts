import { UserStateModel, UserRecipe, UserIngredientPreference } from './../models/user.state.model';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';
import { from } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import {
  AddUser,
  AddSocialUser,
  SaveProfileUserForm,
  IngredientLiked,
  IngredientDisliked,
  SelectedRecipe,
  RecipeThumbsUp,
  RecipeThumbsDown,
  RaiseIngredientsScore,
  LowerIngredientsScore,
  GetUserData,
} from './user.actions';


@State<UserStateModel>({
  name: 'user',
})
export class UserState {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @Selector()
  static loggedIn(state: UserStateModel) {
    return state.uid;
  }

  @Selector()
  static getUsername(state: UserStateModel) {
    return state.username;
  }

  @Selector()
  static allergiesList(state: UserStateModel) {
    return state.allergies;
  }

  @Selector()
  static getIngredientPreferences(state: UserStateModel) {
    return state.ingredients;
  }

  @Selector()
  static getUsersRecipes(state: UserStateModel) {
    return state.recipes;
  }

  @Selector()
  static getSelectedRecipe(state: UserStateModel) {
    return state.selectedRecipe;
  }


  @Action(GetUserData)
  getUserData(ctx: StateContext<UserStateModel>, action: GetUserData) {
    const state = ctx.getState();
    return this.userService.getUserData(action.token, action.email).pipe(
      tap(result => {
        ctx.setState(result);
      })
    );
  }


  @Action(AddUser)
  addUser(ctx: StateContext<UserStateModel>, action: AddUser) {
    return from(this.authService.registerUser(action.payload)).pipe(
      tap(result => {
        console.log('result = ');
        console.log(result);
        // ctx.setState(result)
      })
    );
  }

  @Action(AddSocialUser)
  addSocialUser(ctx: StateContext<UserStateModel>, action: AddSocialUser) {
    return from(this.authService.socialLogin(action.payload)).pipe(
      tap(result => {
        console.log('result = ');
        console.log(result);
      })
    );
  }


  setRecipeData(recipes, user): UserRecipe[] {
    const newRecipes = [];
    recipes.forEach(recipe => {
      console.log('recipe = ');
      console.log(recipe);
      newRecipes.push(this.getIngredientInfo(recipe, user));
    });
    return newRecipes;
  }

  getIngredientInfo(recipe: UserRecipe, user: UserStateModel): UserRecipe {
    const recipeIngredients: UserIngredientPreference[] = [];
    if (recipe.ingredients) {

      recipe.ingredients.map(ingredient => {
        if (!ingredient.name) {
        } else {
          recipeIngredients.push(ingredient);
        }
      });
      if (recipeIngredients[0]) {
        recipe.ingredients = recipeIngredients;
        return recipe;
      }
    } else {
      return recipe;
    }
  }

  @Action(SaveProfileUserForm)
  saveProfileUserForm(ctx: StateContext<UserStateModel>, action: SaveProfileUserForm) {
    return from(this.authService.doUpdateUser(ctx.getState())).pipe(
      tap(result => {
        console.log('result = ');
        console.log(result);
      })
    );
  }

  @Action(IngredientLiked)
  saveIngredientLike(ctx: StateContext<UserStateModel>, action: IngredientLiked) {
    return from(this.userService.updateIngredient(action.ingredient, action.username)).subscribe(data => {
      ctx.setState(
        patch({
          ingredients: updateItem(item => item._id === action.ingredient._id, action.ingredient)
        }));
    });
  }

  @Action(IngredientDisliked)
  saveIngredientDislike(ctx: StateContext<UserStateModel>, action: IngredientDisliked) {
    return from(this.userService.updateIngredient(action.ingredient, action.username)).subscribe(() => {
      ctx.setState(
        patch({
          ingredients: updateItem(item => item._id === action.ingredient._id, action.ingredient)
        }));
    });
  }

  @Action(SelectedRecipe)
  getSelectedRecipe(ctx: StateContext<UserStateModel>, action: SelectedRecipe) {
    ctx.patchState({
      selectedRecipe: action.recipe
    });
  }

  @Action(RecipeThumbsUp)
  setRecipeThumbsUp(ctx: StateContext<UserStateModel>, action: RecipeThumbsUp) {
    this.userService.likedUserRecipe(action.recipe, action.username).subscribe(data => {
      ctx.setState(
        patch(data)
      );
      const state = ctx.getState();
    });
  }

  @Action(RecipeThumbsDown)
  setRecipeThumbsDown(ctx: StateContext<UserStateModel>, action: RecipeThumbsDown) {
    this.userService.disLikedUserRecipe(action.recipe, action.username).subscribe(data => {
      ctx.setState(
        patch(data)
      );
      const state = ctx.getState();
    });
    }

}
