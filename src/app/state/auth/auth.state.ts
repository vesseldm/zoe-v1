import { AuthStateModel, Login } from './auth.actions';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { AuthService } from 'src/app/services/auth.service';
import { tap } from 'rxjs/operators';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    email: null
  }
})
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state ? state.token : null;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  constructor(private authService: AuthService) { }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((result: { access_token: string }) => {
        ctx.patchState({
          token: result.access_token,
          email: action.payload.email
        });
      })
    );
  }
}
