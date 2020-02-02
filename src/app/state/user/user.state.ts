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
  LoginUser,
  SaveProfileUserForm,
  IngredientLiked,
  IngredientDisliked,
  SelectedRecipe,
  RecipeThumbsUp,
  RecipeThumbsDown,
} from './user.actions';


@State<UserStateModel>({
  name: 'user',
  defaults: {
    uid: '',
    profileForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
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
  static allergiesList(state: UserStateModel) {
    return state.allergies;
  }

  @Selector()
  static getIngredientPreferences(state: UserStateModel) {
    return state.ingredientPreferences;
  }

  @Selector()
  static getUsersRecipes(state: UserStateModel) {
    console.log('state.recipes = ');
    console.log(state.recipes);
    return state.recipes;
  }

  @Selector()
  static getSelectedRecipe(state: UserStateModel) {
    return state.selectedRecipe;
  }

  @Action(AddUser)
  addUser(ctx: StateContext<UserStateModel>, action: AddUser) {
    return from(this.authService.registerUser(action.payload)).pipe(
      tap(result => {
        ctx.setState(action.payload);
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

  @Action(LoginUser)
  loginUser(ctx: StateContext<UserStateModel>, action: LoginUser) {
    return from(this.authService.login(action.payload)).pipe(
      tap(result => {
        if (result.user.uid) {
          this.userService.setUserId(result.user.uid);
          this.userService.getUserInfo(result.user.uid).pipe(take(1)).subscribe(user => {
            this.userService.getUserIngredientPreferences(result.user.uid).subscribe(data => {
              user.ingredientPreferences = data;
              this.userService.getUserRecipes(result.user.uid).pipe(take(1)).subscribe(recipes => {
                user.recipes = this.setRecipeData(recipes, user);
                console.log('user.recipes = ');
                console.log(user.recipes);
                ctx.setState(user);
                const state = ctx.getState();
                console.log('state = ');
                console.log(state);
              });
            });
          });
        }
      })
    );
  }


  setRecipeData(recipes, user): UserRecipe[] {
    const newRecipes = [];
    recipes.forEach(recipe => {
      newRecipes.push(this.getIngredientInfo(recipe, user));
    });
    return newRecipes;
  }

  getIngredientInfo(recipe: UserRecipe, user: UserStateModel): UserRecipe {
    const recipeIngredients: UserIngredientPreference[] = [];
    recipe.ingredients.map(ingredient => {
      recipeIngredients.push(this.assignIngredientInfo(ingredient, user));
    });
    recipe.ingredients = recipeIngredients;
    return recipe;
  }

  assignIngredientInfo(ingredient, user: UserStateModel): UserIngredientPreference {
    let newIngredients;
    user.ingredientPreferences.map(ingredientPref => {
      if (ingredientPref.ingredientId === ingredient) {
        newIngredients = ingredientPref;
      }
    });
    return newIngredients;
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
  saveIngredientLike(ctx: StateContext<UserStateModel>, action: IngredientLiked ) {
    return from(this.userService.updateIngredientPreference(action.ingredient)).subscribe(() => {
      ctx.setState(
        patch({
        ingredientPreferences: updateItem(item => item.ingredientId === action.ingredient.ingredientId, action.ingredient)
      }));
    });
  }

  @Action(IngredientDisliked)
  saveIngredientDislike(ctx: StateContext<UserStateModel>, action: IngredientDisliked ) {
    return from(this.userService.updateIngredientPreference(action.ingredient)).subscribe(() => {
      ctx.setState(
        patch({
        ingredientPreferences: updateItem(item => item.ingredientId === action.ingredient.ingredientId, action.ingredient)
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
    this.userService.updateUserRecipe(action.recipe).subscribe(data => {
      ctx.setState(
        patch({
        recipes: updateItem(item => item.uid === action.recipe.uid, action.recipe)
      }));
    });
  }

  @Action(RecipeThumbsDown)
  setRecipeThumbsDown(ctx: StateContext<UserStateModel>, action: RecipeThumbsDown) {
    this.userService.updateUserRecipe(action.recipe).subscribe(data => {
      ctx.setState(
        patch({
        recipes: updateItem(item => item.uid === action.recipe.uid, action.recipe)
      }));
    });
  }
}
