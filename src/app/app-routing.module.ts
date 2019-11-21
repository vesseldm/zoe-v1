import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'today',
    loadChildren: () => import('./pages/today/today.module').then( m => m.TodayPageModule)
  },
  {
    path: 'mylist',
    loadChildren: () => import('./pages/mylist/mylist.module').then( m => m.MylistPageModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./pages/recipes/recipes.module').then( m => m.RecipesPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'myweek',
    loadChildren: () => import('./pages/myweek/myweek.module').then( m => m.MyweekPageModule)
  },
  {
    path: 'recipe',
    loadChildren: () => import('./pages/recipe/recipe.module').then( m => m.RecipePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
