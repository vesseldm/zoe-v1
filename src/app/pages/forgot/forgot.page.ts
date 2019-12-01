import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

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

  goLogin() {
    this.router.navigateByUrl('/login');
  }

}
