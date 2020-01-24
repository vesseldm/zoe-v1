import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-today',
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss']
})
export class TodayPage implements OnInit {
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
    // this.userService.getUserPlans(this.currentDay.toString()).subscribe(plans => {
    //       const recipeIDs = [];
    //       for (let i = 0; i < plans.length; i++) {
    //         for (let j = 0; j < plans[i].recipeIDs.length; j++) {
    //           recipeIDs.push(plans[i].recipeIDs[j]);
    //         }
    //       }
    //       combineLatest([this.userService.getPlanedRecipes(recipeIDs), this.userService.getAllIngredients()]).subscribe(
    //         data => {
    //           const [recipes, ingredients] = data;
    //           this.recipes = recipes;
    //           this.ingredients = ingredients;
    //           if (recipes) {
    //             this.initNutritional(recipes);
    //           }
    //         }
    //       );
    //     });

    // this.userService.user$.subscribe(userData => {
    //     if (userData) {
    //       this.user = userData;
    //       this.initRecipes();
    //     }
      // });


      /////////////////////////
      // Get Featured Recipe //
      /////////////////////////
    const tomorrow = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate() + 1);
    // this.userService.getUserPlans(tomorrow.toString()).subscribe(plans => {
    //     const recipeIDs = [];
    //     for (let i = 0; i < plans.length; i++) {
    //       for (let j = 0; j < plans[i].recipeIDs.length; j++) {
    //         recipeIDs.push(plans[i].recipeIDs[j]);
    //       }
    //     }
    //     const featuredRecipeId = recipeIDs[0];
    //     this.recipeService.getRecipe(featuredRecipeId).subscribe(res => {
    //       this.featuredRecipe = res;
    //     });
    //   });

    this.notification = 'Nulla quis lectus dolor. Sed et dolor eu elit viverra vestibulum eu vitae velit.';
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
}
