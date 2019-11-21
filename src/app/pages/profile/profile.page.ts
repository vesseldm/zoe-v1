import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;

  constructor(
    public router: Router,
    public authService: AuthService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.router.navigateByUrl('/');
    }, (error) => {
      console.log("Logout error", error);
    });
  }

  
}
