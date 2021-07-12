import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsFeedPage } from '../news-feed/news-feed';
import { AddpetsPage } from '../addpets/addpets';
import { TabsPage } from '../tabs/tabs';
import { a } from '@angular/core/src/render3';
import { AuthProvider } from './../../providers/auth/auth';
import { Platform, Nav,Events} from 'ionic-angular';
// import {AddpetsPage} from '../addpets/addpets';
import { LoginPage } from '../login/login';
import {DashboardPage} from '../dashboard/dashboard';
import { EditvendorPage } from '../editvendor/editvendor';
import { OnesignalProvider } from './../../providers/onesignal/onesignal';
import { Keyboard } from '@ionic-native/keyboard';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  data={
    fname:"",
    lname:"",
    nick_name:'',
    email:"",
    password:"",
    cpassword:""
  }

  login_type:any;
  constructor(
    public navCtrl: NavController, 
    public auth:AuthProvider,
    public api:RestApiProvider,
    public event:Events,    
    private keyboard: Keyboard,
    public alertP:AlertProvider,
    public onesignal:OnesignalProvider,
    public platform:Platform,
    public navParams: NavParams) {

    this.login_type = this.navParams.get('type');
    console.log(this.login_type);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  sign() {
    this.navCtrl.setRoot(AddpetsPage);
  }

  signup(){
   let data={
       "first_name":{value:this.data.fname, type:"FNAME"},
       "last_name":{value:this.data.lname, type:"LNAME"},
       "email":{value:this.data.email.trim(), type:"EMAIL"},
       "password":{value:this.data.password.trim(), type:"PASSW"},
       "confirm_password":{"value":this.data.cpassword.trim(),"type":"CONFP"},
       "confirmP":{value:this.data.cpassword.trim(), type:"CONFP"},
        "user_type" :{value:this.login_type, type:"NO"},
        "SessionAuthToke":{value:window.btoa(this.data.email.trim()),"type":"NO"},
    }

    if(this.login_type==1){
      data['nic_name']={value:this.data.nick_name,type:"NINAME"};
    }
    
   
    this.api.postData(data,"Signup").then((res:any)=>{
        if(res.success == 1){
          this.update_deviceId();
          this.alertP.showAsync('Success',res.message).then(() => {
                this.auth.updateUserDetails(res.userDetails);
             this.auth.updateUserToken(res.SessionAuthToke);                
                 this.event.publish('loginAuth','done');                
             if(res.userDetails.user_type == 1){
                    if(res.userDetails.is_pet_added == 1){
                      this.navCtrl.setRoot(TabsPage);
                    } else {
                      this.navCtrl.setRoot(AddpetsPage); // when not pet added
                    }                
             } else {
                if(res.userDetails.company_name != null){
                  this.navCtrl.setRoot(DashboardPage);// for vendor case;

                 }else{
                  this.navCtrl.setRoot(EditvendorPage); // for vendor case;
                 }

             }

          })
          // this.alert.presentToast('Your account has been create successfully','bottom')
        } else {
          this.alertP.show('Alert',res.msg);
        }

    }).catch((err)=>{
          console.log('mizan',err);
          this.alertP.presentToast(err.error.Message,'bottom')
    })
  }

  loging(){
    this.navCtrl.setRoot(LoginPage);
  }

  update_deviceId() {
    if(this.platform.is('cordova')){
      this.onesignal.id().then(identity => {
        console.log('-------Device Id----------',identity);
        let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
     device_id:{"value":identity,"type":'NO'},
    }
      this.api.postwithoutldr(Data,'update_device_id').then((result:any) => {
      console.log(result);
      })
      })
    }
  }

}
