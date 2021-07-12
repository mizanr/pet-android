import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-products-detail',
  templateUrl: 'products-detail.html',
})
export class ProductsDetailPage {
info:any = '';

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams) {
  	this.info = this.navParams.get('data');
  	console.log(this.info);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsDetailPage');
  }

}
