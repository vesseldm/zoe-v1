import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
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
