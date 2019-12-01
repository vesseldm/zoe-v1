import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/home');
      }
    });
  }
  
  goSignup() {
    this.router.navigateByUrl('/signup');
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }

}
