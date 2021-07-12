import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { App, Events, NavController, NavParams, Platform } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { OnesignalProvider } from '../../providers/onesignal/onesignal';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { AddNewPetPage } from '../add-new-pet/add-new-pet';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the PetAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pet-account',
  templateUrl: 'pet-account.html',
})
export class PetAccountPage {
  pre_data:any;
  formData={
    fullname:"",
    nick_name:'',
    // email:"",
    // password:"",
    // cpassword:""
  }
  issocial:any;
  
  constructor(public navCtrl: NavController, 
    public alertP:AlertProvider,
    public restApi:RestApiProvider,
    public platform:Platform,
    private keyboard: Keyboard,
    public events:Events,
    public app:App,
    public auth:AuthProvider,
    public onesignal:OnesignalProvider,
    public navParams: NavParams) {
      this.pre_data = navParams.data.data;
      this.issocial = navParams.data.issocial||0;
      console.log(this.pre_data,this.issocial);
      if(this.issocial==1){
        this.formData.fullname=this.pre_data.fullname;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PetAccountPage');
  }

  addpet(){
    let Data = {
      nic_name:{value:this.formData.nick_name,type:"NINAME"},
      fullname:{value:this.formData.fullname,type:"FUNAME"},
      email:{value:this.pre_data.email,type:"NO"},
      password:{value:this.pre_data.password,type:"NO"},
      confirm_password:{value:this.pre_data.cpassword,type:"NO"},  
      first_name:{value:this.formData.fullname,type:"NO"},
      last_name:{value:'1',type:"NO"},
      user_type:{value:1,type:"NO"},
      SessionAuthToke:{value:window.btoa(this.pre_data.email),"type":"NO"},
    }
    if(this.issocial==1){
      if(this.pre_data.logintype=='Facebook'){
        Data['FacebookID'] = { "value": this.pre_data.id, "type": "NO" };
        Data['LoginType'] = { "value": this.pre_data.logintype, "type": "NO" };
      } else {
        Data['GmailID'] = { "value": this.pre_data.id, "type": "NO" };
        Data['LoginType'] = { "value": this.pre_data.logintype, "type": "NO" };
      }
     
    }
    this.restApi.postData(Data,'Signup').then((res:any)=>{
      console.log(res);
      if(res.success==1){
        this.auth.updateUserDetails(res.userDetails);
        this.auth.updateUserToken(res.SessionAuthToke); 
        this.update_deviceId();
        this.alertP.showAsync('Success',res.message).then(() => {
          this.events.publish('loginAuth','done');                
          this.navCtrl.setRoot(TabsPage);
        })
      }
    })
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
      this.restApi.postwithoutldr(Data,'update_device_id').then((result:any) => {
      console.log(result);
      })
      })
    }
  }

}
