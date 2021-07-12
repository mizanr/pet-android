import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController} from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { NewsFeedPage } from '../news-feed/news-feed';
import { NewsFeedDetailPage } from '../news-feed-detail/news-feed-detail';
import { ChatListPage } from '../chat-list/chat-list';
import { ProfilePage } from '../profile/profile';
import { ChatdetailsPage } from '../chatdetails/chatdetails';
import { OwnerprofilePage } from '../ownerprofile/ownerprofile';
import { LikesPage } from '../likes/likes';
import {CommentPage} from '../comment/comment';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { AccountPage } from '../account/account';
import { PetProfilePage } from '../pet-profile/pet-profile';
import { TabsPage } from '../tabs/tabs';
import { MemberProfilePage } from '../member-profile/member-profile';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
lists:any = new Array();

  constructor(public nav: NavController,
  	public auth:AuthProvider,
 	 public rest_api:RestApiProvider,
    public modalCtrl:ModalController,
 	 public alertP:AlertProvider, 
  	public navParams: NavParams) {
  }

  ionViewDidLoad() {
  	this.get_list();
    console.log('ionViewDidLoad NotificationsPage');
  }

  get_list() {
  	let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  	}

  	this.rest_api.postData(Data,'get_notification_list').then((result: any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.read_noti();
  			this.lists = result.data;
  		}
  	})
  }

   read_noti() {
  	let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  	}

  	this.rest_api.postwithoutldr(Data,'mark_as_read_notif').then((result: any) => {
  		console.log(result);
  		if(result.status == 1){
  			
  		}
  	})
  }

  go(data:any){
    console.log(data);
    if (data.screen == 'user_profile') {
            if (data.page_id == this.auth.getCurrentUserId()) {
              this.nav.setRoot(TabsPage,{tabindex:3});
            } else {
              this.nav.push(MemberProfilePage, { user_id: data.page_id });
              }            
            }

            if(data.screen == 'share_post_user_wall'){
              setTimeout(() => {
                this.nav.push(NewsFeedPage);
              },500)
            }

            if(data.screen == 'share_post_pet_wall'){
              let Data = {
                id:data.page_id
              }
              setTimeout(() => {
                this.nav.push(PetProfilePage,{data:Data});
              },500)
            }

            if(data.screen == "user_post_like"){
              setTimeout(() => {
                const modal = this.modalCtrl.create(NewsFeedDetailPage,{feed_id:data.page_id,type:'Post Detail'});
                modal.present();
              },500)
            }

            if(data.screen == "pet_post_like"){
              setTimeout(() => {
                const modal = this.modalCtrl.create(NewsFeedDetailPage,{feed_id:data.page_id,type:'Post Detail'});
                modal.present();
              },500)
            }

           

            if(data.screen == "pet_post_comm" || data.screen == "user_post_comm"){
             const modal = this.modalCtrl.create(NewsFeedDetailPage,{feed_id:data.page_id,type:'Post Detail',adds:1});
              modal.present();
              modal.onDidDismiss((data) => {
                if(data){
                } else {
                  this.nav.push(MemberProfilePage,{user_id:data.id});
                }
              })
            }
    
    if (data.screen == "chat") {
              let d = {
                id: data.page_id,
                first_name:data.name,
              }
              setTimeout(() => {
                this.nav.push(ChatdetailsPage,{user:d});
                 // this.nav.setRoot(TabsPage,{tabindex:2});
               },700)
            }
  }

}
