import { RecipeThumbsDown, RecipeThumbsUp } from './../../state/user/user.actions';
import { UserState } from 'src/app/state/user/user.state';
import { UserRecipe } from './../../state/models/user.state.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss']
})
export class RecipePage implements OnInit, OnDestroy {
  @Select(UserState.getSelectedRecipe) getSelectedRecipe$: Observable<UserRecipe>;
  public ngDestroyed$ = new Subject();
  recipeId: any;
  recipe: UserRecipe;
  ingredients: any;
  calories: any;
  protein: number;
  carbs: number;
  fats: number;
  sub: any;

  constructor(
    private store: Store,
    private navCtrl: NavController,
    public userService: UserService
  ) {
  }

  ngOnInit() {
    this.getSelectedRecipe$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(data => {
      console.log('getSelectedRecipe data = ');
      console.log(data);
      this.recipe = data;
    });
    // this.recipeService.getRecipe(this.recipeId).subscribe(recipe => {
    //   this.recipe = recipe;
    //   this.ingredients = [];
    // });
  }

  goBack() {
    // this.router.navigateByUrl("/home/recipes");
    this.navCtrl.back();
  }

  addRecipe() {
    // this.recipeService.addRecipe(this.recipeId);
  }

  shoppingList(ingredient, e) {
    if (e.detail.checked) {
    } else {
    }
  }

  thumbsUp() {
    const updatedRecipe = Object.assign({}, this.recipe);
    updatedRecipe.thumbsUp = true;
    updatedRecipe.thumbsDown = false;
    this.store.dispatch(new RecipeThumbsUp(updatedRecipe));  }

  thumbsDown() {
    const updatedRecipe = Object.assign({}, this.recipe);
    updatedRecipe.thumbsUp = false;
    updatedRecipe.thumbsDown = true;
    this.store.dispatch(new RecipeThumbsDown(updatedRecipe));
  }

  ngOnDestroy() {
    this.ngDestroyed$.next();
  }
}
