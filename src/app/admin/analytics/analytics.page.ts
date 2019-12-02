import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {

  user: any;
  userBillingEditable: boolean;
  rewardsEditable: boolean;
  rewards: any;
  users: any;
  silver_users: any;
  gold_users: any;
  platinum_users: any;

  constructor(public userService: UserService, public authService: AuthService, public router: Router) { }

  ngOnInit() {
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

  goGroupUsers(type: String) {
    this.router.navigateByUrl(`/admin/users/group/${type}`);
  }
}
