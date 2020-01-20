import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes$: Observable<any>;

  public userId: any;
  public user: any;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {

    this.userId = firebase.auth().currentUser.uid;
    this.afs.doc(`users/${this.userId}`).valueChanges().subscribe(user => {
      this.user = user;
    });

    this.recipes$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.collection(`recipes`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getRecipe(recipeId) {
    return this.afs
      .collection('recipes')
      .doc(recipeId)
      .valueChanges();
  }

  getIngredient(ingredientId) {
    return this.afs
      .collection('ingredients')
      .doc(ingredientId)
      .valueChanges();
  }

  addRecipe(recipeId) {
    console.log(recipeId);
  }

  initRecipes(userID) {
    const curr = new Date();
    let first_day = curr.getDate() - curr.getDay();
    for (let i = 0; i < 14; i++) {
      this.recipes$.subscribe(recipeRes => {
        const recipeIDs = [];

        for (let j = 0; j < 3; j++) {
          const ran = Math.floor(Math.random() * recipeRes.length);
          recipeIDs.push(recipeRes[ran].id)
        }

        const next = first_day + i;
        let next_day = new Date(curr.setDate(next));

        const startDate = new Date(next_day.getFullYear(), next_day.getMonth(), next_day.getDate());
        const endDate = new Date(next_day.getFullYear(), next_day.getMonth(), next_day.getDate() + 1);
        this.afs
          .collection<any>('mealPlan', ref =>
            ref
              .where('userID', '==', userID)
              .where('date', '>=', startDate)
              .where('date', '<', endDate)
          )
          .snapshotChanges().subscribe(res => {
            if (!res.length) {
              this.afs.collection('mealPlan').add({
                userID: userID,
                recipeIDs: recipeIDs,
                date: next_day
              });
            }
          });
      })
    }
  }

  getFeaturedRecipe() {
    return this.afs
      .collection<any>('mealPlan', ref =>
        ref.where('userID', '==', this.userId)
      )
      .snapshotChanges()
      .pipe(
        map(actions => {
          const recipeIds = [];
          actions.forEach(action => {
            const recipeIDs = action.payload.doc.data(({serverTimestamps: 'none'})).recipeIDs;
            recipeIDs.forEach(recipeId => {
              recipeIds.push(recipeId);
            });
          });
          // console.log(recipeIds);

          const findDuplicates = (arr) => {
            let sorted_arr = arr.slice().sort(); // You can define the comparing function here. 
            // JS by default uses a crappy string compare.
            // (we use slice to clone the array so the
            // original array won't be modified)
            const results = [];
            for (let i = 0; i < sorted_arr.length - 1; i++) {
              if (sorted_arr[i + 1] == sorted_arr[i]) {
                results.push(sorted_arr[i]);
              }
            }
            return results;
          }
          console.log(findDuplicates(recipeIds));
        })
      );
  }
}
