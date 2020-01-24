import { State, Action, StateContext } from '@ngxs/store';
import { RecipesAction } from './recipes.actions';

export class RecipesStateModel {
  public items: string[];
}

@State<RecipesStateModel>({
  name: 'recipes',
  defaults: {
    items: []
  }
})
export class RecipesState {
  @Action(RecipesAction)
  add(ctx: StateContext<RecipesStateModel>, action: RecipesAction) {
    const state = ctx.getState();
    ctx.setState({ items: [ ...state.items, action.payload ] });
  }
}
