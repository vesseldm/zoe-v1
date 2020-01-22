import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  errorMessage = '';

  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

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
    this.generateForm();
  }

  generateForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
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

  tryLogin(value) {
    this.authService.login(value)
    .then(res => {
      console.log(res);
      this.router.navigateByUrl('/home');
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin()
    .then((res) => {
      this.router.navigateByUrl('/home');
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
    .then((res) => {
      this.router.navigateByUrl('/home');
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

  tryTwitterLogin() {
    this.authService.doTwitterLogin()
    .then((res) => {
      this.router.navigateByUrl('/home');
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

}
