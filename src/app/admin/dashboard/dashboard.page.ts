import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user: any;
  userBillingEdit: boolean;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userBillingEdit = false;
    this.userService.user$.subscribe(user => {
      if (user) this.user = user;
    });
  }

  doUserBillingEditEnable() {
    this.userBillingEdit = true
  }

  doUpdateUserBillingInfo() {
    console.log(this.user)
    this.userBillingEdit = false
  }

}
