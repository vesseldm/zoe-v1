import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user: any;
  userBillingEditable: boolean;
  rewardsEditable: boolean;
  rewards: any;
  users: any;
  silver_users: any;
  gold_users: any;
  platinum_users: any;

  constructor(public userService: UserService, public authService: AuthService) { }

  ngOnInit() {
    this.userBillingEditable = false;
    this.rewardsEditable = false;
    this.rewards = ["Pokémon Yellow", "Mega Man X", "The Legend of Zelda", "Pac-Man", "Super Mario World"];

    this.userService.user$.subscribe(user => {
      if (user) this.user = user;
    });

    this.userService.users$.subscribe(users => {
      this.users = users;
      this.silver_users = [];
      this.gold_users = [];
      this.platinum_users = [];

      users.forEach(item => {
        if (!item.photoUrl) {
          item.photoUrl = "https://picsum.photos/id/524/200/300";
        }
        switch (item.type) {
          case "Silver":
            this.silver_users.push(item);
            break;

          case "Gold":
            this.gold_users.push(item);
            break;

          case "Platinum":
            this.platinum_users.push(item);
            break;

          default:
            break;
        }
      });
    });
  }

  doUserBillingEditEnable() {
    this.userBillingEditable = true
  }

  doUpdateUserBillingInfo() {
    try {
      this.authService.doUpdateUser(this.user);
      this.userBillingEditable = false
    } catch (e) {
      alert(e.message)
    }
  }

  doRewardsEditEnable() {
    this.rewardsEditable = true
  }

  dorewardsEdit() {
    this.rewardsEditable = false
  }
}
