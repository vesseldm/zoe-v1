import { UserStateModel, UserIngredientPreference } from './../state/models/user.state.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
    return this.afs.collection<UserIngredientPreference>(`users/${userId}/ingredientPreferences`).valueChanges().pipe(tap(result => {
      console.log('result from getUserIngredientPreferences = ');
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
    return this.afs.doc(`users/${this.userId}/ingredientPreferences/${ingredient.uid}`).update(ingredient);
  }

  updateUser(user) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('users').doc(this.userId).update(user);
      resolve(user);
    });
  }
}
