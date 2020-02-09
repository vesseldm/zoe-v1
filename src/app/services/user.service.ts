import { UserStateModel, UserIngredientPreference, UserRecipe } from './../state/models/user.state.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<any>;
  users$: Observable<any>;

  public userId: any;
  public user: any;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private httpClient: HttpClient,
  ) {

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

  updateIngredientPreference(ingredient: UserIngredientPreference) {
    // this.updateRecipeScores();
    return this.afs.doc(`users/${this.userId}/ingredientPreferences/${ingredient.uid}`).update(ingredient);
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

  updateUser(user) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('users').doc(this.userId).update(user);
      resolve(user);
    });
  }

  updateUserRecipe(recipe: UserRecipe) {
    console.log('recipe = ');
    console.log(recipe);
    console.log('recipe.uid = ');
    console.log(recipe.uid);
    // this.updateIngredientScores(recipe.uid);
    return from(this.afs.doc(`users/${this.userId}/recipes/${recipe.uid}`).update(recipe));
  }


  updateIngredientScores(uid) {
    this.httpClient.post(
      'https://us-central1-zoe-v1-19ba3.cloudfunctions.net/updateUserRecipe/api/updateUserReicpe/',
      {userId: this.userId, uid})
        .subscribe(data => {
          console.log('data = ');
          console.log(data);
        });
  }

  // his.http.request(method, baseUrl + route, {
  //   body: data,
  //   responseType: 'json',
  //   observe: 'body',
  //   headers: header
  // });

  getUserData(token, email): Observable<UserStateModel> {
    const header = {Authorization: `Bearer ${token}`};
    return this.httpClient.post<UserStateModel>(
      'http://localhost:3000/users/getUserData',
      {
        email
      },
      {headers: header},
    );
  }

  createNewIngredients(user) {
    console.log('user = ');
    console.log(user);
    this.afs.collection('ingredients/').get().subscribe(ingredients => {
      const ingredientPreferences = [];
      ingredients.forEach(ingredient => {
        ingredientPreferences.push(ingredient.data());
      });
      this.afs.doc(`users/${user.uid}`).update({ingredientPreferences}).finally(() => {
      });
      this.createNewUserRecipes(user);
    });
  }

  createNewUserRecipes(user) {
    this.afs.collection('recipes/').get().subscribe(recipes => {
      recipes.forEach(recipe => {
        console.log('recipe = ');
        console.log(recipe.data());
        return this.afs.collection(`users/${user.uid}/recipes`).add(recipe.data()).then(() => {
      });
    });
  });
  }
}
