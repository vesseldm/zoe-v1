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

    constructor(private authService: AuthService) {}

    // loginUser(ctx: StateContext<UserStateModel>, action: LoginUser) {
    //     return from(this.authService.login(action.payload)).pipe(
    //       tap(result => {
    //         if (result.user.uid) {
    //           this.userService.setUserId(result.user.uid);
    //           this.userService.getUserInfo(result.user.uid).pipe(take(1)).subscribe(user => {
    //               this.userService.getUserRecipes(result.user.uid).pipe(take(1)).subscribe(recipes => {
    //                 user.recipes = this.setRecipeData(recipes, user);
    //                 if (user.recipes) {
    //                   user.recipes.forEach(recipe => {
    //                     let score = 0;
    //                     if (recipe && recipe.ingredients) {
    //                       recipe.ingredients.forEach(ingredient => {
    //                         user.ingredientPreferences.forEach(ingredientPref => {
    //                           if (ingredientPref.ingredientId === ingredient.ingredientId) {
    //                             score = score + ingredientPref.score;
    //                           }
    //                         });
    //                       });
    //                       recipe.score = score / recipe.ingredients.length;
    //                       console.log('recipe.score = ');
    //                       console.log(recipe.score);
    //                     }
    //                   });
    //                 }
    //                 user.recipes = user.recipes.sort((a, b) => b.score - a.score);
    //                 ctx.setState(user);
    //                 const state = ctx.getState();
    //                 console.log('state = ');
    //                 console.log(state);
    //               });
    //           });
    //         }
    //       })
    //     );

    @Action(Login)
    login(ctx: StateContext<AuthStateModel>, action: Login) {
      return this.authService.login(action.payload).pipe(
        // tap(result => {
            tap((result: { access_token: string }) => {
          console.log('result = ');
          console.log(result);
          ctx.patchState({
            token: result.access_token,
            email: action.payload.email
          });
          const state = ctx.getState();
          console.log('state = ');
          console.log(state);
        })
      );
    }

    // @Action(Logout)
    // logout(ctx: StateContext<AuthStateModel>) {
    //   const state = ctx.getState();
    //   return this.authService.doLogout().pipe(
    //     tap(() => {
    //       ctx.setState({
    //         token: null,
    //         username: null
    //       });
    //     })
    //   );
    // }
  }
