import { Component, OnInit, OnDestroy } from '@angular/core';
import { StripeToken, StripeSource } from 'stripe-angular'
import { Select } from '@ngxs/store';
import { UserState } from 'src/app/state/user/user.state';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class  BillingComponent implements OnInit, OnDestroy {
  @Select(UserState.getProfileFormData) getProfileFormData$: Observable<any>;
  public ngDestroyed$ = new Subject();
  public extraData = {
    name: null,
    address_city: null,
    address_line1: null,
    address_line2: null,
    address_state: null,
    address_zip: null
  };

  constructor() {}

  ngOnInit() {
    this.getProfileFormData$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(data => {
      console.log('getProfileFormData data = ');
      console.log(data);
    });
  }

  onStripeInvalid( error: Error ) {
    console.log('Validation Error', error);
  }

  setStripeToken( token: StripeToken ) {
    console.log('Stripe token', token);
  }

  setStripeSource( source: StripeSource ) {
    console.log('Stripe source', source);
  }

  onStripeError( error: Error ) {
    console.error('Stripe error', error);
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
  }
}
