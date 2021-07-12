// import { AdCampaignPage } from './../ad-campaign/ad-campaign';
// import { VendorProductPage } from './../vendor-product/vendor-product';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { AdCampaignPage } from '../ad-campaign/ad-campaign';
import { VendorAccountSettingsPage } from '../vendor-account-settings/vendor-account-settings';
import { VendorProductPage } from '../vendor-product/vendor-product';
import { VendorServicePage } from '../vendor-service/vendor-service';
// import { VendorAccountSettingsPage } from '../vendor-account-settings/vendor-account-settings';

/**
 * Generated class for the VendorLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-login',
  templateUrl: 'vendor-login.html',
})
export class VendorLoginPage {

  constructor(public navCtrl: NavController, 
    public auth:AuthProvider,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorLoginPage');
  }
  products(){
    this.navCtrl.push(VendorProductPage);
  }
  settings(){
    this.navCtrl.push(VendorAccountSettingsPage);
  }
  ad(){
    this.navCtrl.push(AdCampaignPage);
  }
  services(){
    this.navCtrl.push(VendorServicePage);
  }

}
