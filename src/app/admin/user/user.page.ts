import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: any;
  userId: String;
  userEditable: any;

  constructor(public authService: AuthService, public userService: UserService, private activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.userEditable = false;
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');

    this.userService.getUserInfo(this.userId).subscribe(user => {
      if (user) this.user = user;
      console.log(user)
    });
  }

  doUserEditEnable() {
    this.userEditable = true;
  }

  doUserUpdate() {
    this.userEditable = false;
  }

}
