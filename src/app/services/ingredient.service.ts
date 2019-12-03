import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(
    public afs: AngularFirestore,
    public userService: UserService
  ) { }

  addToShoppingList(ingredientId) {
    // this.afs.doc(`users/${this.userService.user.id}`).collection('shoppingList').add(ingredientId);
    // return new Promise<any>((resolve, reject) => {
    //   this.afs.doc(`users/${this.userService.user.id}`).collection('shoppingList').add(ingredientId)
    //   .then(
    //     res => resolve(res),
    //     err => reject(err)
    //   )
    // })

    let user = this.userService.user;
    user.shoppingList.push(ingredientId);

    this.userService.updateUser(user)
    .then(
      res => console.log(res),
      err => console.log(err)
    );

  }

  removeFromShoppingList(ingredientId) {
    // this.afs.doc(`users/${this.userService.user.id}`).collection('shoppingList').add(ingredientId);

    let user = this.userService.user;
    user.shoppingList.push(ingredientId);

    for( var i = 0; i < user.shoppingList.length; i++){ 
      if ( user.shoppingList[i] === ingredientId) {
        user.shoppingList.splice(i, 1); 
      }
    }

    this.userService.updateUser(user)
    .then(
      res => console.log(res),
      err => console.log(err)
    );
  }
}
