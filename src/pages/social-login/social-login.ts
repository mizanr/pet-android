import { Component } from '@angular/core';
import { App, Events, NavController, NavParams, Platform } from 'ionic-angular';
import { RegisterNewPage } from '../register-new/register-new';

import { TermsPage } from '../terms/terms';
import { PrivacyPage } from '../privacy/privacy';
import { Keyboard } from '@ionic-native/keyboard';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { GooglePlusProvider } from '../../providers/google-plus/google-plus';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { TabsPage } from '../tabs/tabs';
import { OnesignalProvider } from '../../providers/onesignal/onesignal';
import { PetAccountPage } from '../pet-account/pet-account';

/**
 * Generated class for the SocialLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-social-login',
  templateUrl: 'social-login.html',
})
export class SocialLoginPage {

  constructor(public navCtrl: NavController, 
    private keyboard: Keyboard,
    public facebookP:FacebookProvider,
    public restApi:RestApiProvider,
    public auth:AuthProvider,
    public app:App,
    public platform:Platform,
    public onesignal:OnesignalProvider,
    public events:Events,
    public alertP:AlertProvider,
    public googleP:GooglePlusProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialLoginPage');
  }

  register(){
    this.navCtrl.push(RegisterNewPage);
  }

  back(){
  this.navCtrl.pop();
  }

  terms(){
    this.navCtrl.push(TermsPage);
  }

    privacy(){
    this.navCtrl.push(PrivacyPage);
  }

  fb_login() {
    this.facebookP.login().then((res:any) => {
      console.log('fb login-----------',res);
      this.socialLogin(res,'fb');
    }).catch((err) => console.error('fb error-------',err));
  }

  google_login() {
    this.googleP.login().then((res:any) => {
      console.log('google plus----------',res);
      this.socialLogin(res,'google');
    }).catch((err) => console.log('google plus error-------',err));
  }


  socialLogin(k: any, type: any) {
    console.log('k-------------', k);
    if (type == 'fb') {
      k['FacebookID'] = k.id;
      k['loginType'] = 'Facebook';
    } else {
      k['GmailID'] = k.id;
      k['loginType'] = 'GooglePlus';
    }
    let Data = {
      email:{"value": k.email, "type": "NO" },
      first_name:{"value": k.fname, "type": "NO"},
      SessionAuthToke:{value:window.btoa(k.email),"type":"NO"},
    }
    if (type == 'google') {
      Data['GmailID'] = {"value": k.id, "type": "NO" };
      //Data['FacebookID'] = { "value": '', "type": "NO" };
      Data['LoginType'] = {"value": 'GooglePlus', "type": "NO" };
    }
    if (type == 'fb') {
      Data['FacebookID'] = {"value": k.id, "type": "NO" };
      //Data['GmailID'] = { "value": '', "type": "NO" };
      Data['LoginType'] = {"value": 'Facebook', "type": "NO" };
    }
    // if (this.blob_img) {
    //   let m = this.blob_img.type=="image/png"?'png':'jpg';
    //   Data["profilePic"] = {
    //     value: this.blob_img,
    //     type: "IMAGE",
    //     name: this.imageP.generateImageName("hello."+m)
    //   };
    //   console.log("data---------", Data["profile"]);
    // }
    this.restApi.postData(Data, 'SocialLogin').then((result: any) => {
      console.log(result);
      if (result.status == 1) {
            this.auth.updateUserDetails(result.data);
             this.auth.updateUserToken(result.SessionAuthToke);
             this.events.publish('loginAuth','done');
             this.update_deviceId();
             this.app.getRootNav().setRoot(TabsPage);
      } else {
        if (result.data == false) {
          if(!k.email){
            this.navCtrl.push(RegisterNewPage);
          } else {
           let  formData = {
              fname:k.fname,
              fullname:`${k.fname} ${k.lname}`,
              lname:k.lname,
              nick_name:'',
              email:k.email,
              password:"123456",
              cpassword:"123456",
              logintype:k.loginType,
              id:k.id,
            }
            this.navCtrl.push(PetAccountPage, { data:formData ,issocial:1});
          }

        } else {
          this.alertP.show('Alert', result.msg);
        }
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
