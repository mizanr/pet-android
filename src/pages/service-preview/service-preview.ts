import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ServicePreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-service-preview',
  templateUrl: 'service-preview.html',
})
export class ServicePreviewPage {
info:any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams) {
  	this.info = navParams.get('data');
  	console.log(this.info);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicePreviewPage');
  }

  close() {
    this.navCtrl.pop();
  }

}
