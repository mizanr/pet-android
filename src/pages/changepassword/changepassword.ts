import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  data={
    "Old_password":"",
    "New_password":"",
    "cpass":""
  }
  
  constructor(
     public navCtrl: NavController,
     public api:RestApiProvider,
     public auth:AuthProvider,
     public alertP:AlertProvider,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  notification() {
    this.navCtrl.push(NotificationsPage)
}
updatePassword(){

// c_password = 123456, new_password=1234567,user_id=1
  let data={
      "user_id":{value:this.auth.getCurrentUserId(), type:"NO"} ,
      "c_password":{value:this.data.Old_password.trim(), type:"CPASS"} ,
      "New_password":{value:this.data.New_password.trim(), type:"NPASS"},          
      "confirmP":{value:this.data.cpass.trim(),type:"CONFP"},
    }
  
   this.api.postData(data,"Change_Password").then((res:any)=>{
    if(res.status == 1){
      this.alertP.showAsync('Success',res.msg).then(() => {
        this.navCtrl.pop();
      })
    }else{
      this.alertP.show('Alert',res.msg);
    }

   }).catch((err)=>{
         // console.log('mizan',err);
         //this.alert.presentToast(err.error.Message,'bottom')
   })
 
}
}
