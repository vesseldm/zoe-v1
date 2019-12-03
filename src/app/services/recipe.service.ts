import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: "root"
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
      .collection("recipes")
      .doc(recipeId)
      .valueChanges();
  }

  getIngredient(ingredientId) {
    return this.afs
      .collection("ingredients")
      .doc(ingredientId)
      .valueChanges();
  }

  addRecipe(recipeId) {
    console.log(recipeId);
  }

  initRecipes(userID) {
    let curr = new Date();
    let first_day = curr.getDate() - curr.getDay();
    for (let i = 0; i < 14; i++) {
      this.recipes$.subscribe(recipeRes => {
        let recipeIDs = [];

        for (let j = 0; j < 3; j++) {
          let ran = Math.floor(Math.random() * recipeRes.length);
          recipeIDs.push(recipeRes[ran].id)
        }

        let next = first_day + i;
        let next_day = new Date(curr.setDate(next));

        let startDate = new Date(next_day.getFullYear(), next_day.getMonth(), next_day.getDate());
        let endDate = new Date(next_day.getFullYear(), next_day.getMonth(), next_day.getDate() + 1);
        this.afs
          .collection<any>('mealPlan', ref =>
            ref
              .where('userID', '==', userID)
              .where('date', '>=', startDate)
              .where('date', '<', endDate)
          )
          .snapshotChanges().subscribe(res => {
            if (!res.length) {
              this.afs.collection("mealPlan").add({
                userID: userID,
                recipeIDs: recipeIDs,
                date: next_day
              });
            }
          });
      })
    }
  }
}
