import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { UserState } from 'src/app/state/user/user.state';
import { UserRecipe, RecipeIngredient } from 'src/app/state/models/user.state.model';
import { take } from 'rxjs/operators';
import { IngredientChecked, IngredientUnChecked } from 'src/app/state/user/user.actions';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.page.html',
  styleUrls: ['./mylist.page.scss'],
})
export class MylistPage implements OnInit, OnDestroy {
  @Select(UserState.getUsersChosenRecipes) chosenRecipes$: Observable<UserRecipe[]>;
  public ngDestroyed$ = new Subject();

  foods: RecipeIngredient[] = [];
  userInfo: any;
  user: any;

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.chosenRecipes$
    .pipe(take(1))
    .subscribe(data => {
      data.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          this.foods.push(ingredient);
        });
      });
    });

  }

  checked(food) {
    food.checked ? this.store.dispatch(new IngredientUnChecked(food)) : this.store.dispatch(new IngredientChecked(food));
  }

  remove(food) {
    console.log('food = ');
    console.log(food);

    // this.foods.forEach((item, index) => {
    //   if (item.id == food.id) {
    //     this.foods.splice(index, 1);
    //   }
    // });
  }

  done() {
    this.store.dispatch(new Navigate(['/home']));
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
  }
}
