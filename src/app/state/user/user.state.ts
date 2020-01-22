import { DocumentReference } from '@angular/fire/firestore';
import { AuthService } from './../../services/auth.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddUser, AddSocialUser, LoginUser } from './user.actions';
import { UserStateModel } from '../models/user.state.model';


@State<UserStateModel>({
  name: 'user'
})
export class UserState {
  constructor(private authService: AuthService) {}

  @Selector()
  static loggedIn(state: UserStateModel) {
    console.log('state = ');
    console.log(state);
    return state.uid;
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
        const user: UserStateModel = {
          uid: result.user.uid,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };
        ctx.setState(user);
      })
    );
  }
}
