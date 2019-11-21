import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss']
})
export class TodayPage implements OnInit {
  slideOpts = {
    slidesPerView: 1.7,
    centeredSlides: true,
    loop: true,
    autoHeight: true
  };
  recipes: any;
  weekDays: any = [];
  currentDay: any;

  constructor(public router: Router, public userService: UserService) {}

  ngOnInit() {
    this.weekDays = [];
    let curr = new Date();
    this.currentDay = new Date();
    let first_day = curr.getDate() - curr.getDay() + 1;
    for (let i = 0; i < 7; i++) {
      let next = first_day + i;
      let next_day = new Date(curr.setDate(next));
      this.weekDays.push(next_day);
    }

    this.userService.user$.subscribe(user => {
      if (user && user.id) {
        this.userService.getUserPlans(user.id, this.currentDay.toString()).subscribe(plans => {
          const recipeIds = plans.map(plan => plan.recipeId);
          this.userService.getPlanedRecipes(recipeIds).subscribe(recipes => {
            this.recipes = recipes;
          });
        });
      }
    });
  }

  goProfile() {
    this.router.navigateByUrl('/home/profile');
  }
}
