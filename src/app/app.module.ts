import { UserState } from './state/user/user.state';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ModalPageModule } from './pages/modal/modal.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsModuleOptions } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { IngredientsState } from './state/ingredients/ingredients.state';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { HttpClientModule } from '@angular/common/http';
import { AuthState } from './state/auth/auth.state';
import { AuthGuard } from './services/auth.guard';


export const ngxsConfig: NgxsModuleOptions = {
  developmentMode: !environment.production,
  selectorOptions: {
    suppressErrors: false,
    injectContainerState: false
  },
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    NgxsModule.forRoot([AuthState]),
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ModalPageModule,
    NgxsModule.forRoot([AuthState, UserState, IngredientsState], ngxsConfig),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    StatusBar,
    SplashScreen,
    Facebook,
    GooglePlus,
    TwitterConnect,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
