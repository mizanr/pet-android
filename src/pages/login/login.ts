import { DashboardPage } from './../dashboard/dashboard';
import { AuthProvider } from './../../providers/auth/auth';
import { RestApiProvider } from './../../providers/rest-api/rest-api';

import {AlertProvider} from './../../providers/alert/alert';

import { Component, ViewChild } from '@angular/core';
import { Platform, Nav,Events, App} from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { TabsPage } from '../tabs/tabs';
import { ForgotPage } from '../forgot/forgot';
import{HomePage} from '../home/home';
import {AddpetsPage} from '../addpets/addpets';
import { EditvendorPage } from '../editvendor/editvendor';
import { OnesignalProvider } from './../../providers/onesignal/onesignal';
import { WelcomePage } from '../welcome/welcome';
import { Keyboard } from '@ionic-native/keyboard';
import { VendorLoginPage } from '../vendor-login/vendor-login';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Nav) nav: Nav;
  data={
    email:"",
    password:""
  }

  login_type:any=0;
  iskeyboard:any=false;
  constructor(
    public navCtrl: NavController, 
    public api:RestApiProvider,
    public auth:AuthProvider,
    public navParams: NavParams,
    public onesignal:OnesignalProvider,
    public event:Events,
    private keyboard: Keyboard,
    public app:App,
    public platform:Platform,
    public alertP:AlertProvider) {

    this.login_type = this.navParams.get('type');

    console.log(this.login_type);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signup() {

    if(this.login_type != 0 && this.login_type != undefined) {
      this.navCtrl.push(SignUpPage,{type:this.login_type});      
    }else{
      this.navCtrl.push(HomePage); 

    }
  }
 
  generateToken(){
        let data={
        "email":{value:this.data.email, type:"EMAIL"},
        "password":{value:this.data.password, type:"NO"},
        "SessionAuthToke":{value:window.btoa(this.data.email),"type":"NO"},
        //"action":{value:"Login", type:"NO"}
     }
      this.api.postData(data,'Login').then((result:any)=>{
           console.log(result);
           if(result.status == 1){
             this.auth.updateUserDetails(result.userDetails);
             this.auth.updateUserToken(result.SessionAuthToke);
             this.event.publish('loginAuth','done');
             this.update_deviceId();
             if(result.userDetails.user_type == 1){
                    if(result.userDetails.is_pet_added == 1 || result.userDetails.is_pet_added == 0){
                      // this.navCtrl.setRoot(TabsPage);
                      this.app.getActiveNav().setRoot(TabsPage);
                    } 
                    // else {
                    //   // this.rootPage = AddpetsPage 
                    //   this.navCtrl.setRoot(AddpetsPage); // when not pet added
                    // } 
             } else {
                 if(result.userDetails.company_name != null){
                  this.navCtrl.setRoot(VendorLoginPage);// for vendor case;

                 }else{
                  this.navCtrl.setRoot(VendorLoginPage); // for vendor case;
                 }

             }
           } else {
             this.alertP.show('Alert',result.msg);
           }
      });

    

   }

   // login(){
   //  let data={
   //    "email":{value:this.data.email, type:"EMAIL"},
   //    "password":{value:this.data.password, type:"PASSW"}
      
   // }


   //      this.api.postData(data,"Login").then((res:any)=>{
   //        this.auth.updateUserDetails(res);
   //          if(res.Userid){
   //            console.log(res);
   //            if(res.Account_type=="1"){
   //                  this.navCtrl.setRoot(TabsPage);
   //            }
   //            else{
   //              this.navCtrl.setRoot(DashboardPage);
   //            }
             
              
   //          }
   //          //alert("response")
            
   //   })
   // }





  go() {
    this.navCtrl.setRoot(TabsPage);
  }

  forgot() {
    this.navCtrl.push(ForgotPage);
  }
  welcome(){
    this.navCtrl.push(WelcomePage);
  }
  back(){
  this.navCtrl.pop();
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

  check_keyboard(ev:any) {
    // if(this.keyboard.isVisible){
    //   this.iskeyboard=true;
    // } else {
    //   this.iskeyboard=false;
    // }
  }

  key_event(ev:any){
    console.log(ev);
    if(ev.keyCode== 13|| ev.keyCode== '13'){
      this.keyboard.hide();
    }
  }

}
