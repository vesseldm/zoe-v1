import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  tryRegister(value){
    this.authService.doRegister(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created. Please log in.";
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
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

}
