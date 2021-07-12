import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { NavController, NavParams } from 'ionic-angular';
import { VendorAccountPage } from '../vendor-account/vendor-account';

/**
 * Generated class for the VendorSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-select',
  templateUrl: 'vendor-select.html',
})
export class VendorSelectPage {
vendor_type:any;
pre_stage_data:any;

  constructor(public navCtrl: NavController,
    public keyboard:Keyboard,
     public navParams: NavParams) {
       this.pre_stage_data=navParams.data.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorSelectPage');
  }

  back() {
    this.navCtrl.pop();
  }

  next(){
    this.navCtrl.push(VendorAccountPage,{data:this.pre_stage_data});
  }

  vender_type(type:any) {
    this.vender_type=type;
    this.pre_stage_data['vender_type']=type;
    this.next();
  }

}
