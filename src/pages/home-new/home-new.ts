import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PetAccountPage } from '../pet-account/pet-account';
import { VendorSelectPage } from '../vendor-select/vendor-select';

/**
 * Generated class for the HomeNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home-new',
  templateUrl: 'home-new.html',
})
export class HomeNewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeNewPage');
  }
  back() {
    this.navCtrl.pop();
  }
  vendor(){
    // alert('Coming Soon.');
    this.navCtrl.push(VendorSelectPage,{data:this.navParams.data.data});
  }

  pet(){
    this.navCtrl.push(PetAccountPage,{data:this.navParams.data.data});
  }

}
