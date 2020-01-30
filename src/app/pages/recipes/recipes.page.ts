import { UserRecipe } from './../../state/models/user.state.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { UserState } from 'src/app/state/user/user.state';
import { takeUntil } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { SelectedRecipe } from 'src/app/state/user/user.actions';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss']
})
export class RecipesPage implements OnInit, OnDestroy {
  @Select(UserState.getUsersRecipes) recipes$: Observable<UserRecipe[]>;
  public ngDestroyed$ = new Subject();
  recipes: UserRecipe[];
  recipesBreakfasts: UserRecipe[];
  recipesLunchs: UserRecipe[];
  recipesDinners: UserRecipe[];
  recipesSnacks: UserRecipe[];
  recipesDrinks: UserRecipe[];
  user: any;

  slideOpts = {
    slidesPerView: 1.7,
    centeredSlides: true,
    loop: true
  };

  constructor(
    public store: Store,
    ) { }

  ngOnInit() {
    this.recipes$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(data => {
      console.log('recipes data = ');
      console.log(data);
      this.recipes = data;
    });

    this.recipesBreakfasts = [];
    this.recipesLunchs = [];
    this.recipesDinners = [];
    this.recipesDrinks = [];
    this.recipesSnacks = [];

    this.recipes.forEach(item => {
      switch (item.type) {
          case 'Breakfast':
            this.recipesBreakfasts.push(item);
            break;

          case 'Lunch':
            this.recipesLunchs.push(item);
            break;

          case 'Dinner':
            this.recipesDinners.push(item);
            break;

          case 'Drink':
            this.recipesDrinks.push(item);
            break;

          case 'Snack':
            this.recipesSnacks.push(item);
            break;

          default:
            break;
        }
      });
    this.orderByScore();

    // this.userService.user$.subscribe(user => {
    //   if (user) this.user = user;
    // });
  }

  orderByScore() {
    this.recipesBreakfasts = this.recipesBreakfasts.sort((a, b) => b.score - a.score);
    this.recipesLunchs = this.recipesLunchs.sort((a, b) => b.score - a.score);
    this.recipesDinners = this.recipesDinners.sort((a, b) => b.score - a.score);
    this.recipesDrinks = this.recipesDrinks.sort((a, b) => b.score - a.score);
    this.recipesSnacks = this.recipesSnacks.sort((a, b) => b.score - a.score);
  }

  goRecipePage(recipe: UserRecipe) {
    this.store.dispatch(new SelectedRecipe(recipe)).subscribe(() => {
      this.store.dispatch(new Navigate(['/recipe']));
    });
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
  }
}
