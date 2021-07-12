import { Component } from '@angular/core';
import { NewsFeedPage } from '../news-feed/news-feed';
import { SearchPage } from '../search/search';
import { ChatListPage } from '../chat-list/chat-list';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import {OwnerprofilePage} from '../ownerprofile/ownerprofile';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { App, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import { Keyboard } from '@ionic-native/keyboard';
import { DeviceDataProvider } from '../../providers/device-data/device-data';
// import { AlertProvider } from './../../providers/alert/alert';




@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
interval:any;
  tab1Root = NewsFeedPage;
  tab2Root = SearchPage;
  tab3Root = ChatListPage;
  tab4Root = AccountPage;
  tab5Root = ChatListPage;
  total_count:any = 0;
  tabindex:any;
  
  constructor(public rest_api:RestApiProvider,public app:App,public alertP:AlertProvider,
    public deviceP: DeviceDataProvider,
    public platform:Platform,
    public auth: AuthProvider, public keyboard: Keyboard,
    public navParams: NavParams,) {    
    // if(platform.is('cordova'))
    // this.deviceP.getDeviceFiles('').then((data: any) => {
    //   console.log('tabpage-----data---', data);
    //   // this.main_array = data;
    //   // this.all_data=data;
    // })
    
    
    this.tabindex=navParams.data.tabindex;
    this.keyboard.onKeyboardShow().subscribe(() => {
      this.auth.isKeyboardshow = true;
        let elem :any= document.getElementsByClassName('tabbar');
          if(elem.length>0){
             elem[0].style.display="none";
           }
      })

    this.keyboard.onKeyboardHide().subscribe(() => {
      this.auth.isKeyboardshow = false;        
          let elem :any = document.getElementsByClassName('tabbar');
          if(elem.length>0){
          elem[0].style.display="flex";
        }
      })

    this.unread_count();
  }

     
  // ionViewWillLeave(){
  //   let elem :any = document.getElementsByClassName('tabbar');
  //   for(let i=0;i<elem.length;i++){
  //     elem[i].style.display="flex";
  //   }
  //   // if(elem.length>0){
  //   // elem[0].style.display="flex";
  //   // }
  //   }

  getcity(){
    let Data = {
        user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      }  
      this.rest_api.postwithoutldr(Data,'getcity').then((res:any) => {
        console.log(res);
        if(res.status == 1){
          this.auth.cities=res.city_detail;
        }
      })
    }


    
  getCountry(){    
    var Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    }
         this.rest_api.postwithoutldr(Data,"getcountry").then((res:any)=>{
           console.log(res);
          if(res.status == 1){

            this.auth.country = res.country_detail;
            
            
            
          
          } 
 
     }).catch((err)=>{
           this.alertP.presentToast(err.error.Message,'bottom')
     })
  }

    get_state() {
      let Data = {
        //country_id:{"value":this.data.countryid,"type":"NO"},
        user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      }
      this.rest_api.postwithoutldr(Data,'getstate').then((res:any) => {
        console.log(res);
        if(res.status == 1){
          this.auth.state=res.state_detail;
          
        }
      })
    }

  // unread_count() {
  // 	setInterval(() => {
  // 		let Data = {
  // 		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  // 	}
  // 		this.rest_api.postwithoutldr(Data,'total_unread_msg').then((result:any) => {
	 //  		console.log('unread count--',result);
	 //  		if(result.status == 1){
	 //  			this.total_count = result.unread;
  // 			}
  // 		})
  // 	},900)  	
  // }

unread_count() {
  this.interval =   setInterval(() => {
        let Data = {
        user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    }
        this.rest_api.postwithoutldr(Data,'total_unread_msg').then((result:any) => {
            console.log('unread count--',result);
            if(result.status == 1){
                this.total_count = result.unread;
            } else {
                  clearInterval(this.interval);
                  this.alertP.show('Alert','Your session is unauthorized');
                  setTimeout(() => {
                    this.app.getActiveNav().push(HomePage);
                    this.auth.removeAllSessions();  
                    window.location.href="";
                  },500);                   
                }
        })
    },3000)     
  }


  tapChange(ev) {
    ev.popToRoot();
  }

}