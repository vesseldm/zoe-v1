import { DocumentReference } from '@angular/fire/firestore';
import { AuthService } from './../../services/auth.service';
import { State, Action, StateContext } from '@ngxs/store';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddUser, AddSocialUser } from './user.actions';
import { UserStateModel } from '../models/user.state.model';


@State<UserStateModel>({
  name: 'user'
})
export class UserState {
  constructor(private authService: AuthService) {}
  @Action(AddUser)
  addUser(ctx: StateContext<UserStateModel>, action: AddUser) {
    return from(this.authService.registerUser(action.payload)).pipe(
      tap(result => {
        console.log('result = ');
        console.log(result);
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
}
