import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { RecipeService } from "../../services/recipe.service";
import { UserService } from '../../services/user.service';
import { IngredientService } from "../../services/ingredient.service";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.page.html",
  styleUrls: ["./recipe.page.scss"]
})
export class RecipePage implements OnInit {
  recipeId: any;
  recipe: any;
  ingredients: any;
  calories: any;
  protein: Number;
  carbs: Number;
  fats: Number;
  sub: any;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public recipeService: RecipeService,
    public ingredientService: IngredientService,
    private navCtrl: NavController,
    public userService: UserService
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.recipeId = params["id"];
    });
  }

  ngOnInit() {
    this.recipeService.getRecipe(this.recipeId).subscribe(recipe => {
      this.recipe = recipe;
      this.ingredients = [];
      this.recipe.ingredients.forEach(item => {
        this.calories = 0;
        this.protein = 0;
        this.carbs = 0;
        this.fats = 0;
        this.recipeService.getIngredient(item.id).subscribe(ingredient => {

          this.ingredients.push({
            id: ingredient['id'],
            name: ingredient['name'],
            checked: this.userService.user.shoppingList.includes(item.id)
          });

          // this.ingredients.push(ingredient);
          this.calories += ingredient["average"]["calories"];
          this.protein += ingredient["average"]["protein"];
          this.carbs += ingredient["average"]["carbs"];
          this.fats += ingredient["average"]["fats"];
        });
      });
    });
  }

  goBack() {
    // this.router.navigateByUrl("/home/recipes");
    this.navCtrl.back();
  }

  addRecipe() {
    this.recipeService.addRecipe(this.recipeId);
  }

  shoppingList(ingredient, e) {
    if (e.detail.checked) {
      this.ingredientService.addToShoppingList(ingredient.id);
    } else {
      this.ingredientService.removeFromShoppingList(ingredient.id);
    }
  }
}
