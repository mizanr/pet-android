import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { NavController, NavParams } from 'ionic-angular';
import { HomeNewPage } from '../home-new/home-new';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
/**
 * Generated class for the RegisterNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register-new',
  templateUrl: 'register-new.html',
})
export class RegisterNewPage {
  formData={
    fname:"",
    lname:"",
    nick_name:'',
    email:"",
    password:"",
    cpassword:""
  }
  constructor(public navCtrl: NavController,
      public alertP:AlertProvider,
      public restApi:RestApiProvider,
    private keyboard: Keyboard,
      public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterNewPage');
  }



  back() {
    this.navCtrl.pop();
  }


  next() {
    let Data = {
      "email":{value:this.formData.email,type:"EMAIL"},
      password:{value:this.formData.password,type:"PASSW"},
      confirmP:{value:this.formData.cpassword,type:"CONFP"},
      SessionAuthToke:{value:window.btoa(this.formData.email),"type":"NO"},
    }
    this.restApi.postData(Data,'CheckUseremail').then((res:any) => {
      console.log(res);
      if(res.success==1){
        this.navCtrl.push(HomeNewPage,{data:this.formData});
      } else {
        this.alertP.show('Alert',res.msg);
      }
    })
  }

  key_event(ev:any){
    console.log(ev);
    if(ev.keyCode== 13|| ev.keyCode== '13'){
      this.keyboard.hide();
    }
  }

}
