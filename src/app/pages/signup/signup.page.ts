import { AddUser, AddSocialUser } from './../../state/user/user.actions';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  validationMessages = {
    username: [
      { type: 'required', message: 'Name is required.' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    private store: Store
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }

  goHome() {
    this.store.dispatch(new Navigate(['/home']));
  }

  register(value) {
    this.store.dispatch(new AddUser(value));
  }

  tryFacebookLogin() {
    this.store.dispatch(new AddSocialUser('facebook')).subscribe(result => {
      console.log('result try facebook = ');
      console.log(result);
    });
  }

  tryGoogleLogin() {
    this.store.dispatch(new AddSocialUser('google')).subscribe(result => {
      console.log('result try google = ');
      console.log(result);
    });
  }

  tryTwitterLogin() {
    this.store.dispatch(new AddSocialUser('twitter')).subscribe(result => {
      console.log('result try twitter = ');
      console.log(result);
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    return await modal.present();
  }

}
