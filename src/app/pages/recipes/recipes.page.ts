import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RecipeService } from "../../services/recipe.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.page.html",
  styleUrls: ["./recipes.page.scss"]
})
export class RecipesPage implements OnInit {
  recipes: any;
  recipes_breakfasts: any;
  recipes_lunchs: any;
  recipes_dinners: any;
  recipes_snacks: any;
  recipes_drinks: any;

  slideOpts = {
    slidesPerView: 1.7,
    centeredSlides: true,
    loop: true
  };

  constructor(public router: Router, public recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.recipes$.subscribe(recipes => {
      this.recipes = recipes;
      this.recipes_breakfasts = [];
      this.recipes_lunchs = [];
      this.recipes_dinners = [];
      this.recipes_drinks = [];
      this.recipes_snacks = [];

      recipes.forEach(item => {
        switch (item.type) {
          case "Breakfast":
            this.recipes_breakfasts.push(item);
            break;

          case "Lunch":
            this.recipes_lunchs.push(item);
            break;

          case "Dinner":
            this.recipes_dinners.push(item);
            break;

          case "Drinks":
            this.recipes_drinks.push(item);
            break;

          case "Snacks":
            this.recipes_snacks.push(item);
            break;

          default:
            break;
        }
      });
    });
  }

  goRecipePage(id) {
    this.router.navigate(["/recipe", id]);
  }
}
