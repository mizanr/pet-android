import { ForgotPage } from './../forgot/forgot';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { SignUpPage } from '../sign-up/sign-up';

/**
 * Generated class for the LoginVendorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-vendor',
  templateUrl: 'login-vendor.html',
})
export class LoginVendorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginVendorPage');
  }

  signup() {
    this.navCtrl.push(SignUpPage,{type:2});
  }

  go() {
    this.navCtrl.push(DashboardPage);
  }
  forgot(){
    this.navCtrl.push(ForgotPage)
  }
}
