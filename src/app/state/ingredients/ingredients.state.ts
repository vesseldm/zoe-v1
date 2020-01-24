import { IngredientsService } from '../../services/ingredients/ingredients.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetIngredientList } from './ingredients.actions';
import { IngredientsStateModel } from '../models/ingredients.state.model';
import { tap } from 'rxjs/operators';

@State<IngredientsStateModel>({
  name: 'ingredients'
})
export class IngredientsState {
  constructor(public ingredientsService: IngredientsService) { }

  @Action(GetIngredientList)
  getIngredientList(ctx: StateContext<IngredientsStateModel>, action: GetIngredientList) {
    return this.ingredientsService.getIngredientList().pipe(tap(result => {
      console.log('result = ');
      console.log(result);
    }));
  }
}
