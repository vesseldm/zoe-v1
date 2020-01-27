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
    console.log('state = ');
    console.log(state);
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
            this.userService.getUserIngredientPreferences(result.user.uid).subscribe(data => {
              user.ingredientPreferences = data;
              ctx.setState(user);
            });
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

  @Action(IngredientLiked)
  saveIngredientLike(ctx: StateContext<UserStateModel>, action: IngredientLiked ) {
    console.log('action = ');
    console.log(action);
    return from(this.userService.updateIngredientPreference(action.ingredient)).subscribe(() => {
      ctx.setState(
        patch({
        ingredientPreferences: updateItem(item => item.uid === action.ingredient.uid, action.ingredient)
      }));
    });
  }

  @Action(IngredientDisliked)
  saveIngredientDislike(ctx: StateContext<UserStateModel>, action: IngredientDisliked ) {
    return from(this.userService.updateIngredientPreference(action.ingredient)).subscribe(() => {
      ctx.setState(
        patch({
        ingredientPreferences: updateItem(item => item.uid === action.ingredient.uid, action.ingredient)
      }));
    });
  }
}
