import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any;
  silver_users: any;
  gold_users: any;
  platinum_users: any;

  constructor(public authService: AuthService, public userService: UserService) { }

  ngOnInit() {
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
}
