import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user: any;
  userBillingEditable: boolean;
  userAboutUsEditable: boolean

  constructor(public userService: UserService, public authService: AuthService) { }

  ngOnInit() {
    this.userBillingEditable = false;
    this.userAboutUsEditable = false;

    this.userService.user$.subscribe(user => {
      if (user) this.user = user;
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

  doUserAboutUsEditEnable() {
    this.userAboutUsEditable = true;
  }

  doUpdateAboutUsInfo() {
    try {
      this.authService.doUpdateUser(this.user);
      this.userAboutUsEditable = false
    } catch (e) {
      alert(e.message)
    }
  }

}
