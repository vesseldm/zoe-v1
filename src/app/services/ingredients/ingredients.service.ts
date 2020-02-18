import { Observable } from 'rxjs';
import { UserIngredientPreference } from './../../state/models/user.state.model';
import { Ingredient, IngredientsStateModel } from './../../state/models/ingredients.state.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(
  ) { }

  getIngredientList() {
    // return this.angularFireStore.collection<UserIngredientPreference>('ingredients').valueChanges({idField: 'uid'});
  }
}
