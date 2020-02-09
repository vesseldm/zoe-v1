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
          recipeIngredients.push(this.assignIngredientInfo(ingredient, user));
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
  saveIngredientLike(ctx: StateContext<UserStateModel>, action: IngredientLiked) {
    return from(this.userService.updateIngredientPreference(action.ingredient)).subscribe(() => {
      ctx.setState(
        patch({
          ingredientPreferences: updateItem(item => item.ingredientId === action.ingredient.ingredientId, action.ingredient)
        }));
    });
  }

  @Action(IngredientDisliked)
  saveIngredientDislike(ctx: StateContext<UserStateModel>, action: IngredientDisliked) {
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
      const state = ctx.getState();
      state.ingredientPreferences.forEach(ingredient => {
        action.recipe.ingredients.forEach(recIngredient => {
          if (recIngredient.ingredientId === ingredient.ingredientId) {
            ctx.dispatch(new RaiseIngredientsScore(ingredient));
          }
        });
      });
    });
  }

  @Action(RaiseIngredientsScore)
  raiseIngredientsScore(ctx: StateContext<UserStateModel>, action: RaiseIngredientsScore) {
    const newObj = Object.assign({}, action.ingredient);
    newObj.score = newObj.score + 1;
    ctx.setState(
      patch({
        ingredientPreferences: updateItem(item => item.ingredientId === action.ingredient.ingredientId, newObj)
      }));
    const state = ctx.getState();
    console.log('state = ');
    console.log(state);
    from(this.userService.updateUser(state)).subscribe(data => {
      console.log('data = ');
      console.log(data);
    });
  }

  @Action(RecipeThumbsDown)
  setRecipeThumbsDown(ctx: StateContext<UserStateModel>, action: RecipeThumbsDown) {
    this.userService.updateUserRecipe(action.recipe).subscribe(data => {
      ctx.setState(
        patch({
          recipes: updateItem(item => item.uid === action.recipe.uid, action.recipe)
        }));
      // ctx.dispatch(new LowerIngredientsScore(action.recipe.ingredients));
    });
  }


  //   @Action(LowerIngredientsScore)
  //   lowerIngredientsScore(ctx: StateContext<UserStateModel>, action: LowerIngredientsScore) {
  //     console.log('LOWER RAN');
  //     action.ingredients.map(ingredient => {
  //       const newIngredient = Object.assign({}, ingredient);
  //       newIngredient.score = newIngredient.score - 1;
  //       ctx.setState(
  //         patch({
  //           ingredientPreferences: updateItem(item => item.ingredientId === ingredient.ingredientId, newIngredient)
  //       }));
  //     });
  //     const state = ctx.getState();
  //     from(this.userService.updateUser(state)).subscribe(data => {
  //     });
  //   }
}
