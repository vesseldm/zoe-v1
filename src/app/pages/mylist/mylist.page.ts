import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { UserState } from 'src/app/state/user/user.state';
import { UserRecipe } from 'src/app/state/models/user.state.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.page.html',
  styleUrls: ['./mylist.page.scss'],
})
export class MylistPage implements OnInit, OnDestroy {
  @Select(UserState.getUsersChosenRecipes) chosenRecipes$: Observable<UserRecipe[]>;
  public ngDestroyed$ = new Subject();

  foods: any[] = [];
  userInfo: any;
  user: any;

  constructor(
  ) {}

  ngOnInit() {
    this.chosenRecipes$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(data => {
      console.log('data = ');
      console.log(data);
      data.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          this.foods.push(ingredient);
          console.log('ingredient = ');
          console.log(ingredient);
        });
      });
    });

  }

  checked(food, e) {
    // this.foods.forEach((item, index) => {
    //   if (item.id == food.id) {
    //     if (e.detail.checked)
    //       item.checked = true;
    //     else
    //       item.checked = false;
    //   }
    // });
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

  done(food) {
    console.log('food = ');
    console.log(food);
    // let Ref = this.afs.collection("users");
    // Ref.doc(this.userInfo.id).update({
    //   checkedFoods: this.foods
    // });
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
  }
}
