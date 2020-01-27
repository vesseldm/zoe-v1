import { IngredientsService } from './ingredients/ingredients.service';
import { UserStateModel, UserIngredientPreference } from './../state/models/user.state.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../state/models/ingredients.state.model';
import { tap } from 'rxjs/operators';

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
    public ingredientsService: IngredientsService
  ) {

  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserInfo(userId: string): Observable<UserStateModel> {
    return this.afs.doc<UserStateModel>(`users/${userId}`).valueChanges();
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

  getAllIngredients(): Observable<any> {
    return this.afs
      .collection<any>('ingredients')
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

  addIngredientPreference(ingredient: Ingredient) {
    return this.afs.collection(`users/${this.userId}/ingredientPreferences`).add(ingredient);
  }

  updateIngredientPreference(ingredient: UserIngredientPreference) {
    return this.afs.doc(`users/${this.userId}/ingredientPreferences/${ingredient.uid}`).update(ingredient);
  }

  updateUser(user) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('users').doc(this.userId).update(user);
      resolve(user);
    });
  }

  getIngredientPreference(): Observable<UserIngredientPreference[]> {
    return this.afs.collection<UserIngredientPreference>(`users/${this.userId}/ingredientPreferences`).valueChanges();
  }
}
