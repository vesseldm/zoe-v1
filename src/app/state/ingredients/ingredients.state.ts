import { IngredientsStateModel } from './../models/ingredients.state.model';
import { IngredientsService } from '../../services/ingredients/ingredients.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetIngredientList } from './ingredients.actions';
import { tap } from 'rxjs/operators';

@State<IngredientsStateModel>({
  name: 'ingredients'
})
export class IngredientsState {
  constructor(public ingredientsService: IngredientsService) { }

  @Selector()
  static getIngredients(state: IngredientsStateModel) {
    return state;
  }
  @Action(GetIngredientList)
  getIngredientList(ctx: StateContext<any>) {
    // return this.ingredientsService.getIngredientList().pipe(tap(result => {
    //   const state = ctx.getState();
    //   ctx.setState({...state, ingredients: result});
    // }));
  }
}
