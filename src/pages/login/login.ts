import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AuthenticationProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loginError: string;

  constructor(
    private navCtrl: NavController,
    private auth: AuthenticationProvider,
    fb: FormBuilder,
    public navParams: NavParams
  ) {

    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**
    Login Function
    */
  login() {
    let data = this.loginForm.value;

    if(!data.email){
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    }

    this.auth.signInWithEmail(credentials)
      .then(
        () => this.navCtrl.setRoot(TabsPage),
        error => this.loginError = error.message
      )
  }

}
