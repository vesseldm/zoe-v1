import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<any>;
  users$: Observable<any>;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.users$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.collection(`users`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getPlanedRecipes(recipeIds): Observable<any> {
    if (recipeIds.length == 0) return of(null);
    return this.afs
      .collection<any>('recipes', ref => ref.where('id', 'in', recipeIds))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            return { ...data };
          })
        )
      );
  }

  getUserPlans(userId, date): Observable<any> {
    let curr = new Date(date);
    let startDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate());
    let endDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate() + 1);
    return this.afs
      .collection<any>('recipesplan', ref =>
        ref
          .where('userId', '==', userId)
          .where('time', '>=', startDate)
          .where('time', '<', endDate)
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
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
            const data = a.payload.doc.data();
            return { ...data };
          })
        )
      );
  }
}
