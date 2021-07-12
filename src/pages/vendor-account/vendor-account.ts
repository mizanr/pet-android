import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { Events, NavController, NavParams, Platform } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { OnesignalProvider } from '../../providers/onesignal/onesignal';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { VendorLoginPage } from '../vendor-login/vendor-login';

/**
 * Generated class for the VendorAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-account',
  templateUrl: 'vendor-account.html',
})
export class VendorAccountPage {
  pre_data:any;
formData:any = {
  cname:'',
  fname:'',
}
  constructor(public navCtrl: NavController, 
    public restApi:RestApiProvider,
    public auth:AuthProvider,
    public onesignal:OnesignalProvider,
    public platform:Platform,
    public keyboard:Keyboard,
    public events:Events,
    public alertP:AlertProvider,
    public navParams: NavParams) {
      this.pre_data=navParams.data.data;
      console.log(this.pre_data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorAccountPage');
  }

  signup(){
    let Data = {
      nic_name:{value:this.formData.fname,type:"NO"},
      company_name:{value:this.formData.cname,type:"CNAME"},
      fullname:{value:this.formData.fname,type:"FUNAME"},
      email:{value:this.pre_data.email,type:"NO"},
      password:{value:this.pre_data.password,type:"NO"},
      confirm_password:{value:this.pre_data.cpassword,type:"NO"},  
     first_name:{value:this.formData.fname,type:"NO"},
      vendor_type:{value:this.pre_data.vender_type,type:"NO"},
      user_type:{value:2,type:"NO"},
      SessionAuthToke:{value:window.btoa(this.pre_data.email),"type":"NO"},
    }

    this.restApi.postData(Data,'Signup').then((res:any)=>{
      console.log(res);
      if(res.success==1){
        this.auth.updateUserDetails(res.userDetails);
        this.auth.updateUserToken(res.SessionAuthToke); 
        this.update_deviceId();
        this.alertP.showAsync('Success',res.message).then(() => {
          this.events.publish('loginAuth','done');                
          this.navCtrl.setRoot(VendorLoginPage);
        })
      }
    })
  }

  update_deviceId() {
    if(this.platform.is('cordova')){
      this.onesignal.id().then(identity => {
        console.log('-------Device Id----------',identity);
        let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
     device_id:{"value":identity,"type":'NO'},
    }
      this.restApi.postwithoutldr(Data,'update_device_id').then((result:any) => {
      console.log(result);
      })
      })
    }
  }


}
