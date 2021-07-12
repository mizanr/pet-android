import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { Keyboard } from '@ionic-native/keyboard';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
email:any = '';
subject:any = '';
text:any = '';
  constructor(public navCtrl: NavController, 
  	public auth:AuthProvider,
  	public rest_api:RestApiProvider,
	  public keyboard:Keyboard,
  	public alertP:AlertProvider,
  	public navParams: NavParams) {
  }

  ionViewDidLoad() {
  	this.email = this.auth.getUserDetails().email;
    console.log('ionViewDidLoad ContactPage');
  }

  notification() {
    this.navCtrl.push(NotificationsPage)
  }

  submit() {
  	let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  		email:{"value":this.email,"type":"EMAIL"},
  		subject:{"value":this.subject.trim(),"type":"SUB"},
  		message:{"value":this.text.trim(),"type":"DES"},
  	}
  	this.rest_api.postData(Data,'contact_us').then((result:any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.alertP.showAsync('Success',result.msg).then(() => {
  				this.navCtrl.pop();
  			})
  		}else {
  			this.alertP.show('Alert',result.msg);
  		}
  	})
  }

}
