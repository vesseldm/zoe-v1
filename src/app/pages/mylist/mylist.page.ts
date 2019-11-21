import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.page.html',
  styleUrls: ['./mylist.page.scss'],
})
export class MylistPage implements OnInit {

  foods: any[] = [];
  userInfo: any;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public userService: UserService
  ) 
  { 
    let _this = this;

    this.userService.user$.subscribe(user => {
      this.userInfo = user;
      let docRef = _this.afs.collection("users").doc(user.id);

      docRef.get().subscribe(querySnapshot =>{
        if(querySnapshot.data().checkedFoods)
          _this.foods = querySnapshot.data().checkedFoods;
        else{
          this.afs.collection('ingredients').get().subscribe( querySnapshot => {
            let data = [];
            querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              data.push(doc.data());
            });
      
            _this.foods = data;
            _this.foods.forEach((item, index) => {
              item.checked = true;  
            });
          });    
        }
      });
    });
  }

  ngOnInit() {
    
  }

  checked(food, e){
    this.foods.forEach((item, index) => {
      if(item.id == food.id)
      {
        if(e.detail.checked)
          item.checked = true;
        else
          item.checked = false;
      }          
    });
  }

  remove(food){
    this.foods.forEach((item, index) => {
      if(item.id == food.id)
      {
        this.foods.splice(index, 1);
      }          
    });
  }

  done(){
    let Ref = this.afs.collection("users");
    Ref.doc(this.userInfo.id).update({
      checkedFoods: this.foods
    });
  }
}
