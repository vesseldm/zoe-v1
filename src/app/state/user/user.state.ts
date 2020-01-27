import { IngredientsService } from './../../services/ingredients/ingredients.service';
import { UserStateModel, UserIngredientPreference } from './../models/user.state.model';
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
  GetIngredientPreferences
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
    private ingredientsService: IngredientsService,
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
          ctx.setState(user);
          });
        }
      })
    );
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

  @Action(GetIngredientPreferences)
  getIngredientList(ctx: StateContext<UserStateModel>) {
    return this.userService.getIngredientPreference().pipe(tap(userIngredientPreferences => {
      this.ingredientsService.getIngredientList().subscribe(ingredients => {
        ingredients.forEach(ingredient => {
          if (userIngredientPreferences.indexOf(ingredient) === -1) {
            console.log('ingredient = ');
            console.log(ingredient);
            ctx.setState(
              patch({
              ingredientPreferences: append([ingredient])
            }));
            const state = ctx.getState();
            console.log('state.ingredientPreferences = ');
            console.log(state.ingredientPreferences);
          }
        });
      });
    }));
  }

  @Action(IngredientLiked)
  saveIngredientLike(ctx: StateContext<UserStateModel>, action: IngredientLiked ) {
    const state = ctx.getState();
    const updateIngredeintPreference = state.ingredientPreferences.map(ingredient => ingredient.uid === action.ingredient.uid);
    return updateIngredeintPreference ?
      this.updateIngredientPreference(action.ingredient, ctx) : this.addIngredientPreference(action.ingredient, ctx);

  }

  addIngredientPreference(ingredient: UserIngredientPreference, ctx: StateContext<UserStateModel>) {
    return from(this.userService.addIngredientPreference(ingredient)).pipe(tap(() => {
      ctx.patchState(ingredient);
    }));
  }

  updateIngredientPreference(ingredient: UserIngredientPreference, ctx: StateContext<UserStateModel>) {
    return from(this.userService.updateIngredientPreference(ingredient)).pipe(tap(result => {
      console.log('result = ');
      console.log(result);
    }));
  }

  @Action(IngredientDisliked)
  saveIngredientDislike(ctx: StateContext<UserStateModel>, action: IngredientDisliked ) {
    return from(this.userService.addIngredientPreference(action.ingredient)).pipe(tap(() => {
      ctx.patchState(action.ingredient);
    }));
  }
}
