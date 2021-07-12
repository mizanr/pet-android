import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams, ViewController } from 'ionic-angular';


/**
 * Generated class for the ModalpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-modalpage',
  templateUrl: 'modalpage.html',
})
export class ModalpagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalController: ModalController, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalpagePage');
  }

  closemodal() {
    this.viewCtrl.dismiss();
  }

}
