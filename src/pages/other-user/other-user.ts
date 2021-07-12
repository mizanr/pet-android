import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { ImageProvider } from '../../providers/image/image';

/**
 * Generated class for the OtherUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-other-user',
  templateUrl: 'other-user.html',
})
export class OtherUserPage {

  constructor(public navCtrl: NavController,
  	public auth:AuthProvider,
    public rest_api:RestApiProvider,
    public viewCtrl:ViewController,
    public image:ImageProvider,
    public alertP:AlertProvider,  
  	public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherUserPage');
  }

  close() {
  	this.viewCtrl.dismiss();
  }

}
