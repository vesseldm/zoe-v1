import { GetIngredientList } from './../../state/ingredients/ingredients.actions';
import { UserIngredientPreference } from './../../state/models/user.state.model';
import { UserState } from './../../state/user/user.state';
import { Ingredient } from '../../state/models/ingredients.state.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { IngredientLiked, IngredientDisliked } from '../../state/user/user.actions';

@Component({
  selector: 'app-food-preferences',
  templateUrl: './food-preferences.page.html',
  styleUrls: ['./food-preferences.page.scss'],
})
export class FoodPreferencesPage implements OnInit, OnDestroy {
  @Select(UserState.getIngredientPreferences) getIngredientPreferences$: Observable<UserIngredientPreference[]>;
  @Select(UserState.getUsername) getUsername$: Observable<string>;
  public ngDestroyed$ = new Subject();
  public username: string;
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
    this.getUsername$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(username => {
      this.username = username;
    });
  }

  ingredientLiked(ingredient: UserIngredientPreference) {
    const newIngredient: UserIngredientPreference = Object.assign({}, ingredient);
    newIngredient.liked = true;
    newIngredient.disliked = false;
    this.store.dispatch(new IngredientLiked(newIngredient, this.username));
  }

  ingredientDisliked(ingredient: UserIngredientPreference) {
    const newIngredient: UserIngredientPreference = Object.assign({}, ingredient);
    newIngredient.liked = false;
    newIngredient.disliked = true;
    this.store.dispatch(new IngredientLiked(newIngredient, this.username));
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
  }

}
