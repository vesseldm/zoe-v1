import { Observable } from 'rxjs';
import { UserIngredientPreference } from './../../state/models/user.state.model';
import { Ingredient, IngredientsStateModel } from './../../state/models/ingredients.state.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(
    public angularFireStore: AngularFirestore
  ) { }

  getIngredientList(): Observable<UserIngredientPreference[]> {
    return this.angularFireStore.collection<UserIngredientPreference>('ingredients').valueChanges();
  }
}
