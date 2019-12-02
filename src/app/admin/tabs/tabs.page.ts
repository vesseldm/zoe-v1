import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  user: any;

  constructor(public authService: AuthService, public userService: UserService, private activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      if (user) this.user = user;
    });
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.router.navigateByUrl('/');
      }, (error) => {
        console.log("Logout error", error);
      });
  }

}
