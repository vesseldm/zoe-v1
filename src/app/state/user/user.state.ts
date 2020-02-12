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

  @Selector()
  static getUserState(state: UserStateModel) {
    return state;
  }


  @Action(GetUserData)
  getUserData(ctx: StateContext<UserStateModel>, action: GetUserData) {
    const state = ctx.getState();
    return this.userService.getUserData(action.email).pipe(
      tap(result => {
        ctx.setState(result);
      })
    );
  }


  @Action(AddUser)
  addUser(ctx: StateContext<UserStateModel>, action: AddUser) {
    return from(this.authService.registerUser(action.payload)).pipe(
      tap(result => {
        this.userService.createNewUserRecipes(action.payload.email).subscribe(data => {
          console.log('data = ');
          console.log(data);
        });
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

  @Action(SaveProfileUserForm)
  saveProfileUserForm(ctx: StateContext<UserStateModel>, action: SaveProfileUserForm) {
    const state = ctx.getState();
    return this.userService.updateuserprofile(state);
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
    });
  }

  @Action(RecipeThumbsDown)
  setRecipeThumbsDown(ctx: StateContext<UserStateModel>, action: RecipeThumbsDown) {
    this.userService.disLikedUserRecipe(action.recipe, action.username).subscribe(data => {
      ctx.setState(
        patch(data)
      );
    });
    }

}
