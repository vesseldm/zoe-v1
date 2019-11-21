import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyweekPageRoutingModule } from './myweek-routing.module';

import { MyweekPage } from './myweek.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyweekPageRoutingModule
  ],
  declarations: [MyweekPage]
})
export class MyweekPageModule {}
