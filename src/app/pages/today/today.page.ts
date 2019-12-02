import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { combineLatest } from 'rxjs';
import { RecipeService } from "../../services/recipe.service";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

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
  weekDays: any = [];
  currentDay: any;
  nutritional: any;
  ingredients: any;
  user: any;
  notification: any;

  constructor(
    public router: Router,
    public userService: UserService,
    public recipeService: RecipeService
  ) { }

  ngOnInit() {

    this.nutritional = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    };
    this.weekDays = [];
    let curr = new Date();
    this.currentDay = new Date();
    let first_day = curr.getDate() - curr.getDay();
    for (let i = 0; i < 7; i++) {
      let next = first_day + i;
      let next_day = new Date(curr.setDate(next));
      this.weekDays.push(next_day);
    }

    this.userService.user$.subscribe(user => {
      if (user && user.id) {
        this.userService.getUserPlans(user.id, this.currentDay.toString()).subscribe(plans => {
          // const recipeIds = plans.map(plan => plan.recipeID);
          let recipeIDs = [];
          for (let i = 0; i < plans.length; i++) {
            for (let j = 0; j < plans[i].recipeIDs.length; j++) {
              recipeIDs.push(plans[i].recipeIDs[j]);
            }
          }
          combineLatest([this.userService.getPlanedRecipes(recipeIDs), this.userService.getAllIngredients()]).subscribe(
            data => {
              const [recipes, ingredients] = data;
              this.recipes = recipes;
              // this.recipeService.recipes$.subscribe(recipes => {
              //   this.recipes = recipes;
              // });
              this.ingredients = ingredients;
              if (recipes) {
                this.initNutritional(recipes);
              }
            }
          );
        });
      }

      this.userService.user$.subscribe(user => {
        if (user) {
          this.user = user;
          this.initRecipes();
        }
      });
    });

    this.notification = "Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit. Nulla quis lectus dolor. Sed et dolor eu elit viverra vestibulum eu vitae velit.";
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
          let ing = this.ingredients.find(i => i.id == ri.id);
          if (ing && ing.average) {
            this.nutritional.calories += ri.amount * parseInt(ing.average.calories);
            this.nutritional.protein += ri.amount * parseInt(ing.average.protein);
            this.nutritional.carbs += ri.amount * parseInt(ing.average.carbs);
            this.nutritional.fats += ri.amount * parseInt(ing.average.fats);
          }
        });
      }
    });
  }

  initRecipes() {
    this.recipeService.initRecipes(this.user.id);
  }

  goProfile() {
    this.router.navigateByUrl('/home/profile');
  }

  editRecipes() {
    this.router.navigateByUrl('/home/recipes');
  }

  goRecipePage(id) {
    this.router.navigate(["/recipe", id]);
  }
}
