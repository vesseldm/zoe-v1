import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

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
    public afs: AngularFirestore
  ) {

    this.userId = firebase.auth().currentUser.uid;
    console.log('this.userId = ');
    console.log(this.userId);
    this.afs.doc(`users/${this.userId}`).valueChanges().subscribe(user => {
      this.user = user;
    });

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        console.log('user = ');
        console.log(user);
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

  getUserInfo(userId: string) {
    return this.afs.doc(`users/${userId}`).valueChanges();
  }

  getPlanedRecipes(recipeIds): Observable<any> {
    console.log('getPlanedRecipes called');
    if (recipeIds.length == 0) return of(null);
    return this.afs
      .collection<any>('recipes', ref => ref.where('id', 'in', recipeIds))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            console.log('a = ');
            console.log(a);
            const data = a.payload.doc.data({serverTimestamps: 'none'});
            return { ...data };
          })
        )
      );
  }

  getUserPlans(userId, date): Observable<any> {
    let curr = new Date(date);
    let startDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate());
    let endDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate() + 1);
    // return this.afs
    //   .collection<any>('recipesplan', ref =>
    //     ref
    //       .where('userId', '==', userId)
    //       .where('time', '>=', startDate)
    //       .where('time', '<', endDate)
    //   )
    //   .snapshotChanges()
    //   .pipe(
    //     map(actions =>
    //       actions.map(a => {
    //         const data = a.payload.doc.data();
    //         return { ...data };
    //       })
    //     )
    //   );
    return this.afs
      .collection<any>('mealPlan', ref =>
        ref
          .where('userID', '==', userId)
          .where('date', '>=', startDate)
          .where('date', '<', endDate)
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            console.log('a = ');
            console.log(a);
            const data = a.payload.doc.data({serverTimestamps: 'none'});
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
            const data = a.payload.doc.data({serverTimestamps: 'none'});
            return { ...data };
          })
        )
      );
  }

  updateUser(user) {
    return new Promise<any>((resolve, reject) => {
      console.log('this.userId = ');
      console.log(this.userId);
      this.afs.collection('users').doc(this.userId).update(user);
      resolve(user);
    });
  }
}
