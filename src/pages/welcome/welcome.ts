import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TermsPage } from '../terms/terms';
import { PrivacyPage } from '../privacy/privacy';
import { SocialLoginPage } from '../social-login/social-login';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  login(){
    this.navCtrl.push(LoginPage);
  }
  register(){
    this.navCtrl.push(SocialLoginPage);
  }
  terms(){
    this.navCtrl.push(TermsPage);
  }

    privacy(){
    this.navCtrl.push(PrivacyPage);
  }

}
