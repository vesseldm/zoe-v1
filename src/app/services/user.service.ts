import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: any;
  private snapshotChangesSubscription: any;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
  ) { }

  getUser(){
    return firebase.auth().currentUser;
  }

}
