import { UserService } from './../../services/user.service';
import { ProfileFormModel } from './../models/user.state.model';
import { DocumentReference } from '@angular/fire/firestore';
import { AuthService } from './../../services/auth.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { from } from 'rxjs';
import { tap, takeUntil, take } from 'rxjs/operators';
import { AddUser, AddSocialUser, LoginUser, SaveProfileUserForm } from './user.actions';
import { UserStateModel } from '../models/user.state.model';


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
    console.log('state = ');
    console.log(state.allergies);
    return state.allergies;
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
}
