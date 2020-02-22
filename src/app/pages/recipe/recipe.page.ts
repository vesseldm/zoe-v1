import { RecipeThumbsDown, RecipeThumbsUp, AddRecipeToList } from './../../state/user/user.actions';
import { UserState } from 'src/app/state/user/user.state';
import { UserRecipe } from './../../state/models/user.state.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss']
})
export class RecipePage implements OnInit, OnDestroy {
  @Select(UserState.getSelectedRecipe) getSelectedRecipe$: Observable<UserRecipe>;
  @Select(UserState.getUsername) getUsername$: Observable<string>;
  public ingredientPreferences;
  public username: string;
  public ngDestroyed$ = new Subject();
  recipeId: any;
  recipe: UserRecipe;

  constructor(
    private store: Store,
    private navCtrl: NavController,
  ) {
  }

  ngOnInit() {
    this.getSelectedRecipe$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(data => {
      this.recipe = data;
    });
    this.getUsername$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(username => {
      this.username = username;
    });
  }

  goBack() {
    // this.router.navigateByUrl("/home/recipes");
    this.navCtrl.back();
  }

  addRecipe() {
    this.store.dispatch(new AddRecipeToList(this.recipe)).subscribe(result => {
      this.store.dispatch(new Navigate(['/mylist']));
    });
  }

  shoppingList(ingredient, e) {
    if (e.detail.checked) {
    } else {
    }
  }

  thumbsUp() {
    this.store.dispatch(new RecipeThumbsUp(this.recipe, this.username))};

  thumbsDown() {
    this.store.dispatch(new RecipeThumbsDown(this.recipe, this.username));
  }

  ngOnDestroy() {
    this.ngDestroyed$.next();
  }
}
