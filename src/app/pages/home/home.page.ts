import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserState } from 'src/app/state/user/user.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @Select(UserState.subscriptionActive) subscriptionActive$: Observable<any>;
  public ngDestroyed$ = new Subject();
  page_title: string;
  private status;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private store: Store
  ) { }

  ngOnInit() {
    this.subscriptionActive$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(status => {
      console.log('status = ');
      console.log(status);
      if (
      status === 'incomplete'
      || status === 'incomplete_expired'
      || status === 'past_due'
      || status === 'canceled'
      || status === 'unpaid'
      // || status === 'trialing'
      ) {
        this.subscriptionInvalid();
      }
    });
  }

  async subscriptionInvalid() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subscription is invalid',
      message: 'Your trial has expired or your payment information is no longer valid. Please update your information',
      buttons: ['OK']
    });
    await alert.present();
    this.store.dispatch(new Navigate(['/profile']));

  }

  setTitle() {
    console.log(this.router.url);
    switch (this.router.url) {
      case '/home/today':
        this.page_title = 'Home';
        break;
      case '/home/mylist':
        this.page_title = 'Shopping List';
        break;
      case '/home/recipes':
        this.page_title = 'Recipes';
        break;
      case '/home/profile':
        this.page_title = 'Profile';
        break;
      default:
        this.page_title = 'Home';
        break;
    }
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
  }

}
