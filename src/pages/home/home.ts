import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LoginVendorPage } from '../login-vendor/login-vendor';
import { SignUpPage } from '../sign-up/sign-up';
import { Keyboard } from '@ionic-native/keyboard';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController,
    private keyboard: Keyboard,
     public event: Events) {

  }

  go() {
    this.navCtrl.push(LoginPage);
    this.event.publish('dashboardselect3ed',1);
  }
  govendor() {
    this.navCtrl.push(LoginVendorPage);
    this.event.publish('dashboardselect3ed',2);
  }

  type(type) {
    console.log(type);
    this.navCtrl.push(SignUpPage,{type:type});
  }

  back() {
    this.navCtrl.pop();
  }
 
}
