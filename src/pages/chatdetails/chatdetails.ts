import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import{OwnerprofilePage} from '../ownerprofile/ownerprofile';
import { MemberProfilePage } from '../member-profile/member-profile';
import { Keyboard } from '@ionic-native/keyboard';


/**
 * Generated class for the ChatdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chatdetails',
  templateUrl: 'chatdetails.html',
})
export class ChatdetailsPage {
@ViewChild(Content) contentArea:Content;
other_user:any = '';
chats:any = new Array();
msg:any = '';
chat_interval:any;

  constructor(public navCtrl: NavController,
	  public auth:AuthProvider,
	  public rest_api:RestApiProvider, 
	  public keyboard:Keyboard,
  	  public navParams: NavParams) {
  	this.other_user = this.navParams.get('user');
  	console.log(this.other_user);
  }

  ionViewDidLoad() {
  	this.get_chat(0);		
    console.log('ionViewDidLoad ChatdetailsPage');
	setTimeout(() => {
		this.chat_interval=setInterval(() => {
			this.get_chat(1);
		},1000);	
	}, 900);

  }

  ionViewWillLeave() {
	  clearInterval(this.chat_interval);
  }

  get_chat(m) {
  	let Data = {
  		sender:{"value":this.auth.getCurrentUserId(),"type":'NO'},
		  receiver:{"value":this.other_user.id,"type":'NO'},
  		user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
		  
  	}
  	this.rest_api.postwithoutldr(Data,'chat_between_users').then((result:any) => {
  		console.log(result);
  		if(result.status == 1){
				// this.chats = result.users;
				if(this.chats.length<result.users.length){
					this.chats = result.users;
					setTimeout(() => {
						this.contentArea.scrollToBottom();
						}, 100);
				}
				// if (m == 0) {
				// 		setTimeout(() => {
				// 			this.contentArea.scrollToBottom();
				// 		}, 100);
				// }
  		}
  	})
  }
//action=&sender=7&receiver=7&message=Test
  send_msg() {
  	let Data = {
  		sender:{"value":this.auth.getCurrentUserId(),"type":'NO'},
  		user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
  		receiver:{"value":this.other_user.id,"type":'NO'},
  		message:{"value":this.msg.trim(),"type":'MSG'},
  	}

  	 this.rest_api.postwithoutldr(Data,'send_message').then((result:any) => {
  	 	console.log(result);
  	 	if(result.status == 1){
					this.msg = '';
					this.get_chat(0);
					// setTimeout(() => {
					// 	this.contentArea.scrollToBottom();
					// }, 400);
  	 	}
  	 })
  }

//   otherUser(){
//     this.navCtrl.setRoot(OwnerprofilePage,{user_id:this.other_user.id});
	
//   }

  otherUser() {
    if(this.other_user.id!=this.auth.getCurrentUserId()){
      this.navCtrl.push(MemberProfilePage,{user_id:this.other_user.id});
    }
  }

}
