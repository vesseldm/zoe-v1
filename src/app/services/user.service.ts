import { UserStateModel, UserIngredientPreference, UserRecipe } from './../state/models/user.state.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthState } from '../state/auth/auth.state';
import { Select } from '@ngxs/store';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<any>;
  users$: Observable<any>;
  @Select(AuthState.token) token$: Observable<string>;
  token: string;

  public userId: any;
  public user: any;
  public url: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.token$.subscribe(token => {
      this.token = token;
    });
    this.url = environment.apiUrl;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  updateIngredient(ingredient: UserIngredientPreference, username: string) {
    const header = {Authorization: `Bearer ${this.token}`};
    return this.httpClient.post<UserStateModel>(
      this.url + '/users/updateuseringredient',
      {
        ingredient,
        username,
      },
      {headers: header},
    );
  }

  likedUserRecipe(recipe: UserRecipe, username: string) {
    const header = {Authorization: `Bearer ${this.token}`};
    return this.httpClient.post<UserStateModel>(
      this.url + '/users/likeduserrecipe',
      {
        recipe,
        username,
      },
      {headers: header},
    );
  }

  disLikedUserRecipe(recipe: UserRecipe, username: string) {
    const header = {Authorization: `Bearer ${this.token}`};
    return this.httpClient.post<UserStateModel>(
      this.url + '/users/dislikeduserrecipe',
      {
        recipe,
        username,
      },
      {headers: header},
    );
  }


  getUserData(email): Observable<any> {
    const header = {Authorization: `Bearer ${this.token}`};
    return this.httpClient.post<UserStateModel>(
      this.url + '/users/getUserData',
      {
        email
      },
      {headers: header},
    );
  }

  updateuserprofile(userState: UserStateModel): Observable<any> {
    const header = {Authorization: `Bearer ${this.token}`};
    return this.httpClient.post<UserStateModel>(
      this.url + '/users/updateuserprofile',
      {
        userState
      },
      {headers: header},
    );
  }

  createNewUserRecipes(username) {
    const header = {Authorization: `Bearer ${this.token}`};
    return this.httpClient.post<UserStateModel>(
      this.url + '/users/createuserrecipe',
      {
        username
      },
      {headers: header},
    );
  }

  addRecipeToList(recipe: UserRecipe, username: string) {
    const header = {Authorization: `Bearer ${this.token}`};
    return this.httpClient.post<UserStateModel>(
      this.url + '/users/addrecipetolist',
      {
        username,
        recipe
      },
      {headers: header},
    );
  }
}
