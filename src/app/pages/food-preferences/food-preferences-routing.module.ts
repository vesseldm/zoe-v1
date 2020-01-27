import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodPreferencesPage } from './food-preferences.page';

const routes: Routes = [
  {
    path: '',
    component: FoodPreferencesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodPreferencesPageRoutingModule {}
