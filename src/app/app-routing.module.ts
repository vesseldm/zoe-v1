import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/landing/landing.module").then(m => m.LandingPageModule)
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./pages/signup/signup.module").then(m => m.SignupPageModule)
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "forgot",
    loadChildren: () =>
      import("./pages/forgot/forgot.module").then(m => m.ForgotPageModule)
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then(m => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "today",
    loadChildren: () =>
      import("./pages/today/today.module").then(m => m.TodayPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "mylist",
    loadChildren: () =>
      import("./pages/mylist/mylist.module").then(m => m.MylistPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "recipes",
    loadChildren: () =>
      import("./pages/recipes/recipes.module").then(m => m.RecipesPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./pages/profile/profile.module").then(m => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "myweek",
    loadChildren: () =>
      import("./pages/myweek/myweek.module").then(m => m.MyweekPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "recipe/:id",
    loadChildren: () =>
      import("./pages/recipe/recipe.module").then(m => m.RecipePageModule),
    canActivate: [AuthGuard],
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
