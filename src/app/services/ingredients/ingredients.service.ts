import { Ingredient } from './../../state/models/ingredients.state.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(
    public angularFireStore: AngularFirestore
  ) { }

  getIngredientList() {
    console.log('rsana')
    return this.angularFireStore.collection<Ingredient>('ingredients').valueChanges();
  }
}
