import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {
  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    })
  }

  signInWithEmail(credentials) {
    console.log('Sign in with email');

    // to prevent user from being kept logged in even after application is close
    this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        console.log("persistence set to session only")
      })
      .catch(function(error) {
        console.log(error.message);
      })

    return this.afAuth.auth.signInWithEmailAndPassword(
      credentials.email, credentials.password
    );
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

}
