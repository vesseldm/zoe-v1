import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.goHome();
      }
    });
    
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  goSignup() {
    this.router.navigateByUrl('/signup');
  }

  goForgot() {
    this.router.navigateByUrl('/forgot');
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      console.log(res);
      this.router.navigateByUrl('/home');
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then((res) => {
      this.router.navigateByUrl('/home');
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then((res) => {
      this.router.navigateByUrl('/home');
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

  tryTwitterLogin(){
    this.authService.doTwitterLogin()
    .then((res) => {
      this.router.navigateByUrl('/home');
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

}
