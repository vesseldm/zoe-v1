import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { BillingComponent } from 'src/app/components/billing/billing.component';
import { StripeModule } from 'stripe-angular';

@NgModule({
  imports: [
    StripeModule.forRoot('pk_live_SOP3JZbCxWB2CyThJyfnwz6W00OEJHppzZ'),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    NgxsFormPluginModule,
  ],
  declarations: [ProfilePage, BillingComponent]
})
export class ProfilePageModule { }
