import { UserState } from './../../state/user/user.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';
import { Store, Select } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-today',
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss']
})
export class TodayPage implements OnInit, OnDestroy {
  @Select(UserState.loggedIn) loggedIn$: Observable<string>;
  public ngDestroyed$ = new Subject();
  slideOpts = {
    slidesPerView: 1.7,
    centeredSlides: true,
    loop: true,
    autoHeight: true
  };
  recipes: any;
  featuredRecipe: any;
  weekDays: any = [];
  currentDay: any;
  nutritional: any;
  ingredients: any;
  user: any;
  notification: any;

  constructor(
    public recipeService: RecipeService,
    private store: Store,
  ) { }

  ngOnInit() {
    this.checkIfUserIsLoggedIn();
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
    this.recipeService.initRecipes(this.user.id);
  }

  goProfile() {
    this.store.dispatch(new Navigate(['/home/profile']));
  }

  editRecipes() {
    this.store.dispatch(new Navigate(['/home/recipes']));
  }

  goRecipePage(id) {
    // id needs to be passed
    console.log('id = ');
    console.log(id);
    this.store.dispatch(new Navigate(['/recipe']));
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
  }

}
