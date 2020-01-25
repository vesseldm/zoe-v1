import { Ingredient } from '../../state/models/ingredients.state.model';
import { IngredientsState } from './../../state/ingredients/ingredients.state';
import { IngredientsStateModel } from './../../state/models/ingredients.state.model';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { IngredientLiked } from '../../state/user/user.actions';

@Component({
  selector: 'app-food-preferences',
  templateUrl: './food-preferences.page.html',
  styleUrls: ['./food-preferences.page.scss'],
})
export class FoodPreferencesPage implements OnInit {
  @Select(IngredientsState.getIngredients) ingredients$: Observable<IngredientsStateModel>;
  public ngDestroyed$ = new Subject();
  ingredients;
  constructor(
    private store: Store,
  ) { }

  ngOnInit() {
    this.ingredients$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(data => {
      if (data) {
        console.log('data = ');
        console.log(data);
        this.ingredients = data;
      }
    });
  }

  ingredientLiked(ingredient: Ingredient) {
    ingredient.score = ingredient.score++;
    ingredient.liked = true;
    ingredient.disliked = false;
    this.store.dispatch(new IngredientLiked(ingredient));
  }

  ingredientDisliked(ingredient: Ingredient) {
    ingredient.score = ingredient.score - 1;
  }

}
