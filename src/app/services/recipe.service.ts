import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  recipes$: Observable<any>;
  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {
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
}
