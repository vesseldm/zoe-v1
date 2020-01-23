import { UserStateModel } from './../state/models/user.state.model';
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
    console.log('firebase.auth().currentUser = ');
    console.log(firebase.auth().currentUser);
    if (firebase.auth().currentUser) {

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
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserInfo(userId: string): Observable<UserStateModel> {
    return this.afs.doc<UserStateModel>(`users/${userId}`).valueChanges();
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
