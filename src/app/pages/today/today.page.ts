import { UserState } from './../../state/user/user.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { takeUntil } from 'rxjs/operators';
import { UserRecipe } from '../../state/models/user.state.model';
import { SelectedRecipe, GetUserData } from '../../state/user/user.actions';

@Component({
  selector: 'app-today',
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss']
})
export class TodayPage implements OnInit, OnDestroy {
  @Select(UserState.loggedIn) loggedIn$: Observable<string>;
  @Select(UserState.getUsername) username$: Observable<string>;
  @Select(UserState.getUsersRecipes) recipes$: Observable<UserRecipe[]>;
  public ngDestroyed$ = new Subject();
  slideOpts = {
    slidesPerView: 1.7,
    centeredSlides: true,
    loop: true,
    autoHeight: true
  };
  recipes: UserRecipe[];
  featuredRecipe: UserRecipe;
  weekDays: any = [];
  currentDay: any;
  nutritional: any;
  ingredients: any;
  user: any;
  notification: any;
  public username;

  constructor(
    private store: Store,
  ) { }

  ngOnInit() {
    this.checkIfUserIsLoggedIn();
    this.getRecipes();
    this.nutritional = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    };
    this.weekDays = [];
    const curr = new Date();
    this.currentDay = new Date();
    const firstDay = curr.getDate() - curr.getDay();
    for (let i = 0; i < 7; i++) {
      const next = firstDay + i;
      const nextDay = new Date(curr.setDate(next));
      this.weekDays.push(nextDay);
    }
      /////////////////////////
      // Get Featured Recipe //
      /////////////////////////
    const tomorrow = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate() + 1);
    this.notification = 'Nulla quis lectus dolor. Sed et dolor eu elit viverra vestibulum eu vitae velit.';
  }

  getRecipes() {
    this.recipes$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(data => {
      console.log('data = ');
      console.log(data);
      this.recipes = data;
      if (this.recipes) {
        this.featuredRecipe = this.recipes[0];
      }

    });
    this.username$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(data => {
      this.username = data;
      this.store.dispatch(new GetUserData(this.username));
    });
  }


  checkIfUserIsLoggedIn() {
    this.loggedIn$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(data => {
      console.log('data = ');
      console.log(data);
    });
  }

  initNutritional(recipes) {
    this.nutritional = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    };
    recipes.forEach(recipe => {
      if (recipe.ingredients) {
        recipe.ingredients.forEach(ri => {
          const ing = this.ingredients.find(i => i.id === ri.id);
          if (ing && ing.average) {
            this.nutritional.calories += ri.amount * parseInt(ing.average.calories, 2);
            this.nutritional.protein += ri.amount * parseInt(ing.average.protein, 2);
            this.nutritional.carbs += ri.amount * parseInt(ing.average.carbs, 2);
            this.nutritional.fats += ri.amount * parseInt(ing.average.fats, 2);
          }
        });
      }
    });
  }

  initRecipes() {
    // this.recipeService.initRecipes(this.user.id);
  }

  goProfile() {
    this.store.dispatch(new Navigate(['/home/profile']));
  }

  editRecipes() {
    this.store.dispatch(new Navigate(['/home/recipes']));
  }

  goRecipePage(recipe: UserRecipe) {
    // id needs to be passed
    this.store.dispatch(new SelectedRecipe(recipe)).subscribe(() => {
      this.store.dispatch(new Navigate(['/recipe']));
    });
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
  }

}
