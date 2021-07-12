import { Component } from '@angular/core';
import { NavController, NavParams,ViewController} from 'ionic-angular';
import {CreatePassPage} from '../create-pass/create-pass';

import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import{HomePage} from '../home/home';

/**
 * Generated class for the OptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-opt',
  templateUrl: 'opt.html',
})
export class OptPage {
OTP: any =  {
  first: '',
  second: '',
  third: '',
  forth: '',
};
SessionAuthToke:any;

email:any;
Id:any;

  constructor(public navCtrl: NavController, 
    public rest_api:RestApiProvider,
    public viewCtrl:ViewController,
    public alertP:AlertProvider,
  	public navParams: NavParams) {
    this.email = this.navParams.get('email');
    this.Id = this.navParams.get('id');   
    this.SessionAuthToke =  this.navParams.get('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptPage');
  }

  otpController(event,next,prev){
   if(event.target.value.length < 1 && prev){
     prev.setFocus()
   }
   else if(next && event.target.value.length>0){
     next.setFocus();
   }
   else {
    return 0;
   } 
   console.log(this.OTP);
}

close(){
	this.viewCtrl.dismiss();
}

    otp() {
      
      var otp = `${this.OTP.first}${this.OTP.second}${this.OTP.third}${this.OTP.forth}`;
      let Data = {
        user_id:{"value":this.Id,"type":"NO"},
        otp:{"value":otp.trim(),"type":"OTP"},
        SessionAuthToke:{value:this.SessionAuthToke,"type":"NO"},
      }

      this.rest_api.postData2(Data,0,'validated_otp').then((result:any) => {
        console.log(result);

        if(result.status == 1) {
          this.navCtrl.push(CreatePassPage,{id:result.userdata.id,token:this.SessionAuthToke});
        } else {
          this.alertP.show('Alert',result.msg);
        }
      })
    }

    resend_otp() {
      let data = {
          "email":{value:this.email.trim(), type:"NO"},
          SessionAuthToke:{value:window.btoa(this.email),"type":"NO"},
        }
      
       this.rest_api.postData2(data,0,"forgot_password").then((res:any)=>{
           if(res.success == 1){
             this.SessionAuthToke = res.SessionAuthToke;
             this.alertP.show('Success','Otp has been sent successfully.');
             this.OTP = {
                    first: '',
                    second: '',
                    third: '',
                    forth: '',
                  };
           } else {
             this.alertP.show('Alert',res.msg);
           }
   
       }).catch((err)=>{
             this.alertP.presentToast(err.error.Message,'bottom');
       })
    }

    cancel(){
      this.navCtrl.setRoot(HomePage);
    }

}
