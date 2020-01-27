import { LoginUser } from './../../state/user/user.actions';
import { UserState } from '../../state/user/user.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  @Select(UserState.loggedIn) loggedIn$: Observable<any>;
  public ngDestroyed$ = new Subject();
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
    public store: Store,
  ) { }

  ngOnInit() {
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
    this.store.dispatch(new Navigate(['/signup']));
  }

  goForgot() {
    this.router.navigateByUrl('/forgot');
  }

  goHome() {
    this.store.dispatch(new Navigate(['/home']));
  }

  tryLogin(value) {
    this.store.dispatch(new LoginUser(value)).subscribe(data => {
      this.goHome();
    });
  }

  tryFacebookLogin() {
    // this.authService.doFacebookLogin()
    // .then((res) => {
    //   this.router.navigateByUrl('/home');
    // }, (err) => {
    //   this.errorMessage = err.message;
    // });
  }

  tryGoogleLogin() {
    // this.authService.doGoogleLogin()
    // .then((res) => {
    //   this.router.navigateByUrl('/home');
    // }, (err) => {
    //   this.errorMessage = err.message;
    // });
  }

  tryTwitterLogin() {
    // this.authService.doTwitterLogin()
    // .then((res) => {
    //   this.router.navigateByUrl('/home');
    // }, (err) => {
    //   this.errorMessage = err.message;
    // });
  }
  public ngOnDestroy() {
    this.ngDestroyed$.next();
  }

}
