import { UserStateModel, UserIngredientPreference, UserRecipe } from './../state/models/user.state.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private httpClient: HttpClient,
  ) {
    this.token$.subscribe(token => {
      this.token = token;
    });

  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserInfo(userId: string): Observable<UserStateModel> {
    return this.afs.doc<UserStateModel>(`users/${userId}`).valueChanges().pipe(tap(result => {
      console.log('result from service = ');
      console.log(result);
    }));
  }

  getUserIngredientPreferences(userId) {
    return this.afs.collection<UserIngredientPreference>(`users/${userId}/ingredientPreferences`)
    .valueChanges({idField: 'uid'}).pipe(tap(result => {
      console.log('result from getUserIngredientPreferences = ');
      console.log(result);
    }));
  }

  getUserRecipes(userId) {
    return this.afs.collection<any>(`users/${userId}/recipes`)
    .valueChanges({idField: 'uid'})
    .pipe(tap(result => {
      console.log('result from getUserRecipes = ');
      console.log(result);
    }));
  }

  getPlanedRecipes(recipeIds): Observable<any> {
    console.log('getPlanedRecipes called');
    if (recipeIds.length === 0) { return of(null); }
    return this.afs
      .collection<any>('recipes', ref => ref.where('id', 'in', recipeIds))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data({ serverTimestamps: 'none' });
            return { ...data };
          })
        )
      );
  }

  getUserPlans(date): Observable<any> {
    const curr = new Date(date);
    const startDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate());
    const endDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate() + 1);
    return this.afs
      .collection<any>('mealPlan', ref =>
        ref
          .where('userID', '==', this.userId)
          .where('date', '>=', startDate)
          .where('date', '<', endDate)
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data({ serverTimestamps: 'none' });
            return { ...data };
          })
        )
      );
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

  updateRecipeScores() {
    this.httpClient.post(
      'https://us-central1-zoe-v1-19ba3.cloudfunctions.net/updateIngredientPreferences/api/updateIngredientPreferences/',
      {userId: this.userId})
        .subscribe(data => {
          console.log('data = ');
          console.log(data);
        });
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

  createNewIngredients(user) {

  }

  createNewUserRecipes(username) {
    console.log('username = ');
    console.log(username);
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
