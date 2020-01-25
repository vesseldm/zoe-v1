import { Ingredient, IngredientsStateModel } from './../../state/models/ingredients.state.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(
    public angularFireStore: AngularFirestore
  ) { }

  getIngredientList() {
    return this.angularFireStore.collection<any[]>('ingredients').valueChanges({idField: 'uid'});
  }
}
