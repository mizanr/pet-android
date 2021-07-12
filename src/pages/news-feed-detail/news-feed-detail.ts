import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams,ViewController} from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';

import { ModalpagePage } from '../modalpage/modalpage';
import { LikesPage } from '../likes/likes';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import {CommentPage} from '../comment/comment';
import{OwnerprofilePage} from '../ownerprofile/ownerprofile';
import{ProfilePage} from '../profile/profile';
import { MemberProfilePage } from '../member-profile/member-profile';


/**
 * Generated class for the NewsFeedDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-news-feed-detail',
  templateUrl: 'news-feed-detail.html',
})
export class NewsFeedDetailPage {
feed_id:any;
info:any = '';
type:any='';

  constructor(public navCtrl: NavController,
    public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public alertP:AlertProvider,
   public navParams: NavParams, 
   public viewCtrl:ViewController,
   public modalCtrl: ModalController)  {
    this.feed_id = this.navParams.get('feed_id');
    this.type = this.navParams.get('type');
    this.get_info(this.feed_id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsFeedDetailPage');
  }

  get_info(feed_id:any) {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      feed_id:{"value":feed_id,"type":"NO"},
    }
    this.rest_api.postData(Data,'get_feed_detail').then((result:any) => {
      console.log(result);
      if(result.status == 1) {
        this.info = result.feed;
      }
    })
  }

  presentModal() {
    const modal = this.modalCtrl.create(ModalpagePage);
    modal.present();
  }
  
  likes() {
    const modal = this.modalCtrl.create(LikesPage,{feed_id:this.feed_id,type:this.type});
    modal.present();
  }

  comment() {
     const modal = this.modalCtrl.create(CommentPage,{feed_id:this.feed_id,type:this.type,adds:1});
    modal.present();
    modal.onDidDismiss((data) => {
      if(data){
      this.get_info(this.feed_id);        
      }
    })
  }

  notification() {
    this.navCtrl.push(NotificationsPage)
  }

  close(){
    this.viewCtrl.dismiss();
  }

  like(){
     let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      feed_id:{"value":this.feed_id,"type":"NO"},
      type:{"value":1,"type":"NO"},

    }
    this.rest_api.postData(Data,'like_feed').then((result:any) => {
      console.log(result);
      if(result.status == 1) {
        this.info.is_like = 1;
        this.info.likes = parseInt(this.info.likes) + 1;
      }
    })
  }

  Unlike() {
     let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      feed_id:{"value":this.feed_id,"type":"NO"},
      type:{"value":1,"type":"NO"},

    }
    this.rest_api.postData(Data,'unlike_feed').then((result:any) => {
      console.log(result);
      if(result.status == 1) {
        this.info.is_like = 0;
        this.info.likes = parseInt(this.info.likes) - 1;

      }
    })
  }

  otherUser(id:any) {
    if(id!=this.auth.getCurrentUserId()){
      this.navCtrl.push(MemberProfilePage,{user_id:id});
    }
  }

  re_open(id:any){
    this.get_info(id);
  }

  otherpet(item:any) {
    this.navCtrl.push(ProfilePage,{data:item})
  }

}
