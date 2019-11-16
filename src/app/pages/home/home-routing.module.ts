import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'today',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../today/today.module').then(m => m.TodayPageModule)
          }
        ]
      },
      {
        path: 'mylist',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../mylist/mylist.module').then(m => m.MylistPageModule)
          }
        ]
      },
      {
        path: 'recipes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../recipes/recipes.module').then(m => m.RecipesPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'today',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
