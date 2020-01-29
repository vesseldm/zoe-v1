import { RecipeService } from './../../services/recipe.service';
import { State, Action, StateContext } from '@ngxs/store';
import { RecipesAction, GetAllRecipes } from './recipes.actions';
import { RecipesStateModel } from '../models/recipes.state.model';
import { tap } from 'rxjs/operators';

@State<RecipesStateModel>({
  name: 'recipes',
  defaults: {
    items: []
  }
})
export class RecipesState {
  constructor(private recipeService: RecipeService) {}

  @Action(RecipesAction)
  add(ctx: StateContext<RecipesStateModel>, action: RecipesAction) {
    const state = ctx.getState();
    ctx.setState({ items: [ ...state.items, action.payload ] });
  }

  @Action(GetAllRecipes)
  getRecipes(ctx: StateContext<RecipesStateModel[]>) {
    return this.recipeService.getAllRecipes().pipe(tap(recipes => {
      console.log('recipes = ');
      console.log(recipes);
      ctx.setState(recipes);
    }));
  }
}
