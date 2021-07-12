// import { Component } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import {LoginPage} from '../login/login';
/**
 * Generated class for the CreatePassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-pass',
  templateUrl: 'create-pass.html',
})
export class CreatePassPage {
data = {
    "Old_password":"",
    "New_password":"",
    "cpass":""
  }
  id:any;

  constructor(public navCtrl: NavController,
     public api:RestApiProvider,
     public auth:AuthProvider,
     public alertP:AlertProvider,
     public navParams: NavParams) {

    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePassPage');
  }


  submit() {
  	let Data = {
      'user_id':{"value":this.id,"type":"NO"},
      'New_password':{"value":this.data.New_password.trim(),"type":"NPASS"},
      "confirmP":{'value':this.data.cpass.trim(),type:"CONFP"},
       SessionAuthToke:{value:this.navParams.get('token'),"type":"NO"},

    }

    this.api.postData2(Data,0,'update_password').then((result:any) => {
      console.log(result);

      if(result.status == 1){
        this.alertP.showAsync('Success',result.msg).then(() => {
          this.navCtrl.setRoot(LoginPage);
        })
      } else {
        this.alertP.show('Alert',result.msg);
      }
    })
  }

}
