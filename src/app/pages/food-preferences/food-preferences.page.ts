import { GetIngredientPreferences } from './../../state/user/user.actions';
import { UserState } from './../../state/user/user.state';
import { Ingredient } from '../../state/models/ingredients.state.model';
import { IngredientsState } from './../../state/ingredients/ingredients.state';
import { IngredientsStateModel } from './../../state/models/ingredients.state.model';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { IngredientLiked, IngredientDisliked } from '../../state/user/user.actions';

@Component({
  selector: 'app-food-preferences',
  templateUrl: './food-preferences.page.html',
  styleUrls: ['./food-preferences.page.scss'],
})
export class FoodPreferencesPage implements OnInit {
  @Select(IngredientsState.getIngredients) ingredients$: Observable<IngredientsStateModel>;
  @Select(UserState.getIngredientPreferences) getIngredientPreferences$: Observable<any>;
  public ngDestroyed$ = new Subject();
  ingredients: Ingredient[];
  constructor(
    private store: Store,
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetIngredientPreferences());
    this.ingredients$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(data => {
      if (data) {
        this.ingredients = data.ingredients;
      }
    });
    this.getIngredientPreferences$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(data => {
      console.log('getIngredientPreferences data = ');
      console.log(data);
    });
  }

  ingredientLiked(ingredient: Ingredient) {
    const newIngredient: Ingredient = Object.assign({}, ingredient);
    newIngredient.liked = true;
    newIngredient.disliked = false;
    this.store.dispatch(new IngredientLiked(newIngredient));
  }

  ingredientDisliked(ingredient: Ingredient) {
    const newIngredient: Ingredient = Object.assign({}, ingredient);
    newIngredient.liked = false;
    newIngredient.disliked = true;
    this.store.dispatch(new IngredientDisliked(newIngredient));
  }

}
