import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { RecipeService } from "../../services/recipe.service";
import { UserService } from '../../services/user.service';

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
    } else {
    }
  }
}
