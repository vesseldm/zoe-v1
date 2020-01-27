import { GetIngredientList } from './../../state/ingredients/ingredients.actions';
import { UserIngredientPreference } from './../../state/models/user.state.model';
import { UserState } from './../../state/user/user.state';
import { Ingredient } from '../../state/models/ingredients.state.model';
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
  @Select(UserState.getIngredientPreferences) getIngredientPreferences$: Observable<UserIngredientPreference[]>;
  public ngDestroyed$ = new Subject();
  constructor(
    private store: Store,
  ) { }

  ngOnInit() {
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