import { UserStateModel, UserIngredientPreference, UserRecipe } from './../state/models/user.state.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthState } from '../state/auth/auth.state';
import { Select } from '@ngxs/store';


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

  constructor(
    private httpClient: HttpClient,
  ) {
    this.token$.subscribe(token => {
      this.token = token;
    });

  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  updateIngredient(ingredient: UserIngredientPreference, username: string) {
    const header = {Authorization: `Bearer ${this.token}`};
    return this.httpClient.post<UserStateModel>(
      'http://localhost:3000/users/updateuseringredient',
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
      'http://localhost:3000/users/likeduserrecipe',
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
      'http://localhost:3000/users/dislikeduserrecipe',
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
      'http://localhost:3000/users/getUserData',
      {
        email
      },
      {headers: header},
    );
  }

  updateuserprofile(userState: UserStateModel): Observable<any> {
    const header = {Authorization: `Bearer ${this.token}`};
    return this.httpClient.post<UserStateModel>(
      'http://localhost:3000/users/updateuserprofile',
      {
        userState
      },
      {headers: header},
    );
  }

  createNewUserRecipes(username) {
    const header = {Authorization: `Bearer ${this.token}`};
    return this.httpClient.post<UserStateModel>(
      'http://localhost:3000/users/createuserrecipe',
      {
        username
      },
      {headers: header},
    );
  }
}
