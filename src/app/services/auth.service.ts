import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { FirebaseUserModel } from '../models/user.model';
import { environment } from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public facebook: Facebook,
    public googlePlus: GooglePlus,
    public twitter: TwitterConnect,
    public platform: Platform,
    private firestore: AngularFirestore
  ) { }

  public registerUser(value: Partial<User>) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            console.log('res = ');
            console.log(res);
            this.firestore.collection('users').doc(res.user.uid).set({
              id: res.user.uid,
              name: value.name,
              email: value.email
            });
            resolve(res);
          },
          err => reject(err));
    });
  }

  doUpdateUser(user) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('users').doc(user.id).update(user);
      resolve(user);
    });
  }

  login(value: Partial<User>) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.user) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }

  doFacebookLogin() {
    return new Promise<FirebaseUserModel>((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.facebook.login(['public_profile'])
          .then((response) => {
            const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
            firebase.auth().signInWithCredential(facebookCredential)
              .then(user => resolve());
          }, err => reject(err)
          );
      } else {
        this.afAuth.auth
          .signInWithPopup(new firebase.auth.FacebookAuthProvider())
          .then(result => {
            // Default facebook img is too small and we need a bigger image
            const bigImgUrl = 'https://graph.facebook.com/' + result.additionalUserInfo.profile + '/picture?height=500';
            // update profile to save the big facebook profile img.
            firebase.auth().currentUser.updateProfile({
              displayName: result.user.displayName,
              photoURL: bigImgUrl
            }).then(res => resolve()
              , (err) => {
                reject(err);
              });
          }, (err) => {
            reject(err);
          });
      }
    });
  }

  doGoogleLogin() {
    return new Promise<FirebaseUserModel>((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.googlePlus.login({
          scopes: '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
          webClientId: environment.googleWebClientId,
          offline: true
        }).then((response) => {
          const googleCredential = firebase.auth.GoogleAuthProvider.credential(response.idToken);
          firebase.auth().signInWithCredential(googleCredential)
            .then((user) => {
              resolve();
            });
        }, (err) => {
          reject(err);
        });
      } else {
        this.afAuth.auth
          .signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then((user) => {
            resolve();
          }, (err) => {
            reject(err);
          });
      }
    });
  }

  doTwitterLogin() {
    return new Promise<FirebaseUserModel>((resolve, reject) => {
      // if we are in a mobile device we use the twitter native plugin

      if (this.platform.is('cordova')) {
        this.twitter.login()
          .then((response) => {
            const twitterCredential = firebase.auth.TwitterAuthProvider.credential(response.token, response.secret);
            firebase.auth().signInWithCredential(twitterCredential)
              .then(
                user => resolve(),
                error => reject(error)
              );
          },
            err => {
              console.log(err);
              reject(err);
            }
          );
      } else {
        this.afAuth.auth
          .signInWithPopup(new firebase.auth.TwitterAuthProvider())
          .then(result => {
            const bigImgUrl = (result.user.photoURL).replace('_normal', '_400x400');
            firebase.auth().currentUser.updateProfile({
              displayName: result.user.displayName,
              photoURL: bigImgUrl
            }).then(res => resolve(), (err) => {
              reject(err);
            });
          }, (err) => {
            reject(err);
          });
      }
    });
  }
}
